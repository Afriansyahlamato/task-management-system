# 🚀 Task Management System

A **full-stack Task Management System** built with **Node.js (Express, MongoDB, TypeScript) for backend** and **React + Vite Typescript, Tailwind for frontend**.  


#### Project Demo :point_down:

[![Project Demo](./images/dashboard.png)](https://drive.google.com/file/d/1rI5VBwwmZSq0UnRMKzwE9Uw9Jit_hf0v/view?usp=sharing)


👉 [Frontend Output UI](https://github.com/bappasahabapi/task-management-system/blob/main/fronted/Readme.md)
👉 [Backend Swagger UI](https://github.com/bappasahabapi/task-management-system/blob/main/fronted/Readme.md)

This guide will help you set up and run the project locally.


#### 🔥 Quickstart

Clone the project :

    git clone https://github.com/bappasahabapi/task-management-system.git

Go to the project folder or open the project in vsc/terminal
    
    cd task-management-system

Inside the task-management-system folder we have two folder. frontend , backend

---

`Run backend`


Go to the **backend folder** and then create the `.env` file in the inside the backend folder and paste the code from .env.example

    cd backend
  
In the backend create  `.env` file and  paste the code
```ts
JWT_SECRET=dointechltd
PORT=4000
MONGO_URI=mongodb+srv://bappasaha161:bapibarija@cluster0.nnn0vgn.mongodb.net/doinTech?retryWrites=true&w=majority&appName=Cluster0

```
Then go to the terminal and paste these two comman
```ts
npm install
npm run dev  // for run the server.

```
and you will see this output in the terminal

```bash
> tms-backend-bappa@1.0.0 dev
> nodemon --watch src --ext ts --exec tsx src/server.ts

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `tsx src/server.ts`
✅ Connected to MongoDB
🚀 Doin Tech Server running on http://localhost:4000
```

`Run fronted`

```bash
# Go to the fronted folder and install the packages and then run the server

cd frontend
npm i
npm run dev

```

and you will see this output in the terminal
```bash
VITE v5.4.20  ready in 383 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```



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


👍 **Logic wise Extra things needed to be added for scale up the application**

- Tasks are scoped to the logged-in user; only owners can view/update/delete.

---

### Step By Step executation for Backend:

👉 [Step By Step executation:](https://github.com/bappasahabapi/task-management-system/blob/main/backend/Readme.md) 

### Step By Step executation for Fronted:

👉 [Step By Step executation:](https://github.com/bappasahabapi/task-management-system/blob/main/fronted/Readme.md) 

