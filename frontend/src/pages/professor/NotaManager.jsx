import { useCallback, useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import { useUI } from "../../hooks/useUI";
import api, { getApiErrorMessage } from "../../services/api";
import { portalApi } from "../../services/portalService";

export default function NotaManager() {
  const { notify } = useUI();
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [score, setScore] = useState("");
  const [editingId, setEditingId] = useState(null);

  const load = useCallback(async () => {
    const [studentData, gradeData] = await Promise.all([portalApi.students(), portalApi.allGrades()]);
    setStudents(studentData);
    setGrades(gradeData);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => load().catch((error) => notify(getApiErrorMessage(error, "Nao foi possivel carregar notas."), "error")), 0);
    return () => window.clearTimeout(timer);
  }, [load, notify]);

  async function submit(event) {
    event.preventDefault();
    try {
      if (editingId) await api.put(`/nota/${editingId}`, null, { params: { nota: score } });
      else await api.post("/nota/novo", null, { params: { id_aluno: studentId, nota: score } });
      setEditingId(null); setStudentId(""); setScore(""); await load();
      notify("Nota salva com sucesso.", "success");
    } catch (error) { notify(getApiErrorMessage(error, "Nao foi possivel salvar a nota."), "error"); }
  }

  async function remove(id) {
    if (!window.confirm("Confirma a exclusao da nota?")) return;
    try { await api.delete(`/nota/deletar/${id}`); await load(); notify("Nota excluida.", "success"); }
    catch (error) { notify(getApiErrorMessage(error, "Nao foi possivel excluir a nota."), "error"); }
  }

  return <main className="portal-page"><PageHeader eyebrow="Desempenho" title="Notas" description="Lance e mantenha notas pela API local." badge="HTTP" />
    <article className="crud-card"><h2>{editingId ? "Editar nota" : "Nova nota"}</h2><form className="crud-form" onSubmit={submit}>
      <div className="form-group"><label>Aluno</label><select required disabled={Boolean(editingId)} value={studentId} onChange={(e) => setStudentId(e.target.value)}><option value="">Selecione</option>{students.map((item) => <option key={item.id} value={item.id}>{item.nome} - {item.matricula}</option>)}</select></div>
      <div className="form-group"><label>Nota</label><input required min="0" max="10" step="0.1" type="number" value={score} onChange={(e) => setScore(e.target.value)} /></div>
      <div className="crud-form-actions full-width"><button className="button-primary" type="submit">Salvar</button></div>
    </form></article>
    <article className="crud-card"><h2>Notas registradas</h2><div className="crud-table-wrap"><table className="crud-table"><thead><tr><th>Aluno</th><th>Nota</th><th>Acoes</th></tr></thead><tbody>{grades.map((item) => <tr key={item.id}><td>{item.aluno?.nome}</td><td>{Number(item.nota).toFixed(1)}</td><td className="crud-actions"><button onClick={() => { setEditingId(item.id); setStudentId(item.aluno?.id || ""); setScore(item.nota); }}>Editar</button><button className="danger" onClick={() => remove(item.id)}>Excluir</button></td></tr>)}</tbody></table></div></article>
  </main>;
}
