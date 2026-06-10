# Mapa da Documentacao Dentro do Codigo

Os comentarios internos foram adicionados nos pontos onde a integracao backend/JWT deve acontecer.

## Arquivos comentados

`src/services/api.js`

Explica o cliente Axios, `baseURL`, interceptor de request para JWT e interceptor de response para refresh token.

`src/contexts/auth/AuthContext.jsx`

Explica o login mockado, persistencia atual, pontos de substituicao por `/auth/login`, `/auth/me`, `/auth/logout`, `/users/me` e `/users/me/password`.

`src/routes/ProtectedRoute.jsx`

Explica a validacao de autenticacao, role, skeleton loading e redirecionamentos para `/login` e `/403`.

`src/routes/AppRoutes.jsx`

Explica rotas publicas, rotas protegidas e fallback 404.

`src/routes/routeConfig.jsx`

Explica o formato declarativo das rotas dos portais e como a role e aplicada.

`src/App.jsx`

Explica a ordem dos providers globais.

`src/pages/auth/Login.jsx`

Explica o fluxo visual do login e onde a chamada JWT real deve entrar.

`src/contexts/ui/UIContext.jsx`

Explica notificacoes e loader global.

`src/contexts/theme/ThemeContext.jsx`

Explica como o dark mode e aplicado via `data-theme`.

`src/components/ui/ServicesSearch.jsx`

Explica a busca local e como trocar por endpoint de busca.

`src/components/ui/ActivityPublisher.jsx`

Explica a publicacao em memoria para atividades do professor, incluindo titulo, descricao e prazo.

`src/components/ui/ActivityList.jsx`

Explica a lista expansivel de atividades do aluno e o ponto de integracao para anexos com `multipart/form-data`.

`src/components/ui/CoordinatorEventCalendar.jsx`

Explica o calendario mensal de eventos do coordenador, a consulta por mes/ano e a publicacao em `POST /coordinators/me/events`.

`src/components/ui/PortalPage.jsx`

Explica o renderizador generico baseado em dados.

`src/data/portalPages.js`

Explica que os dados atuais sao mockados e servem como referencia de payload para a API.
