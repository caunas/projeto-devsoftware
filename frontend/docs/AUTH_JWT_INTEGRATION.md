# Integracao de Autenticacao com JWT

Este documento descreve como substituir o login ficticio por uma autenticacao real com JWT.

## Estado atual

Arquivo principal:

```txt
src/contexts/auth/AuthContext.jsx
```

Hoje o login aceita apenas:

```txt
Usuario: Asdas
Senha: Asdas
```

Essas credenciais nao aparecem mais na interface; elas existem apenas no mock do codigo. Ao autenticar, o frontend cria um usuario mockado no `localStorage`. Isso deve ser removido quando o backend estiver pronto.

## Modelo recomendado

### Login

O frontend deve enviar:

```http
POST /auth/login
Content-Type: application/json
```

Body:

```json
{
  "username": "usuario",
  "password": "senha",
  "role": "aluno"
}
```

Resposta esperada:

```json
{
  "accessToken": "jwt-curto",
  "refreshToken": "jwt-longo-ou-token-opaco",
  "user": {
    "id": "123",
    "name": "Maria Eduarda",
    "email": "maria@novaluz.edu.br",
    "role": "aluno"
  }
}
```

### Verificar usuario logado

```http
GET /auth/me
Authorization: Bearer accessToken
```

Resposta:

```json
{
  "id": "123",
  "name": "Maria Eduarda",
  "email": "maria@novaluz.edu.br",
  "role": "aluno"
}
```

### Refresh token

```http
POST /auth/refresh
```

Body:

```json
{
  "refreshToken": "token-atual"
}
```

Resposta:

```json
{
  "accessToken": "novo-jwt-curto",
  "refreshToken": "novo-refresh-token"
}
```

### Logout

```http
POST /auth/logout
Authorization: Bearer accessToken
```

O frontend tambem deve limpar os tokens locais mesmo que o endpoint de logout falhe.

## Onde alterar no frontend

### `src/services/api.js`

Adicionar:

- `baseURL` vindo de `VITE_API_BASE_URL`;
- interceptor para incluir `Authorization: Bearer <accessToken>`;
- interceptor de resposta para tratar `401`;
- tentativa de refresh token;
- logout quando refresh falhar.

### `src/contexts/auth/AuthContext.jsx`

Substituir:

- validacao mockada `Asdas`;
- criacao local de usuario;
- `sessionVersion`.

Por:

- `login()` chamando `POST /auth/login`;
- `logout()` chamando `POST /auth/logout`;
- `loadUser()` chamando `GET /auth/me`;
- `changePassword()` chamando `PATCH /users/me/password`;
- `updateProfile()` chamando `PATCH /users/me`.

### `src/routes/ProtectedRoute.jsx`

Ja esta preparado para:

- mostrar skeleton enquanto `isInitializing` for verdadeiro;
- bloquear nao autenticados;
- bloquear role incorreta.

Quando integrar JWT, `isInitializing` deve ficar verdadeiro enquanto o frontend valida tokens e carrega `/auth/me`.

## Armazenamento de tokens

Opcao simples:

- `accessToken` em memoria ou `localStorage`;
- `refreshToken` em `localStorage`.

Opcao mais segura:

- `accessToken` em memoria;
- `refreshToken` em cookie `HttpOnly`, `Secure`, `SameSite`.

Se usar cookie HttpOnly, o frontend nao le o refresh token. O endpoint `/auth/refresh` deve usar o cookie automaticamente.

## Regras importantes

- Nunca confiar apenas na role do frontend.
- Backend deve validar JWT e permissoes em todos os endpoints protegidos.
- Frontend apenas melhora a experiencia; backend e a fonte real de seguranca.
- `ProtectedRoute` nao substitui middleware/autorizacao no backend.
