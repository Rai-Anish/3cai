import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./logo";

export function Footer() {
  return (
    <footer className="relative  bg-black border-t border-white/10 pt-16 md:pt-24 pb-12 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 md:h-200 bg-[radial-gradient(circle_at_50%_40%,var(--color-hero-glow),transparent_70%)] -z-10 pointer-events-none opacity-50" />
      
      {/* Geometric Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {/* Abstract Geometry Path - Scaled up */}
         <svg className="absolute w-[180%] h-full top-0 left-[-40%] opacity-[0.15]" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M0 160C100 160 150 40 250 40C350 40 400 120 500 120" stroke="var(--color-primary)" strokeWidth="0.5" strokeDasharray="16 8" className="animate-cs-dash-offset" />
         </svg>
         
         {/* Growth Steps Artifact */}
         <div className="absolute top-[10%] right-[5%] w-64 h-64 opacity-[0.07]">
           <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary">
             <path d="M0 90H20V70H40V50H60V30H80V10H100" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
             {/* Vertical Projection Lines */}
             <path d="M20 70V100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
             <path d="M40 50V100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
             <path d="M60 30V100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
             <path d="M80 10V100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
           </svg>
         </div>

      </div>

      {/* Large Ghost Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/2 select-none pointer-events-none tracking-tighter font-serif italic">
        EVOLVE
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 md:gap-y-16 gap-x-8 mb-16 pt-8">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Logo size={50}/>
              <span className="text-3xl font-black tracking-tighter text-white">
                3CAI
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              We&apos;re on a mission to humanize the job hunt. Empowering your journey with empathetic AI and intelligent career strategy.
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaTwitter, href: "#" },
                { icon: FaLinkedin, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaDiscord, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest opacity-50">Product</h4>
            <Link href="/resume" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Resume Analyzer</Link>
            <Link href="/interviews" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Mock Interviews</Link>
            <Link href="/roadmap" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Career Roadmap</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Pricing</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest opacity-50">Resources</h4>
            <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Career Blog</Link>
            <Link href="/guides" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Interview Guides</Link>
            <Link href="/templates" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Resume Templates</Link>
            <Link href="/help" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Help Center</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest opacity-50">Company</h4>
            <Link href="/results" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Success Stories</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Contact</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-white transition-colors text-sm font-medium">Terms of Service</Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-xs font-mono">
            Crafted with heart for your career journey.
          </p>
          <p className="text-muted-foreground text-xs font-mono">
            © {new Date().getFullYear()} 3CAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
