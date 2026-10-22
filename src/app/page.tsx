import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { RibbonTicker } from "@/components/sections/RibbonTicker";
import { Portfolio } from "@/components/sections/Portfolio";
import { FeatureTech } from "@/components/sections/FeatureTech";
import { FeatureMobile } from "@/components/sections/FeatureMobile";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0f1d]">
      <Navbar />
      <Hero />
      <TechStack />
      <Services />
      <RibbonTicker />
      <Portfolio />
      <FeatureTech />
      <FeatureMobile />
      <Process />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
