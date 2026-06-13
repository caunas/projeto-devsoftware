import AlunoLayout from "../layouts/AlunoLayout";
import CoordenadorLayout from "../layouts/CoordenadorLayout";
import ProfessorLayout from "../layouts/ProfessorLayout";

import DashboardAluno from "../pages/aluno/DashboardAluno";
import AlunoAtividades from "../pages/aluno/Atividades";
import Boletim from "../pages/aluno/Boletim";
import AlunoCalendario from "../pages/aluno/Calendario";
import CarteiraAluno from "../pages/aluno/Carteira";
import Financeiro from "../pages/aluno/Financeiro";
import Carreiras from "../pages/aluno/Carreiras";
import AlunoServicos from "../pages/aluno/Servicos";

import DashboardProfessor from "../pages/professor/DashboardProfessor";
import Notas from "../pages/professor/Notas";
import ProfessorTurmas from "../pages/professor/Turmas";
import ProfessorCalendario from "../pages/professor/Calendario";
import ProfessorAtividades from "../pages/professor/Atividades";
import CarteiraProfessor from "../pages/professor/Carteira";
import ProfessorServicos from "../pages/professor/Servicos";

import DashboardCoordenador from "../pages/coordenador/DashboardCoordenador";
import CoordenadorTurmas from "../pages/coordenador/Turmas";
import Eventos from "../pages/coordenador/Eventos";
import Professores from "../pages/coordenador/Professores";
import Solicitacoes from "../pages/coordenador/Solicitacoes";
import CoordenadorServicos from "../pages/coordenador/Servicos";
import ChangePassword from "../pages/account/ChangePassword";
import UserProfile from "../pages/account/UserProfile";

/**
 * Configuração declarativa dos portais protegidos.
 *
 * role: role exigida pelo ProtectedRoute.
 * layout: casca visual do portal.
 * children: páginas internas renderizadas pelo <Outlet /> do layout.
 */
export const portalRoutes = [
  {
    path: "/aluno",
    role: "aluno",
    layout: AlunoLayout,
    children: [
      { index: true, element: DashboardAluno },
      { path: "atividades", element: AlunoAtividades },
      { path: "boletim", element: Boletim },
      { path: "calendario", element: AlunoCalendario },
      { path: "carteira", element: CarteiraAluno },
      { path: "financeiro", element: Financeiro },
      { path: "carreiras", element: Carreiras },
      { path: "servicos", element: AlunoServicos },
      { path: "perfil", element: UserProfile },
      { path: "alterar-senha", element: ChangePassword },
    ],
  },
  {
    path: "/professor",
    role: "professor",
    layout: ProfessorLayout,
    children: [
      { index: true, element: DashboardProfessor },
      { path: "notas", element: Notas },
      { path: "turmas", element: ProfessorTurmas },
      { path: "calendario", element: ProfessorCalendario },
      { path: "atividades", element: ProfessorAtividades },
      { path: "carteira", element: CarteiraProfessor },
      { path: "servicos", element: ProfessorServicos },
      { path: "perfil", element: UserProfile },
      { path: "alterar-senha", element: ChangePassword },
    ],
  },
  {
    path: "/coordenador",
    role: "coordenador",
    layout: CoordenadorLayout,
    children: [
      { index: true, element: DashboardCoordenador },
      { path: "turmas", element: CoordenadorTurmas },
      { path: "eventos", element: Eventos },
      { path: "professores", element: Professores },
      { path: "solicitacoes", element: Solicitacoes },
      { path: "servicos", element: CoordenadorServicos },
      { path: "perfil", element: UserProfile },
      { path: "alterar-senha", element: ChangePassword },
    ],
  },
];
