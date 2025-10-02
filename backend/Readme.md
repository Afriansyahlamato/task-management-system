#  Task Management System: [Backend]

A  full-stack Task Management System where users can create, update, and track tasks across projects

#### Quickstart

```bash
# from this folder
npm i
npm run dev    # starts with nodemon + tsx
```

#### Endpoints

- `POST /auth/register` 
    - { email, username, name, password }` -> `{ user, token }
- `POST /auth/login` 
    - { username, password }` -> `{ user, token }
- `POST /projects`  (auth) 
    - `{ name }`
- `POST /tasks` (auth) 
    - { id,projectId, title, description?, status?, priority?, due? }
- `GET /projects` (auth)
- `GET /tasks` (auth) query: `q,status,projectId,sort`
- `GET /tasks/:id` (auth)
- `PATCH /tasks/:id` (auth)
- `DELETE /tasks/:id` (auth)

