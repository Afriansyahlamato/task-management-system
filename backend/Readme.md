#  Task Management System: [Backend]

A  full-stack Task Management System where users can create, update, and track tasks across projects

![swagger](../images/swagger.png)


#### 🔥 Endpoints

-  Swagger ui `http://localhost:4000/docs/`
- create user using `user.rest` file

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




