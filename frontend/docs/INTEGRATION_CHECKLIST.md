# Checklist de Integracao Backend

Use este checklist para substituir o mock por API real.

## Preparacao

- Criar `.env` com `VITE_API_BASE_URL`.
- Confirmar roles: `aluno`, `professor`, `coordenador`.
- Confirmar formato do usuario retornado por `/auth/login` e `/auth/me`.
- Confirmar estrategia de refresh token: `localStorage` ou cookie HttpOnly.

## Autenticacao

- Alterar `src/services/api.js` para usar `VITE_API_BASE_URL`.
- Implementar envio do access token no interceptor de request.
- Implementar refresh token no interceptor de response para `401`.
- Alterar `AuthContext.login()` para chamar `POST /auth/login`.
- Alterar `AuthContext.logout()` para chamar `POST /auth/logout` e limpar tokens.
- Alterar inicializacao do `AuthContext` para validar sessao em `/auth/me`.
- Remover credenciais ficticias `Asdas` / `Asdas`.

## Dados

- Substituir dados de `src/data/portalPages.js` por chamadas reais.
- Manter criacao de atividades apenas no fluxo do professor.
- Integrar criacao de atividades do professor em `POST /teachers/me/activities` com `title`, `description` e `deadline`.
- Integrar anexos de atividades pendentes do aluno em `POST /students/me/activities/:activityId/attachments`.
- Integrar calendario mensal de eventos do coordenador em `GET /coordinators/me/events?month=&year=`.
- Integrar criacao de eventos do coordenador em `POST /coordinators/me/events` com `date`, `title`, `description` e `location`.
- Criar services por dominio se necessario:
  - `authService`
  - `studentService`
  - `teacherService`
  - `coordinatorService`
- Manter componentes `src/components/ui` recebendo dados por props.

## Permissoes

- Manter `ProtectedRoute` para experiencia de usuario.
- Validar permissoes tambem no backend.
- Retornar `403` quando o usuario tentar acessar recurso de outra role.

## Qualidade

- Testar login valido e invalido.
- Testar refresh token expirado.
- Testar logout.
- Testar upload/anexo de atividade pendente.
- Testar consulta de eventos alterando mes e ano.
- Testar criacao de atividade do professor com prazo.
- Testar criacao de evento do coordenador no dia selecionado.
- Testar acesso direto a `/aluno`, `/professor`, `/coordenador`.
- Testar troca de perfil tentando acessar rota sem permissao.
- Rodar `npm run lint`.
- Rodar `npm run build`.
