# Prisma Creative Studio

A modern, high-performance landing page for **Elena Ross** — mindset and business coach for ambitious founders. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

![Prisma Creative Studio](/public/logo.png)

---

## 🌟 Features

- **Hero Section**: Engaging full-screen video hero with smooth typography pull-ups and direct inquiry CTA.
- **Interactive Narrative**: Scroll-driven reveal text introducing the philosophy and track record.
- **Program Showcases**: Highlighted offerings including 1:1 Coaching, Group Programs, and Intensive Days.
- **Dynamic Pricing**: Interactive billing toggle (Annual vs. Monthly) across multiple subscription tiers (*Field Notes*, *Studio Pass*, *Full Spectrum*).
- **Client Testimonials**: Animated testimonial carousel with interactive control tabs.
- **Responsive Navigation**: Mobile-optimized hamburger menu and floating back-to-top button.
- **Polished UX & Visuals**: Dark-mode aesthetic, noise texture overlays, and motion animations powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + [PostCSS](https://postcss.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📂 Project Structure

```
.
├── public/                  # Static assets (videos, logos, routes config)
│   ├── hero-video.mp4       # Hero background video
│   ├── canvas-video.mp4     # Feature card background video
│   ├── logo.png             # Brand logo poster image
│   └── manus-routes.json    # Route definitions
├── src/
│   ├── App.tsx              # Main application component & sections
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global CSS & Tailwind imports
├── app.config.ts            # Application metadata configuration
├── index.html               # HTML entry point with web fonts
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and `pnpm` installed:

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CoachingDemo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 🏗️ Build & Deployment

To generate a production-ready build:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

---

## 📄 License

This project is private and proprietary.
