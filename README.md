<div align="center">

# Next.js & Mantine Todo App

A clean, modern, fully responsive **Task Management App** built with  
**Next.js 16 (App Router) · Mantine UI v8 · Redux Toolkit · TypeScript**

---

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Mantine](https://img.shields.io/badge/Mantine-v8-339AF0?logo=mantine)](https://mantine.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## Features

✔ **Next.js App Router** for performance & scalability  
✔ **Mantine v7 UI** with rich components & accessibility  
✔ **Redux Toolkit** for predictable state management  
✔ **Fully Responsive** across Desktop, Tablet, and Mobile  
✔ **Task CRUD Operations** (Create, Edit, Delete)  
✔ **Due Date Picker** with Day.js  
✔ **Smart Filtering**: All · Pending · Completed  
✔ **UX Enhancements**: validation, loading states, empty states

---

## Screenrecords

### Desktop Layout

_A clean overview of tasks, filters, and actions._

### Mobile Layout

_Responsive design with stackable components._

---

## Technology Stack

| Category             | Tech                    |
| -------------------- | ----------------------- |
| **Framework**        | Next.js 16 (App Router) |
| **UI Library**       | Mantine UI v8           |
| **State Management** | Redux Toolkit           |
| **Language**         | TypeScript              |
| **Icons**            | Tabler Icons            |
| **Date Handling**    | Day.js                  |

---

## Getting Started

Follow the steps below to run the project locally.

### **Prerequisites**

- Node.js **18+**
- npm or yarn

### **Installation**

1. Clone the repository

```bash
git clone https://github.com/hsuyaa0413/next-mantine-todo.git
cd next-mantine-todo
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### **Project Structure**

```bash
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main entry point of the app
│
├── components/
│   ├── TodoApp.tsx         # Main Todo application UI
│   └── TodoItem.tsx        # Single Todo item component
│
├── providers/
│   └── providers.tsx       # Mantine / Redux Providers wrapper
│
├── store/
│   ├── store.ts            # Redux store configuration
│   └── todoSlice.ts        # Todo slice with reducers/actions
│
└── types/
    └── todo.ts             # Todo interfaces & types
```

### **State Management Logic**

The application uses **Redux Toolkit** to manage the global state.

- **Adding Todos**: Pushes a new object with a generated UUID and ISO formatted date string.

- **Sorting**: The UI layer (TodoApp.tsx) handles the derived state, ensuring that Pending tasks always appear above Completed tasks, and are secondarily sorted by their Due Date.
