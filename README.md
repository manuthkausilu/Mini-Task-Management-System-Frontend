# Mini Task Management System (Frontend)

A premium, high-performance task management application built with **Next.js 16** and **Tailwind CSS 4**. This system features a sophisticated glassmorphism design, robust role-based access control, and advanced real-time monitoring.

## ✨ Premium Features

### 🎨 Iris Glassmorphism UI
- **Modern Aesthetic**: A clean, light-themed "Iris" design with dynamic background blurs and ethereal glow decorators.
- **Micro-Animations**: Smooth transitions, hover effects, and entrance animations for a responsive, "alive" feel.
- **Glassmorphism 2.0**: Sophisticated card designs using advanced backdrop filters and subtle inner shadows.

### 🛡️ Secure Infrastructure
- **Role-Based Access Control (RBAC)**: Distinct dashboards for **ADMIN** and **USER** roles.
- **Protected Routing**: Specialized middleware to ensure users only access authorized protocols.
- **Premium Alert System**: Custom-built modal system replaces standard browser alerts for a cohesive UI experience.

### 📊 Admin Control Center
- **Global Overview**: Real-time KPI cards showing Total Users and Active Tasks counts immediately upon login.
- **User Registry**: Effortless user management, including role modification and system decommissioning (deletion).
- **Task Monitoring**: Global oversight of all tasks with advanced filtering capabilities.

### 📝 Strategic Task Management
- **Dashboard Grid**: Intuitive task lists with priority-coded badges.
- **Advanced Filtering**: Rapidly isolate tasks by **Status** (TODO, IN PROGRESS, DONE) and **Priority** (LOW, MEDIUM, HIGH).
- **Dynamic CRUD**: Seamless task creation, editing, and status toggling.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Icons**: Custom SVG icons with animate-on-hover logic.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- NPM / Yarn / PNPM

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```

4. Run the Development Server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Dashboards, Auth, Layout)
├── components/           # Reusable UI Components (Navbar, FilterBar, Tables)
├── context/              # React Context (Auth, Global Alerts)
├── services/             # API Service Layer (HttpClient, Admin, Tasks)
├── types/                # TypeScript Interfaces and Enums
└── public/               # Static Assets
```

---

## 📝 License

This project is private and intended for internal use only.
