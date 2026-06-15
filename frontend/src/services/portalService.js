import api from "./api";

const getData = async (url, config) => (await api.get(url, config)).data;

export const portalApi = {
  me: () => getData("/account/me"),
  events: () => getData("/eventos"),
  students: () => getData("/aluno"),
  teachers: () => getData("/professores"),
  classes: () => getData("/turmas"),
  activities: () => getData("/atividades"),
  teacherActivities: (id) => getData(`/atividades/professor/${id}`),
  studentActivities: (id) => getData(`/atividades/aluno/${id}`),
  grades: (id) => getData("/nota", { params: { id_aluno: id } }),
  allGrades: () => getData("/nota/todas"),
  bills: (id) => getData(`/faturas/aluno/${id}`),
  allBills: () => getData("/faturas"),
};

export async function updateAccount(data) {
  return (await api.put("/account/me", data)).data;
}

export async function updatePassword(data) {
  await api.patch("/account/me/password", data);
}
