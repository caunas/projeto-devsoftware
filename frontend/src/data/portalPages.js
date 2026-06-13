const dashboardEvents = [
  {
    date: "18 Jun",
    title: "Tech Week Nova Luz",
    description: "Semana com palestras sobre desenvolvimento web, dados, ciberseguranca e inteligencia artificial.",
    location: "Auditorio principal",
  },
  {
    date: "22 Jun",
    title: "Maratona de Programacao",
    description: "Desafio em equipes para resolver problemas reais com algoritmos, APIs e interfaces.",
    location: "Laboratorio de inovacao",
  },
  {
    date: "27 Jun",
    title: "Demo Day de Startups",
    description: "Apresentacao de projetos criados por estudantes para uma banca de convidados do setor tech.",
    location: "Hub de tecnologia",
  },
];

/**
 * Dados mockados dos portais.
 *
 * Integração backend:
 * - manter este formato como referência de payload;
 * - substituir gradualmente por chamadas REST;
 * - os componentes em src/components/ui recebem estes dados por props.
 */
const alunoServices = [
  { type: "Academico", name: "Declaracao de matricula", description: "Emissao digital de comprovante de vinculo academico." },
  { type: "Secretaria", name: "Ajuste cadastral", description: "Atualizacao de telefone, endereco e dados pessoais." },
  { type: "Suporte", name: "Acesso ao portal", description: "Atendimento para senha, login e problemas tecnicos." },
  { type: "Financeiro", name: "Segunda via de boleto", description: "Consulta e emissao de boleto atualizado." },
  { type: "Biblioteca", name: "Reserva de material", description: "Solicitacao de livros, laboratorios e recursos digitais." },
];

const professorServices = [
  { type: "Suporte", name: "Equipamentos de sala", description: "Chamado para projetor, audio, rede ou computador da sala." },
  { type: "Secretaria", name: "Declaracoes funcionais", description: "Solicitacao de documentos e comprovantes docentes." },
  { type: "Academico", name: "Reserva de laboratorio", description: "Consulta de disponibilidade e reserva de espacos praticos." },
  { type: "Pedagogico", name: "Apoio avaliativo", description: "Orientacao para instrumentos de avaliacao e rubricas." },
];

const coordenadorServices = [
  { type: "Relatorios", name: "Indicadores do curso", description: "Consulta de evasao, aprovacao, frequencia e desempenho." },
  { type: "Secretaria", name: "Processos academicos", description: "Acompanhamento de documentos e fluxos formais." },
  { type: "Infraestrutura", name: "Solicitacao de ambiente", description: "Pedidos de sala, laboratorio e equipamentos." },
  { type: "Gestao", name: "Planejamento de oferta", description: "Apoio para turmas, docentes e disciplinas do semestre." },
];

