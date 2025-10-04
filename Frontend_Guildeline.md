### 🚀 Frontend Development Guide 

(React + Vite + Redux + Tailwind+Typescript)

This document explains the **full journey of building this frontend** — from scratch to production-ready deployment.  

---

**📦 1. Project Initialization**
- Start a new project with React + TypeScript using Vite:
  ```bash
  npm create vite@latest fronted -- --template react-ts
  cd fronted
  npm install
  ```
- Setup **Git** for version control.
- Add a `README.md` and `.gitignore`.

**⚙️ 2. Project Configuration**
- Install core dependencies:
  ```bash
  npm install @reduxjs/toolkit react-redux react-router-dom axios jwt-decode
  npm install -D tailwindcss postcss autoprefixer
  ```
- Initialize TailwindCSS:
  ```bash
  npx tailwindcss init -p
  ```
- Configure `tailwind.config.js` and include Tailwind directives in `index.css`.



**🏗️ 3. Project Architecture**

Organize the project with a **scalable folder structure**:
```bash
src/
 ├── components/    # Reusable UI components
 ├── pages/         # Route-level pages
 ├── redux/         # State management (Redux Toolkit)
 ├── routes/        # App routing
 ├── utils/         # Helper utilities (JWT, etc.)
 ├── lib/           # API wrapper with Axios
 ├── types/         # TypeScript interfaces & types
 └── main.tsx       # App entry point
```

**🔑 4. Authentication Flow**
- Add `authSlice.ts` in Redux to handle login/logout.
- Create `Login.tsx` page with a form.
- Store and validate JWT tokens in `utils/jwt.ts`.
- Add `PrivateRoute.tsx` for route protection.

**🎨 5. UI Development**
- Build **reusable components**: `Button`, `Card`, `NavBar`.
- Build **domain-specific components**:
  - `TaskList`, `TaskRow`, `TaskModal`, `TaskFilters`.
- Use **TailwindCSS** classes for styling and responsive design.

**🔄 6. State Management**
- Setup `redux/store.ts` and connect Redux Provider in `main.tsx`.
- Create feature slices:
  - `tasksSlice.ts` → CRUD operations for tasks.
  - `projectsSlice.ts` → Manage multiple projects.
  - `authSlice.ts` → Authentication state.
- Use typed hooks (`useAppSelector`, `useAppDispatch`).


**🌐 7. API Integration**
- Create `lib/api.ts` with Axios instance:
  - Attach JWT token to headers.
  - Handle request/response interceptors.
- Connect API calls:
  - `fetchTasks`, `addTask`, `updateTask`, `deleteTask`.
  - `login`, `logout`.

**🧭 8. Routing**

- Setup `routes/App.tsx` with **React Router v6**.
- Routes:
  - `/login` → Public
  - `/dashboard` → Private (requires auth)
- Wrap private routes with `PrivateRoute`.

**🧪 9. Testing**
- Use **TypeScript types** for compile-time safety.

**🚀 10. Build & Deployment**
- Build for production:
  ```bash
  npm run build
  ```
**✅ Summary**
By following these steps, the frontend goes from:
- **Zero setup → Fully structured app → Production deployment**  

