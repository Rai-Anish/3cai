import React from "react";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, Eye, Database, Globe } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "May 4, 2026";

  const sections = [
    {
      title: "01. Data Collection",
      icon: <Database className="w-5 h-5 text-primary" />,
      content:
        "We collect only the information necessary to provide our services. This may include your name, email address (via third-party authentication), and any documents you choose to upload, such as resumes. We also track usage data to manage service limits and billing.",
    },
    {
      title: "02. AI Processing",
      icon: <ShieldCheck className="w-5 h-5 text-secondary" />,
      content:
        "Your data may be processed by trusted third-party AI providers, such as OpenAI or Anthropic, to deliver real-time results. We do not use your data to train AI models without your explicit consent.",
    },
    {
      title: "03. Security Measures",
      icon: <Lock className="w-5 h-5 text-accent" />,
      content:
        "We implement industry-standard security practices, including SSL/TLS encryption, to protect your data. Payment processing is handled securely through Stripe, and we do not store sensitive financial information such as credit card details.",
    },
    {
      title: "04. Your Rights",
      icon: <Eye className="w-5 h-5 text-primary" />,
      content:
        "You have the right to access, update, or delete your personal data. You may request a copy of your data or permanently delete your account at any time through your account settings or by contacting us.",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-16 text-zinc-400 font-sans selection:bg-primary/30">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-[10px] uppercase tracking-widest">
            <Globe className="w-3 h-3" />
            Privacy & Data Protection
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-tight text-zinc-500">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <Separator className="bg-zinc-800 mb-16" />

        {/* Intro */}
        <div className="space-y-16">
          <section>
            <p className="text-lg leading-relaxed text-zinc-300">
              We are committed to protecting your personal data and ensuring transparency in how it is used. This policy explains what information we collect, how we use it, and the choices you have regarding your data.
            </p>
          </section>

          {/* Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-white font-mono font-bold uppercase tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed border-l border-zinc-800 pl-4">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <Separator className="bg-zinc-800" />

          {/* Detailed Content */}
          <article className="prose prose-invert max-w-none space-y-8">
            <div className="space-y-4">
              <h3 className="text-white text-xl font-bold">
                Data Retention & Account Deletion
              </h3>
              <p className="text-sm leading-relaxed">
                We retain transaction and usage records as required by applicable laws and regulations. Uploaded documents may be temporarily stored to support service functionality, but you can delete them at any time through your account settings.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/50 space-y-4">
              <h3 className="text-white text-sm font-mono font-bold uppercase">
                Contact
              </h3>
              <p className="text-xs font-mono text-zinc-500">
                If you have any questions about this policy or your data, please contact us at:
              </p>
              <a
                href="mailto:3cai.company@gmail.com"
                className="inline-block text-primary font-mono text-sm hover:underline"
              >
                3cai.company@gmail.com
              </a>
            </div>
          </article>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-800 text-center">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} 3CAI. All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}