# Documentacao Tecnica

Esta pasta existe para orientar a integracao do frontend com um backend REST usando JWT.

Leitura recomendada:

1. `ARCHITECTURE.md` explica a arquitetura do frontend e a responsabilidade de cada pasta.
2. `AUTH_JWT_INTEGRATION.md` explica como substituir o login ficticio por JWT e refresh token.
3. `API_CONTRACT.md` descreve os endpoints esperados pelo frontend.
4. `INTEGRATION_CHECKLIST.md` lista as etapas praticas para finalizar a integracao.

Estado atual:

- O login ainda e mockado.
- As credenciais ficticias sao `Asdas` / `Asdas`.
- As paginas usam dados em `src/data/portalPages.js`.
- As rotas protegidas ja existem e validam autenticacao e role.
