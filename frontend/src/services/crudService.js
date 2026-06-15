import api from "./api";

export const crudResources = {
  professores: {
    endpoint: "/professores",
    fields: [
      { name: "nome", label: "Nome", required: true },
      { name: "email", label: "E-mail", type: "email", required: true },
      { name: "senha", label: "Senha", type: "password", requiredOnCreate: true },
      { name: "departamento", label: "Departamento", required: true },
      { name: "especialidade", label: "Especialidade", required: true },
    ],
    columns: ["nome", "email", "departamento", "especialidade"],
    labels: { nome: "Nome", email: "E-mail", departamento: "Departamento", especialidade: "Especialidade" },
  },
  alunos: {
    endpoint: "/aluno",
    createEndpoint: "/aluno/novo",
    deleteEndpoint: (id) => `/aluno/deletar/${id}`,
    fields: [
      { name: "nome", label: "Nome", required: true },
      { name: "email", label: "E-mail", type: "email", required: true },
      { name: "senha", label: "Senha", type: "password", requiredOnCreate: true },
      { name: "matricula", label: "Matricula", required: true },
      { name: "curso", label: "Curso", required: true },
      { name: "semestre", label: "Semestre", type: "number", required: true },
    ],
    columns: ["nome", "email", "matricula", "curso", "semestre"],
    labels: { nome: "Nome", email: "E-mail", matricula: "Matricula", curso: "Curso", semestre: "Semestre" },
  },
  turmas: {
    endpoint: "/turmas",
    fields: [{ name: "nome", label: "Nome da turma", required: true }],
    columns: ["nome"],
    labels: { nome: "Turma" },
  },
  eventos: {
    endpoint: "/eventos",
    fields: [
      { name: "titulo", label: "Titulo", required: true },
      { name: "descricao", label: "Descricao", required: true, multiline: true },
      { name: "dataEvento", label: "Data e hora", type: "datetime-local", required: true },
      { name: "local", label: "Local" },
    ],
    columns: ["titulo", "dataEvento", "local"],
    labels: { titulo: "Titulo", dataEvento: "Data", local: "Local" },
    preparePayload: (data, user) => ({ ...data, coordenador: { id: user.id } }),
  },
};

function sanitizePayload(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizePayload);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, fieldValue]) => fieldValue !== null && fieldValue !== undefined)
        .map(([key, fieldValue]) => [key, sanitizePayload(fieldValue)])
    );
  }

  return value;
}

export async function listResource(config) {
  const response = await api.get(config.endpoint);
  return response.data;
}

export async function createResource(config, data, user) {
  const rawPayload = config.preparePayload ? config.preparePayload(data, user) : data;
  const payload = sanitizePayload(rawPayload);
  const response = await api.post(config.createEndpoint || config.endpoint, payload);
  return response.data;
}

export async function updateResource(config, id, data, user) {
  const rawPayload = config.preparePayload ? config.preparePayload(data, user) : data;
  const payload = sanitizePayload(rawPayload);
  const response = await api.put(`${config.endpoint}/${id}`, payload);
  return response.data;
}

export async function deleteResource(config, id) {
  await api.delete(config.deleteEndpoint ? config.deleteEndpoint(id) : `${config.endpoint}/${id}`);
}
