# 🚇 METRO-NOVA

> Transforming Urban Mobility with Seamless Innovation

<p align="center">
  <img src="https://img.shields.io/github/last-commit/sundram7865/metro-NOVA?style=flat-square" />
  <img src="https://img.shields.io/github/languages/top/sundram7865/metro-NOVA?style=flat-square" />
  <img src="https://img.shields.io/github/repo-size/sundram7865/metro-NOVA?style=flat-square" />
  <img src="https://img.shields.io/github/license/sundram7865/metro-NOVA?style=flat-square" />
</p>

---

## 🛠️ Built With

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn_UI-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux" />
  <img src="https://img.shields.io/badge/React_Hook_Form-FF69B4?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-purple?style=for-the-badge&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/Mapbox-black?style=for-the-badge&logo=mapbox&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS_Cognito-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</p>


## 🔧 Tech Stack

### Frontend (Vercel Deployment)

* **Next.js 15** – React framework for hybrid rendering
* **React 19** – Latest features & performance
* **TypeScript** – Type-safe development
* **Tailwind CSS** – Utility-first styling
* **Shadcn UI** – Accessible and beautiful UI components
* **Framer Motion** – Animation library
* **Redux Toolkit** – State management
* **React Hook Form + Zod** – Form validation
* **Mapbox API** – Real-time location & geocoding
* **Vercel** – Frontend hosting and CI/CD

### Backend (Render Deployment)

* **Node.js + Express.js** – RESTful API development
* **TypeScript** – For server-side type safety
* **Prisma ORM** – Database modeling
* **PostgreSQL** – Relational database
* **AWS Cognito** – Secure authentication (role-based)
* **Render** – Backend hosting and CI/CD

---

## 🚀 Live Demo

* **Frontend:** [https://metro-nova.vercel.app](https://metro-nova.vercel.app)
* **Backend:** [https://metro-nova-xr1g.onrender.com](https://metro-nova-xr1g.onrender.com)
* **GitHub:** [metro-NOVA GitHub Repo](https://github.com/sundram7865/metro-NOVA)

---

## 🧑‍💻 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sundram7865/metro-NOVA.git
cd metro-NOVA
```

---

## 📦 Backend Setup (Render)

### 2. Navigate to backend folder:

```bash
cd server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT=3002
DATABASE_URL=your_postgresql_connection_url
CLIENT_URL=https://localhost:3000
```

### 5. Generate Prisma client & migrate

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Start the server

```bash
npm run dev
```

Server runs on [http://localhost:3002](http://localhost:3002)

---

## 🖼️ Frontend Setup (Vercel)

### 7. Navigate to frontend

```bash
cd client  # or src if client code is in /src
```

### 8. Install dependencies

```bash
npm install
```

### 9. Create a `.env.local` file

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_client_id
```

### 10. Run the development server

```bash
npm run dev
```

Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 🛡️ Features

* 🧑‍🤝‍🧑 Role-based Access (Tenant & Manager)
* 🗺️ Location-based Search with Mapbox
* 💾 PostgreSQL + Prisma ORM
* 🔐 AWS Cognito Auth
* ⚙️ Fully CI/CD enabled via GitHub → Vercel/Render

---

## 🖼️ Preview

![metroNOVA Preview](https://metro-nova.vercel.app/preview.png)

---

## 📄 License

This project is licensed under the **MIT License**.

---

> Made with ❤️ by [@sundram7865](https://github.com/sundram7865)