export const alunoPages = {
  dashboard: {
    eyebrow: "Resumo academico",
    title: "Dashboard do Aluno",
    description: "Acompanhe suas aulas, atividades pendentes, boletim e comunicados importantes em um unico lugar.",
    badge: "Semestre 2026.1",
    events: dashboardEvents,
    stats: [
      { label: "Frequencia", value: "92%", helper: "Media geral do semestre" },
      { label: "Atividades", value: "4", helper: "Pendencias para esta semana" },
      { label: "Media geral", value: "8.4", helper: "Calculada pelo boletim" },
    ],
    cards: [
      { label: "Proxima aula", title: "Engenharia de Software", description: "Hoje, 19:00 - Sala B204. Material de apoio ja disponivel no portal." },
      { label: "Financeiro", title: "Mensalidade em aberto", description: "Vencimento em 10/06/2026. Acesse a area financeira para emitir a segunda via." },
      { label: "Carreiras", title: "Vagas de estagio", description: "Novas oportunidades em empresas de tecnologia foram publicadas hoje." },
    ],
  },
  atividades: {
    eyebrow: "Minhas entregas",
    title: "Atividades",
    description: "Organize trabalhos, provas e exercicios com prazos e situacao de entrega.",
    badge: "4 pendentes",
    activityList: {
      title: "Proximas atividades",
      activities: [
        {
          title: "Projeto integrador",
          detail: "Entrega em 12/06",
          status: "Pendente",
          variant: "warning",
          description: "Entregar prototipo navegavel, documento de requisitos e breve justificativa tecnica da solucao.",
        },
        {
          title: "Lista de Banco de Dados",
          detail: "Entrega em 14/06",
          status: "Pendente",
          variant: "warning",
          description: "Resolver exercicios de modelagem relacional, normalizacao e consultas SQL com joins.",
        },
        {
          title: "Relatorio de laboratorio",
          detail: "Enviado ontem",
          status: "Concluido",
          description: "Relatorio de pratica supervisionada ja recebido para avaliacao do professor.",
        },
      ],
    },
  },
  boletim: {
    eyebrow: "Desempenho",
    title: "Boletim",
    description: "Consulte notas, medias e situacao atual nas disciplinas matriculadas.",
    badge: "Media automatica",
    grades: {
      title: "Notas do semestre",
      items: [
        { subject: "Engenharia de Software", score: 9.0, status: "Aprovado" },
        { subject: "Banco de Dados", score: 8.4, status: "Aprovado" },
        { subject: "Calculo Aplicado", score: 7.8, status: "Aprovado" },
      ],
    },
  },
  calendario: {
    eyebrow: "Agenda",
    title: "Calendario",
    description: "Veja aulas, avaliacoes, eventos academicos e prazos importantes.",
    badge: "Junho",
    agenda: {
      title: "Agenda do aluno",
      days: [
        { date: "10 Jun", weekday: "Quarta", events: [{ time: "19:00", title: "Avaliacao parcial", description: "Banco de Dados, bloco B, laboratorio 02." }] },
        { date: "11 Jun", weekday: "Quinta", events: [] },
        { date: "12 Jun", weekday: "Sexta", events: [{ time: "20:40", title: "Aula de laboratorio", description: "Pratica de consultas SQL e revisao para entrega." }] },
        { date: "13 Jun", weekday: "Sabado", events: [{ time: "09:00", title: "Palestra de tecnologia", description: "Auditorio principal, inscricoes pelo portal." }] },
        { date: "14 Jun", weekday: "Domingo", events: [] },
        { date: "15 Jun", weekday: "Segunda", events: [] },
        { date: "16 Jun", weekday: "Terca", events: [{ time: "19:00", title: "Projeto integrador", description: "Orientacao com professor responsavel na sala B204." }] },
        { date: "17 Jun", weekday: "Quarta", events: [] },
        { date: "20 Jun", weekday: "Sabado", events: [{ time: "18:00", title: "Fechamento de notas", description: "Prazo final para lancamento de atividades avaliativas." }] },
      ],
    },
  },
  financeiro: {
    eyebrow: "Mensalidades",
    title: "Financeiro",
    description: "Acompanhe cobrancas, vencimentos, comprovantes e segunda via de boletos.",
    badge: "1 em aberto",
    stats: [
      { label: "Valor atual", value: "R$ 760", helper: "Vence em 10/06" },
      { label: "Pagas", value: "5", helper: "Parcelas no semestre" },
      { label: "Bolsas", value: "20%", helper: "Desconto ativo" },
    ],
  },
  carteira: {
    eyebrow: "Identificacao",
    title: "Carteira estudantil",
    description: "Dados de matricula, curso e validade da identificacao academica.",
    badge: "Ativa",
    profile: {
      title: "Dados da carteira",
      fields: [
        { label: "Aluno", value: "Maria Eduarda Santos" },
        { label: "Matricula", value: "202610245" },
        { label: "Curso", value: "Sistemas de Informacao" },
        { label: "Periodo", value: "4º semestre" },
        { label: "Situacao", value: "Matricula regular" },
        { label: "Validade", value: "Dezembro de 2026" },
      ],
    },
  },
  carreiras: {
    eyebrow: "Empregabilidade",
    title: "Centro de Carreiras",
    description: "Encontre oportunidades de estagio em empresas de tecnologia parceiras.",
    badge: "12 vagas",
    cards: [
      { label: "Estagio remoto", title: "Desenvolvimento Frontend", description: "React, testes de interface e consumo de APIs. Bolsa de R$ 1.400." },
      { label: "Estagio hibrido", title: "Analise de Dados", description: "SQL, dashboards e indicadores para time de produto. Bolsa de R$ 1.500." },
      { label: "Estagio presencial", title: "Suporte Cloud", description: "Atendimento tecnico, redes e ambiente AWS. Bolsa de R$ 1.300." },
      { label: "Estagio remoto", title: "QA Automation", description: "Automacao de testes, documentacao de bugs e pipelines. Bolsa de R$ 1.450." },
      { label: "Estagio hibrido", title: "UX Research", description: "Pesquisa com usuarios, prototipos e analise de jornadas digitais. Bolsa de R$ 1.350." },
      { label: "Estagio remoto", title: "Ciberseguranca", description: "Monitoramento, boas praticas e apoio em resposta a incidentes. Bolsa de R$ 1.600." },
    ],
  },
  servicos: {
    eyebrow: "Atendimento",
    title: "Servicos",
    description: "Pesquise servicos academicos, financeiros e de suporte disponiveis para alunos.",
    badge: "Busca ativa",
    services: {
      title: "Pesquisar servicos",
      items: alunoServices,
    },
  },
};

