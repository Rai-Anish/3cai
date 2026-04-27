import { FeaturesCta } from "./_components/cta-section";
import { FeaturesGrid } from "./_components/feature_grid";
import { Hero } from "./_components/hero";
import { ProductDemo } from "./_components/product-demo";
import { ProofSection } from "./_components/proof-section";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <TrustLogos />
      <ProductDemo />
      <FeaturesCta />
      <FeaturesGrid />
      <ProofSection />
    </main>
  );
}

function TrustLogos() {
  return (
    <div className="py-12 md:py-20 px-6 max-w-7xl mx-auto w-full animate-cs-fadeup-4">
      <p className="text-center text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] mb-8 md:mb-12">Professionals hired at</p>
      <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 grayscale opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-2xl font-black italic tracking-tighter">Google</span>
        <span className="text-2xl font-black italic tracking-tighter">amazon</span>
        <span className="text-2xl font-black italic tracking-tighter">Meta</span>
        <span className="text-2xl font-black italic tracking-tighter">Microsoft</span>
        <span className="text-2xl font-black italic tracking-tighter">Netflix</span>
      </div>
    </div>
  );
}
