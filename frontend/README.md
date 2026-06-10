# Portal da Faculdade

Sistema academico em React + Vite para os portais de aluno, professor e coordenador.

## Tecnologias

- React
- Vite
- React Router DOM
- Axios
- React Hook Form
- SweetAlert2
- React Icons

## Estrutura

```txt
src/
  assets/              Imagens e arquivos estaticos usados pelo frontend
  components/
    sidebar/           Navegacao lateral reutilizavel por perfil
    ui/                Componentes visuais reutilizaveis
  constants/           Constantes compartilhadas, como perfis de usuario
  contexts/
    auth/              Contexto e provider de autenticacao
  data/                Dados temporarios/mockados e configuracoes de menu
  hooks/               Hooks reutilizaveis
  layouts/             Layouts por portal
  pages/
    auth/              Login
    aluno/             Paginas do portal do aluno
    professor/         Paginas do portal do professor
    coordenador/       Paginas do portal do coordenador
  routes/              Configuracao e renderizacao das rotas
  services/            Clientes de API e integracoes externas
  styles/              Estilos globais e variaveis de tema
  utils/               Funcoes utilitarias compartilhadas
```

## Arquitetura

Cada portal segue o mesmo fluxo:

```txt
Route -> Layout -> Sidebar -> Page -> UI Components -> Data
```

Regras do projeto:

- Nao repetir sidebar dentro das paginas.
- Toda area logada deve passar por um layout.
- Conteudo mockado fica em `src/data`.
- Componentes visuais reutilizaveis ficam em `src/components/ui`.
- Rotas dos portais ficam centralizadas em `src/routes/routeConfig.jsx`.

## Portais

### Aluno

- Dashboard
- Atividades
- Boletim
- Calendario
- Financeiro
- Carteira
- Centro de Carreiras
- Servicos

### Professor

- Dashboard
- Notas
- Turmas
- Calendario
- Atividades
- Carteira
- Servicos

### Coordenador

- Dashboard
- Turmas
- Eventos
- Professores
- Solicitacoes
- Servicos

## Backend futuro

O projeto esta preparado para integracao com API REST.

Documentacao tecnica para integracao:

- `docs/ARCHITECTURE.md`
- `docs/AUTH_JWT_INTEGRATION.md`
- `docs/API_CONTRACT.md`
- `docs/INTEGRATION_CHECKLIST.md`

Autenticacao prevista:

- JWT
- Refresh Token
- Controle por roles

Roles:

- aluno
- professor
- coordenador

## Comandos

Instalar dependencias:

```bash
npm install
```

Executar em desenvolvimento:

```bash
npm run dev
```

Gerar build:

```bash
npm run build
```

Validar lint:

```bash
npm run lint
```
