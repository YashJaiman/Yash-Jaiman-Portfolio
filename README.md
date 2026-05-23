# Yash Jaiman Portfolio

> A premium developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, live LeetCode data, and a cyberpunk glassmorphism interface.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=0B1020)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF2D75?style=for-the-badge&logo=framer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111827)

---

## 🚀 Live Demo

- **Portfolio Live Link:** https://yash-jaiman-portfolio-aojx.vercel.app/

---

## ✨ Features

- **Responsive Design** — polished layouts for mobile, tablet, and desktop.
- **Modern UI/UX** — premium cyberpunk visuals with glassmorphism cards and neon accents.
- **Live LeetCode Dashboard** — real API-driven solved stats, contest data, badges, and heatmap.
- **Animated Timeline** — clean top-to-bottom Experience & Journey section.
- **Certifications Showcase** — credential cards with direct PDF links.
- **Smooth Animations** — Framer Motion transitions and scroll-triggered reveals.
- **Performance Optimized** — Vite build pipeline, optimized components, and responsive assets.
- **Recruiter Friendly** — clear sections for skills, projects, experience, certifications, and contact.

---

## 🧰 Tech Stack

| Category | Tools |
| --- | --- |
| Frontend | React, JavaScript |
| Build Tool | Vite |
| Styling | Tailwind CSS, custom CSS utilities |
| Animation | Framer Motion, React Parallax Tilt |
| APIs | REST APIs, LeetCode API integration |
| Icons | React Icons, Lucide React |
| 3D / Visuals | Three.js, React Three Fiber |

---


## 📁 Folder Structure

```text
.
├── public/
│   ├── certificate/
│   │   ├── aws-certificate.pdf
│   │   ├── dsa-certificate.pdf
│   │   ├── google-cloud-certificate.pdf
│   │   ├── nptel-c-certificate.pdf
│   │   ├── nptel-entrepreneurship-certificate.pdf
│   │   ├── nptel-oop-certificate.pdf
│   │   ├── nptel-python-certificate.pdf
│   │   └── rhcsa-certificate.pdf
│   └── assets and public media
├── src/
│   ├── components/
│   │   ├── About/
│   │   ├── Certifications/
│   │   ├── Contact/
│   │   ├── Experience/
│   │   ├── Hero/
│   │   ├── LeetCodeStats/
│   │   ├── Projects/
│   │   └── Skills/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The local app usually runs at:

```text
http://localhost:3000
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## 🔐 Environment Variables

This project currently works without required environment variables.

If future integrations need private keys or configurable endpoints, create a local `.env` file:

```env
VITE_API_BASE_URL=https://example.com
```

> Keep all `.env` files out of Git. Vite only exposes variables prefixed with `VITE_`.

---

## ⚡ Performance & Optimization

- Lazy and conditional rendering for heavier visual sections.
- Vite production build with minification and asset optimization.
- Responsive Tailwind layouts to reduce layout shifts across devices.
- Reusable component architecture for cleaner maintenance.
- Defensive API handling for the LeetCode dashboard with loading and fallback states.
- Smooth Framer Motion animations tuned for a polished portfolio experience.

---

## 🗺️ Future Improvements

- Add a technical blog section.
- Add dark/light mode controls.
- Build an admin dashboard for managing portfolio content.
- Add more API integrations for GitHub, coding platforms, or analytics.
- Add automated visual regression checks for key sections.

---

## 👨‍💻 Author

**Yash Jaiman**