export const professorPages = {
  dashboard: {
    eyebrow: "Rotina docente",
    title: "Portal do Professor",
    description: "Gerencie turmas, notas, atividades e compromissos academicos de forma centralizada.",
    badge: "3 turmas",
    events: dashboardEvents,
    stats: [
      { label: "Alunos ativos", value: "128" },
      { label: "Correcoes pendentes", value: "18" },
    ],
  },
  notas: {
    eyebrow: "Avaliacao",
    title: "Notas",
    description: "Lance e acompanhe notas por turma, disciplina e periodo avaliativo.",
    badge: "18 pendentes",
    table: {
      title: "Lancamentos recentes",
      rows: [
        { title: "Sistemas de Informacao - 4A", detail: "Prova parcial", status: "Pendente", variant: "warning" },
        { title: "Analise de Sistemas - 2B", detail: "Projeto em grupo", status: "Lancado" },
      ],
    },
  },
  turmas: {
    eyebrow: "Grade semanal",
    title: "Turmas",
    description: "Consulte as aulas fixas da semana com horario, sala e turma.",
    badge: "Agenda semanal",
    weeklyAgenda: {
      title: "Agenda fixa de aulas",
      days: [
        {
          weekday: "Segunda",
          classes: [
            { title: "Engenharia de Software", time: "19:00 - 20:40", description: "Turma 4A, sala B204, 42 alunos." },
          ],
        },
        {
          weekday: "Terca",
          classes: [
            { title: "Projeto Integrador", time: "19:00 - 20:40", description: "Laboratorio de inovacao, 36 alunos." },
          ],
        },
        {
          weekday: "Quarta",
          classes: [
            { title: "Engenharia de Software", time: "20:50 - 22:20", description: "Turma 4A, sala B204, aula de acompanhamento." },
          ],
        },
        {
          weekday: "Quinta",
          classes: [
            { title: "Banco de Dados", time: "19:00 - 20:40", description: "Laboratorio 02, 50 alunos." },
          ],
        },
        {
          weekday: "Sexta",
          classes: [
            { title: "Banco de Dados", time: "20:50 - 22:20", description: "Laboratorio 02, pratica supervisionada." },
          ],
        },
      ],
    },
  },
  calendario: {
    eyebrow: "Agenda docente",
    title: "Calendario",
    description: "Acompanhe aulas, reunioes, avaliacoes e prazos de fechamento.",
    badge: "5 eventos",
    agenda: {
      title: "Agenda do professor",
      days: [
        { date: "10 Jun", weekday: "Quarta", events: [{ time: "19:00", title: "Prova parcial", description: "Banco de Dados, laboratorio 02." }] },
        { date: "11 Jun", weekday: "Quinta", events: [] },
        { date: "12 Jun", weekday: "Sexta", events: [{ time: "17:30", title: "Reuniao pedagogica", description: "Sala dos professores, pauta de avaliacao." }, { time: "20:40", title: "Aula de laboratorio", description: "Pratica orientada com a turma de Banco de Dados." }] },
        { date: "13 Jun", weekday: "Sabado", events: [] },
        { date: "16 Jun", weekday: "Terca", events: [{ time: "19:00", title: "Orientacao de projeto", description: "Projeto Integrador, laboratorio de inovacao." }] },
        { date: "17 Jun", weekday: "Quarta", events: [] },
        { date: "18 Jun", weekday: "Quinta", events: [] },
        { date: "20 Jun", weekday: "Sabado", events: [{ time: "18:00", title: "Fechamento de notas", description: "Prazo final do periodo avaliativo." }] },
      ],
    },
  },
  atividades: {
    eyebrow: "Planejamento",
    title: "Atividades",
    description: "Publique trabalhos, listas e avaliacao para as turmas vinculadas.",
    badge: "6 abertas",
    activityPublisher: {
      title: "Adicionar atividade",
      activities: [
        { title: "Projeto integrador", detail: "Prazo: 2026-06-12", description: "Turma 4A - prototipo navegavel e documento de requisitos.", status: "Aberta" },
        { title: "Lista de SQL", detail: "Prazo: 2026-06-14", description: "Turma 2B - modelagem, normalizacao e consultas SQL.", status: "Revisar", variant: "warning" },
      ],
    },
  },
  carteira: {
    eyebrow: "Identificacao",
    title: "Carteira docente",
    description: "Dados funcionais e credencial de acesso aos ambientes academicos.",
    badge: "Ativa",
    profile: {
      title: "Dados da carteira",
      fields: [
        { label: "Professor", value: "Rafael Almeida" },
        { label: "Registro", value: "DOC-2026-014" },
        { label: "Departamento", value: "Tecnologia e Inovacao" },
        { label: "Vinculo", value: "Docente ativo" },
        { label: "Acesso", value: "Salas e laboratorios" },
        { label: "Validade", value: "Dezembro de 2026" },
      ],
    },
  },
  servicos: {
    eyebrow: "Atendimento",
    title: "Servicos",
    description: "Pesquise suporte, documentos, reservas e servicos academicos docentes.",
    badge: "Busca ativa",
    services: {
      title: "Pesquisar servicos",
      items: professorServices,
    },
  },
};

