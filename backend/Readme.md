#  Task Management System: [Backend]

A  full-stack Task Management System where users can create, update, and track tasks across projects

![swagger](../images/swagger.png)

#### 🔥 Requirement: [All features are implementd]

✅  Backend (Node.js + Express): `implemented`

- REST API for Task model: `(implementd)`
    - **Fields**: title, description, status (Pending, In Progress, Completed),
assignedUser, dueDate

- Routes for Create, Read, Update, Delete. `(implemented)`



✅ Authentication: `(implemented)`

- Implement JWT-based login.
-  Only authenticated users can create/update tasks.

✅ Bonus: `(implemented)`

- Add search/filter tasks by status or due date.
- Add API documentation with Swagger.

---
👍 Logic wise Extra things needed to be added for scale up the application

- Tasks are scoped to the logged-in user; only owners can view/update/delete.


#### 🔥 Quickstart

In the backend folder  create  `.env` file and  paste the code
```ts
JWT_SECRET=dointechltd
PORT=4000
MONGO_URI=mongodb+srv://bappasaha161:bapibarija@cluster0.nnn0vgn.mongodb.net/doinTech?retryWrites=true&w=majority&appName=Cluster0

```


```bash
# from this folder or this path /backend
npm i
npm run dev    # starts with nodemon + tsx
```

#### 🔥 Endpoints

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

---


steps:

- create user using `user.rest` file or swagger ui `http://localhost:4000/docs/#/Auth/post_auth_register`



