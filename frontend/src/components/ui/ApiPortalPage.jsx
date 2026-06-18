import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import { getApiErrorMessage } from "../../services/api";
import { portalApi } from "../../services/portalService";
import DataTable from "./DataTable";
import EventCarousel from "./EventCarousel";
import GradeReport from "./GradeReport";
import PageHeader from "./PageHeader";
import ProfileCard from "./ProfileCard";
import StatCard from "./StatCard";

const pageMetadata = {
  dashboard: ["Resumo", "Dashboard", "Indicadores calculados com dados atuais da API."],
  atividades: ["Academico", "Atividades", "Atividades e entregas registradas na API."],
  boletim: ["Desempenho", "Boletim", "Notas registradas para o aluno autenticado."],
  calendario: ["Agenda", "Calendario", "Eventos publicados na API."],
  financeiro: ["Financeiro", "Faturas", "Cobrancas e pagamentos do aluno autenticado."],
  notas: ["Desempenho", "Notas", "Registros de notas disponiveis para consulta."],
  turmas: ["Academico", "Turmas", "Turmas ativas retornadas pela API."],
};

function formatDate(value) {
  return value ? new Date(value).toLocaleString("pt-BR") : "Sem data";
}

function mapEvents(events) {
  return events.map((event) => ({
    date: formatDate(event.dataEvento),
    title: event.titulo,
    description: event.descricao,
    location: event.local || "Local nao informado",
  }));
}

function mapActivities(items, role) {
  return items.map((item) => {
    const activity = item.atividade || item;
    return {
      title: activity.titulo,
      detail: `${activity.turma?.nome || "Sem turma"} - ${formatDate(activity.dataLimiteEntrega)}`,
      status: role === "aluno" ? (item.resposta ? "Entregue" : "Pendente") : activity.professor?.nome || "Professor nao informado",
      variant: role === "aluno" && !item.resposta ? "warning" : "",
    };
  });
}

function mapClasses(items) {
  return items.map((item) => ({
    title: item.nome,
    detail: `${item.professores?.length || 0} professor(es)` ,
    status: `${item.alunos?.length || 0} aluno(s)`,
  }));
}

function mapBills(items) {
  return items.map((item) => ({
    title: item.mesReferencia,
    detail: `R$ ${Number(item.valor).toFixed(2)} - vence ${item.dataVencimento}`,
    status: item.status,
    variant: item.status === "PENDENTE" ? "warning" : "",
  }));
}

function mapProfile(profile) {
  return Object.entries(profile)
    .filter(([key, value]) => !["senha", "role", "ativo", "turmas", "professores", "alunos"].includes(key) && value !== null && typeof value !== "object")
    .map(([key, value]) => ({ label: key.replace(/([A-Z])/g, " $1"), value: String(value) }));
}

async function loadPage(role, page, userId) {
  const eventsPromise = portalApi.events();

  if (role === "aluno") {
    if (page === "atividades") return { rows: mapActivities(await portalApi.studentActivities(userId), role) };
    if (page === "boletim") return { grades: (await portalApi.grades(userId)).map((grade) => ({ subject: `Registro #${grade.id}`, score: grade.nota, status: grade.nota >= 7 ? "Aprovado" : "Em acompanhamento" })) };
    if (page === "financeiro") return { rows: mapBills(await portalApi.bills(userId)) };
    if (page === "calendario") return { events: mapEvents(await eventsPromise) };
    const [profile, activities, grades, bills, events] = await Promise.all([portalApi.me(), portalApi.studentActivities(userId), portalApi.grades(userId), portalApi.bills(userId), eventsPromise]);
    return {
      events: mapEvents(events),
      profile: mapProfile(profile),
      stats: [
        { label: "Atividades", value: activities.length, helper: "Total atribuido" },
        { label: "Media", value: grades.length ? (grades.reduce((sum, item) => sum + item.nota, 0) / grades.length).toFixed(1) : "-", helper: "Notas registradas" },
        { label: "Faturas pendentes", value: bills.filter((item) => item.status !== "PAGO").length, helper: "Financeiro" },
      ],
    };
  }

  if (role === "professor") {
    if (page === "atividades") return { rows: mapActivities(await portalApi.teacherActivities(userId), role) };
    if (page === "notas") return { rows: (await portalApi.allGrades()).map((grade) => ({ title: grade.aluno?.nome || `Aluno #${grade.aluno?.id}`, detail: `Registro #${grade.id}`, status: Number(grade.nota).toFixed(1) })) };
    if (page === "turmas") return { rows: mapClasses(await portalApi.classes()) };
    if (page === "calendario") return { events: mapEvents(await eventsPromise) };
    const [profile, activities, classes, students, events] = await Promise.all([portalApi.me(), portalApi.teacherActivities(userId), portalApi.classes(), portalApi.students(), eventsPromise]);
    return { events: mapEvents(events), profile: mapProfile(profile), stats: [
      { label: "Atividades", value: activities.length, helper: "Publicadas" },
      { label: "Turmas", value: classes.length, helper: "Ativas" },
      { label: "Alunos", value: students.length, helper: "Ativos" },
    ] };
  }

  const [teachers, students, classes, activities, events] = await Promise.all([portalApi.teachers(), portalApi.students(), portalApi.classes(), portalApi.activities(), eventsPromise]);
  return { events: mapEvents(events), stats: [
    { label: "Professores", value: teachers.length, helper: "Ativos" },
    { label: "Alunos", value: students.length, helper: "Ativos" },
    { label: "Turmas", value: classes.length, helper: `${activities.length} atividade(s)` },
  ] };
}

export default function ApiPortalPage({ page }) {
  const { user } = useAuth();
  const { notify } = useUI();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [eyebrow, title, description] = pageMetadata[page] || pageMetadata.dashboard;

  useEffect(() => {
    let active = true;
    loadPage(user.role, page, user.id)
      .then((result) => active && setData(result))
      .catch((error) => active && notify(getApiErrorMessage(error, "Nao foi possivel carregar os dados."), "error"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [notify, page, user.id, user.role]);

  return <section className="portal-page">
    <PageHeader eyebrow={eyebrow} title={title} description={description} badge={loading ? "Carregando" : "API local"} />
    <EventCarousel events={data.events || []} />
    {!!data.stats?.length && <div className="stats-grid">{data.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div>}
    <ProfileCard title="Dados cadastrais" fields={data.profile || []} />
    <GradeReport title="Notas" grades={data.grades || []} />
    <DataTable title="Registros" rows={data.rows || []} />
    {!loading && !data.events?.length && !data.stats?.length && !data.profile?.length && !data.grades?.length && !data.rows?.length && <article className="crud-card"><p className="crud-message">Nenhum dado retornado pela API.</p></article>}
  </section>;
}
