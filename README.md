# 3CAI - AI Career Counseling Coach

3CAI is a comprehensive, AI-powered platform designed to revolutionize career counseling. By leveraging cutting-edge AI models, it provides personalized guidance, visual career roadmaps, and professional document optimization to help users achieve their career goals.

## 🚀 Features

- **Interactive AI Career Roadmap**: Generate dynamic, visual step-by-step career paths using `@xyflow/react`. Visualize your journey from where you are to where you want to be.
- **AI CV Analyzer**: Upload your resume and receive instant, actionable feedback to optimize it for ATS and recruiters.
- **Smart Cover Letter Generator**: Generate professional and tailored cover letters specifically for the job roles you're targeting.
- **AI Career Assistant (Chat)**: A dedicated 24/7 AI coach to answer your career-related questions and provide mentorship.
- **Subscription Management**: Seamlessly upgrade to premium features with integrated Stripe payments.
- **Background Task Processing**: Robust and reliable background workflows powered by Inngest.

## 🖼️ Project UI & Demo

### Showcase
| Feature | Preview |
|---------|---------|
| **Dashboard** | ![Dashboard Preview](https://via.placeholder.com/800x450?text=3CAI+Dashboard+Preview) |
| **Career Roadmap** | ![Roadmap Preview](https://via.placeholder.com/800x450?text=Visual+Career+Roadmap+Demo) |
| **CV Analyzer** | ![CV Analyzer Preview](https://via.placeholder.com/800x450?text=AI+CV+Analysis+Interface) |

> [!TIP]
> Add your own screenshots to the `public/screenshots/` directory and update the links above for a better showcase!

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Visualizations**: [@xyflow/react](https://reactflow.dev/) (React Flow)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) with [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) (Google & GitHub)
- **AI Engines**: [Gemini API](https://ai.google.dev/), [Groq API](https://groq.com/)
- **Workflows**: [Inngest](https://www.inngest.com/)
- **Payments**: [Stripe](https://stripe.com/)

## ⚙️ Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Stripe account
- Inngest account
- API keys for Google Gemini or Groq

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rai-Anish/3cai.git
   cd 3cai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   # Auth
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=http://localhost:3000

   # Database
   DATABASE_URL=your_postgresql_url

   # OAuth Providers
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   GITHUB_CLIENT_ID=your_github_id
   GITHUB_CLIENT_SECRET=your_github_secret

   # Email (Nodemailer)
   GMAIL_USER=your_email
   GMAIL_APP_PASSWORD=your_app_password

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret

   # AI & Workflows
   GEMINI_API_KEY=your_gemini_key
   GROQ_API_KEY=your_groq_key
   INNGEST_SIGNING_KEY=your_inngest_key
   ```

4. Initialize the database:
   ```bash
   npm run db:push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. In separate terminals, run Stripe and Inngest listeners:
   ```bash
   npm run stripe:listen
   npm run inngest:dev
   ```

## 📄 License

This project is licensed under the MIT License.
