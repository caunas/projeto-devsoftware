# Arquitetura do Frontend

O projeto e um SPA em React + Vite com tres areas protegidas:

- Portal do Aluno
- Portal do Professor
- Portal do Coordenador

## Fluxo de renderizacao

```txt
main.jsx
  -> App.jsx
    -> Providers globais
      -> AppRoutes.jsx
        -> ProtectedRoute.jsx
          -> Layout do perfil
            -> Sidebar
            -> Pagina
              -> Componentes UI
              -> Dados mockados ou API
```

## Pastas principais

`src/contexts/auth`

Controla sessao, login, logout, perfil do usuario e alteracao de senha. Hoje usa mock e `localStorage`; na integracao JWT, este e o primeiro ponto a ser alterado.

`src/services/api.js`

Cliente Axios centralizado. Toda chamada real ao backend deve passar por este cliente para herdar `baseURL`, token JWT, tratamento de `401` e refresh token.

`src/routes`

Contem a configuracao das rotas e o componente `ProtectedRoute`. A regra atual e:

- usuario nao logado vai para `/login`;
- usuario logado com role errada vai para `/403`;
- usuario logado com role correta acessa o layout do portal.

`src/layouts`

Define a estrutura visual das areas logadas. Cada layout renderiza a `Sidebar` e o `<Outlet />` da rota atual.

`src/components/ui`

Componentes visuais reutilizaveis: cards, agenda, boletim, pesquisa de servicos, carrossel, carteira, lista expansivel de atividades, calendario mensal de eventos e publicacao de atividades.

`src/data`

Dados temporarios do frontend. Na integracao real, esses dados devem ser substituidos por chamadas aos endpoints do backend.

`src/pages`

Entradas de tela. A maioria das paginas apenas seleciona dados e delega a renderizacao aos componentes reutilizaveis.

## Roles

As roles usadas pelo frontend sao:

```txt
aluno
professor
coordenador
```

O backend deve retornar exatamente uma dessas roles no login e no endpoint `/auth/me`.
