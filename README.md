# 3CAI - AI Career Counseling Coach

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-success?style=for-the-badge&logo=vercel)](https://career-engine-mu.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-yellow?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-blueviolet?style=for-the-badge&logo=stripe)](https://stripe.com/)

3CAI is an AI-powered platform for Career Counseling. UsingLarge Language Models (LLMs) and advanced visual workflows, 3CAI provides highly personalized guidance, dynamic career roadmaps, and professional document optimization to help users achieve their professional ambitions.

## 🚀 Key Features

*   **Interactive AI Career Roadmap**: Generate dynamic, visual step-by-step career paths using `@xyflow/react`.
*   **AI CV Analyzer & Optimizer**: Upload your resume and receive instant, actionable, AI-driven feedback to optimize it for Applicant Tracking Systems (ATS) and human recruiters.
*   **Smart Cover Letter Generator**: Generate professional, highly tailored cover letters specifically crafted for the exact job roles and companies you are targeting, utilizing advanced LLM reasoning.
*   **AI Career Assistant (Chat)**: A dedicated 24/7 AI coach powered by LangChain and advanced AI models to answer your specific career-related questions, prepare you for interviews, and provide continuous mentorship.
*   **Rich Text Editor**: Fully integrated rich-text editing experience powered by TipTap for customizing and refining your generated cover letters and CVs.
*   **Subscription Management**: Seamlessly upgrade to premium features with integrated, secure Stripe payments, offering flexible pricing tiers.
*   **Robust Background Processing**: Reliable background workflows and scheduled tasks powered by Inngest, ensuring heavy AI processing doesn't block the user experience.

## 🖼️ Project UI & Demo

### 🎬 Product Demo Video
Full product demo:
<video src="https://github.com/user-attachments/assets/ae1fa237-c100-45b8-8de4-e8c6b6ae2251" controls muted width="630">
</video>
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-success?style=for-the-badge&logo=vercel)](https://career-engine-mu.vercel.app/)


## 🛠️ Technology Stack

**Frontend:**
*   [Next.js 16+](https://nextjs.org/) (App Router paradigm)
*   [React 19](https://react.dev/)
*   [Tailwind CSS 4](https://tailwindcss.com/) & [tw-animate-css](https://github.com/) for fluid styling and animations
*   [Shadcn UI](https://ui.shadcn.com/) for accessible, customizable components
*   [React Flow (@xyflow/react)](https://reactflow.dev/) for complex node-based visual roadmaps
*   [TipTap](https://tiptap.dev/) for a headless, highly customizable rich text editor

**Backend & Data:**
*   [Better Auth](https://www.better-auth.com/) for secure, robust authentication (Google & GitHub OAuth)
*   [Drizzle ORM](https://orm.drizzle.team/) for type-safe database interactions
*   [PostgreSQL](https://www.postgresql.org/) (via `pg` & `postgres` drivers)
*   [Cloudinary](https://cloudinary.com/) for efficient asset and image management

**AI & Orchestration:**
*   [LangChain](https://js.langchain.com/) for orchestrating LLM workflows and agents
*   [Gemini API](https://ai.google.dev/) & [Groq API](https://groq.com/) for high-performance AI inference
*   [Inngest](https://www.inngest.com/) for durable background jobs, workflow management, and agent orchestration

**Payments & Infrastructure:**
*   [Stripe](https://stripe.com/) for subscription handling and billing management

## 🏗️ Architecture

### System Architecture

```mermaid
graph TD
    Client["Client (Browser)"]
    NextJS["Next.js Application"]
    DB[("PostgreSQL Database\n(via Drizzle ORM)")]
    Auth["Better Auth"]
    Inngest["Inngest (Background Jobs)"]
    Stripe["Stripe (Payments)"]
    LLMs["AI Models (Gemini / Groq)"]
    Cloudinary["Cloudinary (Media)"]

    Client <-->|HTTP/React| NextJS
    NextJS <-->|OAuth/Session| Auth
    NextJS <-->|SQL| DB
    NextJS -->|CRON/Events| Inngest
    Inngest <-->|Background AI Processing| LLMs
    NextJS <-->|Webhooks/API| Stripe
    NextJS <-->|Uploads| Cloudinary
```

### Async AI Workflow

```mermaid
sequenceDiagram
    participant User
    participant App as Next.js App
    participant DB as PostgreSQL
    participant Inngest as Inngest Worker
    participant LLM as Gemini/Groq

    User->>App: Request Career Roadmap / CV Analysis
    App->>DB: Save Initial Request State
    App->>Inngest: Trigger Background Event
    App-->>User: Return "Processing" status
    Inngest->>LLM: Send context & prompt
    LLM-->>Inngest: Return generated JSON/Text
    Inngest->>DB: Update status with results
    User->>App: Fetch generated data
    App->>DB: Query processed results
    App-->>User: Display Interactive Roadmap / Feedback
```

### Database Schema

<img width="643" height="826" alt="3cai_erd" src="https://github.com/user-attachments/assets/ba5054ec-2768-4cee-9766-224e2d0e81d1" />


## 📁 Project Structure

```text
3cai/
├── src/
│   ├── app/             # Next.js 16 App Router pages, layouts, and API routes
│   │   ├── (auth)/      # Authentication-related pages
│   │   ├── (dashboard)/ # Protected dashboard and AI tools routes
│   │   ├── (root)/      # Public landing and marketing pages
│   │   ├── actions/     # Next.js Server Actions
│   │   └── api/         # API routes (Inngest, Webhooks, CRON, etc.)
│   ├── components/      # Reusable UI components (Shadcn, Base UI, custom)
│   ├── constant/        # Application-wide constants and configurations
│   ├── db/              # Drizzle ORM schema, migrations, and database connection
│   ├── hooks/           # Custom React hooks
│   ├── inngest/         # Inngest background functions and agent definitions
│   ├── lib/             # Utility functions, auth configurations, and AI services
│   ├── services/        # External API integrations and core business logic
│   └── proxy.ts         # Proxy (Middleware) configurations
├── drizzle/             # Generated SQL migrations
├── public/              # Static assets (images, fonts, etc.)
├── package.json         # Project dependencies and scripts
└── ...configuration files (Tailwind, ESLint, TypeScript, Next.js)

```

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed and set up before proceeding:
*   **Node.js**: Version 20.x or higher
*   **Database**: A running PostgreSQL instance (local or cloud like Supabase/Neon)
*   **Stripe**: A Stripe developer account for payment webhooks
*   **Inngest**: An Inngest account for local development and production workflows
*   **AI API Keys**: Obtain API keys from Google Gemini and/or Groq
*   **Cloudinary**: A Cloudinary account for media uploads

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Rai-Anish/3cai.git
    cd 3cai
    ```

2.  **Install dependencies:**
    We recommend using `npm` as per the lockfile.
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory. Use `.env.example` if available, or structure it as follows:

    ```env
    # --- Authentication (Better Auth) ---
    BETTER_AUTH_SECRET="your_generated_secret_key"
    BETTER_AUTH_URL="http://localhost:3000"

    # --- Database ---
    DATABASE_URL="postgresql://user:password@localhost:5432/3cai_db"

    # --- OAuth Providers ---
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    GITHUB_CLIENT_ID="your_github_client_id"
    GITHUB_CLIENT_SECRET="your_github_client_secret"

    # --- External Services ---
    GMAIL_USER="your_system_email@gmail.com"
    GMAIL_APP_PASSWORD="your_gmail_app_password"
    CLOUDINARY_URL="your_cloudinary_url"

    # --- Stripe Integration ---
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."

    # --- AI Providers & Workflows ---
    GEMINI_API_KEY="your_gemini_api_key"
    GROQ_API_KEY="your_groq_api_key"
    INNGEST_SIGNING_KEY="your_inngest_signing_key"
    ```

### Database Setup

Run Drizzle ORM to generate schemas and push them to your PostgreSQL database:

```bash
# Generate migrations based on your schema
npm run db:generate

# Push the schema to the database
npm run db:push

# (Optional) Open Drizzle Studio to view your data visually
npm run db:studio
```

### Running the Application

To fully run the application locally, you need three terminal instances running concurrently:

1.  **Start the Next.js Development Server:**
    ```bash
    npm run dev
    ```
    *The app will be available at `http://localhost:3000`*

2.  **Start the Inngest Dev Server (for background jobs):**
    ```bash
    npm run inngest:dev
    ```
    *The Inngest UI will be available, usually at `http://localhost:8288`*

3.  **Start the Stripe Webhook Listener:**
    Make sure you have the Stripe CLI installed.
    ```bash
    npm run stripe:listen
    ```

## 👨‍💻 Developed By

**Anish Rai**  
*Full-Stack Software Engineer specializing in modern web development and AI integrations.*
