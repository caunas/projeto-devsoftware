import { useCallback, useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import api, { getApiErrorMessage } from "../../services/api";
import { portalApi } from "../../services/portalService";

const emptyForm = { titulo: "", description: "", dataLimiteEntrega: "", turmaId: "" };

export default function AtividadeManager() {
  const { user } = useAuth();
  const { notify } = useUI();
  const [activities, setActivities] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const load = useCallback(async () => {
    const [activityData, classData] = await Promise.all([portalApi.teacherActivities(user.id), portalApi.classes()]);
    setActivities(activityData);
    setClasses(classData);
  }, [user.id]);

  useEffect(() => {
    const timer = window.setTimeout(() => load().catch((error) => notify(getApiErrorMessage(error, "Nao foi possivel carregar atividades."), "error")), 0);
    return () => window.clearTimeout(timer);
  }, [load, notify]);

  async function submit(event) {
    event.preventDefault();
    const payload = {
      titulo: form.titulo,
      description: form.description,
      dataLimiteEntrega: form.dataLimiteEntrega,
      turma: { id: Number(form.turmaId) },
      professor: { id: user.id },
    };
    try {
      if (editingId) await api.put(`/atividades/${editingId}`, payload);
      else await api.post("/atividades", payload);
      setForm(emptyForm);
      setEditingId(null);
      await load();
      notify("Atividade salva com sucesso.", "success");
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel salvar a atividade."), "error");
    }
  }

  function edit(item) {
    setEditingId(item.id);
    setForm({ titulo: item.titulo, description: item.description || "", dataLimiteEntrega: item.dataLimiteEntrega?.slice(0, 16) || "", turmaId: item.turma?.id || "" });
  }

  async function remove(id) {
    if (!window.confirm("Confirma a exclusao da atividade?")) return;
    try {
      await api.delete(`/atividades/${id}`);
      await load();
      notify("Atividade excluida.", "success");
    } catch (error) {
      notify(getApiErrorMessage(error, "Nao foi possivel excluir a atividade."), "error");
    }
  }

  return <main className="portal-page">
    <PageHeader eyebrow="Academico" title="Atividades" description="Gerencie atividades usando a API local." badge="HTTP" />
    <article className="crud-card"><h2>{editingId ? "Editar atividade" : "Nova atividade"}</h2>
      <form className="crud-form" onSubmit={submit}>
        <div className="form-group"><label>Titulo</label><input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} /></div>
        <div className="form-group"><label>Turma</label><select required value={form.turmaId} onChange={(e) => setForm({ ...form, turmaId: e.target.value })}><option value="">Selecione</option>{classes.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></div>
        <div className="form-group"><label>Prazo</label><input required type="datetime-local" value={form.dataLimiteEntrega} onChange={(e) => setForm({ ...form, dataLimiteEntrega: e.target.value })} /></div>
        <div className="form-group full-width"><label>Descricao</label><textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="crud-form-actions full-width"><button className="button-primary" type="submit">Salvar</button></div>
      </form>
    </article>
    <article className="crud-card"><h2>Atividades publicadas</h2><div className="crud-table-wrap"><table className="crud-table"><thead><tr><th>Titulo</th><th>Turma</th><th>Prazo</th><th>Acoes</th></tr></thead><tbody>{activities.map((item) => <tr key={item.id}><td>{item.titulo}</td><td>{item.turma?.nome}</td><td>{item.dataLimiteEntrega ? new Date(item.dataLimiteEntrega).toLocaleString("pt-BR") : "-"}</td><td className="crud-actions"><button onClick={() => edit(item)}>Editar</button><button className="danger" onClick={() => remove(item.id)}>Excluir</button></td></tr>)}</tbody></table></div></article>
  </main>;
}
