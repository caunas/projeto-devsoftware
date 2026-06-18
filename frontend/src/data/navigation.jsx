import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaCreditCard,
  FaGraduationCap,
  FaHome,
  FaKey,
  FaUserCircle,
  FaUserTie,
} from "react-icons/fa";

export const portalMenus = {
  aluno: {
    title: "Portal do Aluno",
    subtitle: "Area academica",
    base: "/aluno",
    items: [
      { label: "Dashboard", path: "", icon: FaHome },
      { label: "Atividades", path: "atividades", icon: FaClipboardCheck },
      { label: "Boletim", path: "boletim", icon: FaGraduationCap },
      { label: "Calendario", path: "calendario", icon: FaCalendarAlt },
      { label: "Financeiro", path: "financeiro", icon: FaCreditCard },
      { label: "Perfil", path: "perfil", icon: FaUserCircle },
      { label: "Senha", path: "alterar-senha", icon: FaKey },
    ],
  },
  professor: {
    title: "Portal do Professor",
    subtitle: "Gestao de turmas",
    base: "/professor",
    items: [
      { label: "Dashboard", path: "", icon: FaHome },
      { label: "Notas", path: "notas", icon: FaGraduationCap },
      { label: "Turmas", path: "turmas", icon: FaChalkboardTeacher },
      { label: "Calendario", path: "calendario", icon: FaCalendarAlt },
      { label: "Atividades", path: "atividades", icon: FaClipboardCheck },
      { label: "Perfil", path: "perfil", icon: FaUserCircle },
      { label: "Senha", path: "alterar-senha", icon: FaKey },
    ],
  },
  coordenador: {
    title: "Portal do Coordenador",
    subtitle: "Operacao academica",
    base: "/coordenador",
    items: [
      { label: "Dashboard", path: "", icon: FaHome },
      { label: "Turmas", path: "turmas", icon: FaChalkboardTeacher },
      { label: "Eventos", path: "eventos", icon: FaCalendarAlt },
      { label: "Professores", path: "professores", icon: FaUserTie },
      { label: "Alunos", path: "alunos", icon: FaGraduationCap },
      { label: "Perfil", path: "perfil", icon: FaUserCircle },
      { label: "Senha", path: "alterar-senha", icon: FaKey },
    ],
  },
};
