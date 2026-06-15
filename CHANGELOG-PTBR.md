# Registro de alterações

## 2026-06-15

### Adicionado

- Adicionada autenticação por bearer token à cadeia de filtros do Spring Security.
- Adicionado o mapeamento de criação de eventos no frontend para o contrato local `POST /api/eventos`.
- Adicionadas mensagens de erro centralizadas da API para falhas de autenticação, rede e backend.

### Alterado

- Corrigido o login para aguardar a requisição da API e consumir a resposta real `{ acessToken }`.
- Unificada a persistência do JWT em `portal-auth-token` para que o interceptor do Axios envie o token armazenado.
- Atualizado o formulário de login para identificar os usuários por e-mail e validar o perfil selecionado em relação ao papel definido no JWT.
- Conectado o calendário de eventos do coordenador aos endpoints locais de listagem e criação de eventos.
- Configurado o calendário de eventos para iniciar na data atual, em vez de usar uma data fixa de junho de 2026.
- Corrigido o matcher publico do Spring Security de `/eventos/**` para `/api/eventos/**`.
- Tornada a chave de assinatura do JWT configurável por meio de `JWT_SECRET`, com um valor alternativo para o ambiente de desenvolvimento local.
- Removidos um módulo de eventos duplicado, quebrado e sem uso, e uma importação legada de login também sem uso, permitindo que o lint do frontend seja aprovado.
- Estabilizados os callbacks de notificação da interface para evitar que efeitos da API sejam executados novamente após alterações no estado das notificações.

### Limitações conhecidas

- A publicação de atividades continua baseada em dados de exemplo do frontend. A API atual exige IDs explícitos de professor e turma e retorna grafos de entidades JPA que precisam de um contrato DTO estável antes de uma integração segura com o frontend.
