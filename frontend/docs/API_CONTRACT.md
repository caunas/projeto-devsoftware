# Contrato de API Esperado

Este contrato descreve endpoints sugeridos para substituir os dados mockados atuais.

## Autenticacao

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Usuario

```txt
PATCH /users/me
PATCH /users/me/password
```

## Aluno

```txt
GET /students/me/dashboard
GET /students/me/activities
POST /students/me/activities/:activityId/attachments
GET /students/me/grades
GET /students/me/calendar
GET /students/me/billing
GET /students/me/card
GET /students/me/careers
GET /students/me/services?search=
```

## Professor

```txt
GET /teachers/me/dashboard
GET /teachers/me/grades
GET /teachers/me/classes
GET /teachers/me/calendar
GET /teachers/me/activities
POST /teachers/me/activities
GET /teachers/me/card
GET /teachers/me/services?search=
```

## Coordenador

```txt
GET /coordinators/me/dashboard
GET /coordinators/me/classes
GET /coordinators/me/events?month=6&year=2026
POST /coordinators/me/events
GET /coordinators/me/teachers
GET /coordinators/me/requests
GET /coordinators/me/services?search=
```

## Formatos usados no frontend

### Usuario

```json
{
  "id": "123",
  "name": "Maria Eduarda",
  "email": "maria@novaluz.edu.br",
  "role": "aluno"
}
```

### Card de estatistica

```json
{
  "label": "Frequencia",
  "value": "92%",
  "helper": "Media geral do semestre"
}
```

### Evento de carrossel

```json
{
  "date": "18 Jun",
  "title": "Tech Week Nova Luz",
  "description": "Semana com palestras sobre tecnologia.",
  "location": "Auditorio principal"
}
```

### Agenda

```json
{
  "date": "10 Jun",
  "weekday": "Quarta",
  "events": [
    {
      "time": "19:00",
      "title": "Avaliacao parcial",
      "description": "Banco de Dados, laboratorio 02."
    }
  ]
}
```

### Atividade do aluno

Usada em `ActivityList`, com abertura de detalhes e anexo apenas quando `status` for `Pendente`.

```json
{
  "id": "act-123",
  "title": "Projeto integrador",
  "detail": "Entrega em 12/06",
  "description": "Entregar prototipo navegavel e documento de requisitos.",
  "status": "Pendente",
  "variant": "warning"
}
```

### Anexo de atividade do aluno

```http
POST /students/me/activities/act-123/attachments
Content-Type: multipart/form-data
```

Campo esperado:

```txt
file
```

### Publicacao de atividade do professor

```json
{
  "title": "Lista de SQL",
  "description": "Resolver exercicios de joins e normalizacao.",
  "deadline": "2026-06-14"
}
```

Resposta sugerida:

```json
{
  "id": "act-456",
  "title": "Lista de SQL",
  "detail": "Prazo: 2026-06-14",
  "description": "Resolver exercicios de joins e normalizacao.",
  "status": "Publicada"
}
```

### Publicacao de evento do coordenador

```json
{
  "date": "2026-06-18",
  "title": "Semana de Tecnologia",
  "description": "Evento com palestras e workshops.",
  "location": "Auditorio principal"
}
```

Resposta sugerida:

```json
{
  "id": "evt-123",
  "date": "2026-06-18",
  "title": "Semana de Tecnologia",
  "description": "Evento com palestras e workshops.",
  "location": "Auditorio principal",
  "status": "Publicado"
}
```

### Calendario mensal de eventos do coordenador

Usado por `CoordinatorEventCalendar`. O frontend envia mes e ano para consultar outro periodo.

```json
[
  {
    "id": "evt-123",
    "date": "2026-06-18",
    "title": "Colegiado de curso",
    "description": "Reuniao para avaliacao do semestre.",
    "location": "Sala da coordenacao"
  }
]
```

### Servico

```json
{
  "type": "Academico",
  "name": "Declaracao de matricula",
  "description": "Emissao digital de comprovante."
}
```

### Nota

```json
{
  "subject": "Engenharia de Software",
  "score": 9,
  "status": "Aprovado"
}
```

## Erros padronizados

O frontend deve conseguir tratar erros no formato:

```json
{
  "message": "Usuario ou senha invalidos.",
  "code": "INVALID_CREDENTIALS",
  "status": 401
}
```

Status esperados:

- `400`: dados invalidos;
- `401`: nao autenticado ou token expirado;
- `403`: autenticado sem permissao;
- `404`: recurso inexistente;
- `422`: validacao de regra de negocio;
- `500`: erro inesperado.