export const coordenadorPages = {
  dashboard: {
    eyebrow: "Gestao academica",
    title: "Portal do Coordenador",
    description: "Monitore turmas, professores, solicitacoes e eventos do curso em um painel unico.",
    badge: "Curso ativo",
    events: dashboardEvents,
    stats: [
      { label: "Turmas", value: "12", helper: "Em andamento no semestre" },
      { label: "Professores", value: "24", helper: "Vinculados ao curso" },
      { label: "Solicitacoes", value: "9", helper: "Aguardando analise" },
    ],
  },
  turmas: {
    eyebrow: "Oferta academica",
    title: "Turmas",
    description: "Acompanhe capacidade, alocacao de professores e situacao das turmas.",
    badge: "12 ativas",
    table: {
      title: "Turmas monitoradas",
      rows: [
        { title: "Sistemas de Informacao - 4A", detail: "42 alunos", status: "Regular" },
        { title: "Analise de Sistemas - 2B", detail: "50 alunos", status: "Lotada", variant: "warning" },
      ],
    },
  },
  eventos: {
    eyebrow: "Calendario institucional",
    title: "Eventos",
    description: "Organize palestras, semanas academicas, reunioes e atividades do curso.",
    badge: "4 eventos",
    eventCalendar: {
      title: "Calendário",
      events: [
        {
          date: "2026-06-13",
          title: "Palestra de tecnologia",
          description: "Evento aberto para alunos e professores com convidados do mercado de software.",
          location: "Auditorio principal",
        },
        {
          date: "2026-06-18",
          title: "Colegiado de curso",
          description: "Reuniao para avaliacao do semestre, ajustes de oferta e alinhamento pedagogico.",
          location: "Sala da coordenacao",
        },
        {
          date: "2026-06-18",
          title: "Revisao de matriz curricular",
          description: "Analise de trilhas de desenvolvimento, dados, cloud e seguranca para o proximo ciclo.",
          location: "Sala C305",
        },
        {
          date: "2026-06-24",
          title: "Mostra de projetos",
          description: "Apresentacao dos trabalhos integradores para professores, estudantes e parceiros.",
          location: "Hub de tecnologia",
        },
        {
          date: "2026-06-27",
          title: "Demo Day de Startups",
          description: "Bancas avaliadoras acompanham pitches de solucoes criadas pelos estudantes.",
          location: "Laboratorio de inovacao",
        },
      ],
    },
  },
  professores: {
    eyebrow: "Equipe docente",
    title: "Professores",
    description: "Consulte vinculos, disciplinas, disponibilidade e alocacao por semestre.",
    badge: "24 ativos",
    table: {
      title: "Docentes em destaque",
      rows: [
        { title: "Rafael Almeida", detail: "Engenharia de Software", status: "Alocado" },
        { title: "Ana Ribeiro", detail: "Banco de Dados", status: "Alocado" },
        { title: "Marcos Lima", detail: "Projetos Integradores", status: "Revisar", variant: "warning" },
      ],
    },
  },
  solicitacoes: {
    eyebrow: "Fluxos academicos",
    title: "Solicitacoes",
    description: "Acompanhe pedidos de alunos, professores e secretaria que exigem decisao da coordenacao.",
    badge: "9 abertas",
    table: {
      title: "Fila de analise",
      rows: [
        { title: "Quebra de prerequisito", detail: "Aluno 202610245", status: "Analisar", variant: "warning" },
        { title: "Ajuste de horario", detail: "Turma 4A", status: "Pendente", variant: "warning" },
        { title: "Reserva de laboratorio", detail: "Professor Rafael", status: "Aprovada" },
      ],
    },
  },
  servicos: {
    eyebrow: "Administrativo",
    title: "Servicos",
    description: "Pesquise ferramentas de secretaria, relatorios, reservas e suporte da coordenacao.",
    badge: "Busca ativa",
    services: {
      title: "Pesquisar servicos",
      items: coordenadorServices,
    },
  },
};
