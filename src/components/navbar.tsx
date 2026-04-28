"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, FileText, MessageSquareText, Map, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Container } from "./container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Logo from "./logo";

export function Navbar({ session }: { session: any }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;


  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <Container as="nav" className="flex px-5 md:px-14 xl:px-20 justify-between items-center py-4 border-b border-white/5 bg-background/60 backdrop-blur-xl  pointer-events-auto">
        <div className="flex justify-start items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div >
             <Logo size={50}/>
            </div>
            <span className="text-xl font-black tracking-tighter">
              3CAI
            </span>
          </Link>
        </div>
        
        {/* Centered Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center text-[13px] font-medium">
          <Link href="/" className={`transition-colors ${isActive('/') ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'}`}>Home</Link>

          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none cursor-pointer">
              Products <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/80 backdrop-blur-2xl border border-primary/20 rounded-2xl p-2 min-w-60 shadow-2xl shadow-primary/10">
              <DropdownMenuItem className="rounded-xl focus:bg-primary/10 transition-colors cursor-pointer">
                <Link href="/products/resume" className="flex items-center gap-3 w-full p-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">Resume Analyzer</div>
                    <div className="text-[10px] text-muted-foreground">Beat the ATS bots</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl focus:bg-secondary/10 transition-colors cursor-pointer">
                <Link href="/products/interviews" className="flex items-center gap-3 w-full p-1">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <MessageSquareText className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">Mock Interviews</div>
                    <div className="text-[10px] text-muted-foreground">Ace your behaviorals</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl focus:bg-accent/10 transition-colors cursor-pointer">
                <Link href="/products/roadmap" className="flex items-center gap-3 w-full p-1">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Map className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">Career Roadmap</div>
                    <div className="text-[10px] text-muted-foreground">Chart your path</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/pricing" className={`transition-colors ${isActive('/pricing') ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'}`}>Pricing</Link>
          <Link href="/results" className={`transition-colors ${isActive('/results') ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary'}`}>Results</Link>
        </div>
        
        <div className="flex flex-row gap-3 items-center">
          {!session && (
            <Link 
              href="/sign-in" 
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[13px] font-medium hover:bg-white/10 transition-all group"
            >
              Login
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
          
          <div className="hidden md:block">
            {session ? (
              <Button className="rounded-full px-6 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all text-[13px]">
                <Link href="/workspace">Dashboard</Link>
              </Button>
            ) : (
              <Button className="rounded-full px-6 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all text-[13px]">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border border-primary/20" />}>
                <Menu className="w-5 h-5 text-primary" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-2xl border-l border-primary/10 p-8 w-[320px]">
                <div className="flex flex-col h-full">
                  <Link href="/" className="flex items-center gap-2 mb-12 group w-fit">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Image 
                        src="/assets/logo.svg" 
                        alt="3CAI Logo" 
                        width={40} 
                        height={40} 
                        className="object-contain"
                      />
                    </div>
                    <span className="text-2xl font-black tracking-tighter">3CAI</span>
                  </Link>

                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Main</p>
                      <Link href="/" className={`text-xl font-bold transition-colors ${isActive('/') ? 'text-primary' : 'hover:text-primary'}`}>Home</Link>
                      <Link href="/pricing" className={`text-xl font-bold transition-colors ${isActive('/pricing') ? 'text-primary' : 'hover:text-primary'}`}>Pricing</Link>
                      <Link href="/results" className={`text-xl font-bold transition-colors ${isActive('/results') ? 'text-primary' : 'hover:text-primary'}`}>Results</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Solutions</p>
                      <Link href="/resume" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Resume Analyzer
                      </Link>
                      <Link href="/interviews" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <MessageSquareText className="w-4 h-4" /> Mock Interviews
                      </Link>
                      <Link href="/roadmap" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <Map className="w-4 h-4" /> Career Roadmap
                      </Link>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-4">
                    {session ? (
                      <Button className="w-full rounded-full py-6 bg-primary text-primary-foreground font-bold text-lg">
                        <Link href="/workspace">Go to Workspace</Link>
                      </Button>
                    ) : (
                      <>
                        <Button className="w-full rounded-full py-6 bg-primary text-primary-foreground font-bold text-lg">
                          <Link href="/sign-up">Sign Up Now</Link>
                        </Button>
                        <Link href="/sign-in" className="text-center text-muted-foreground hover:text-white transition-colors py-2 text-sm font-medium">
                          Already have an account? Login
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </div>
  );
}
