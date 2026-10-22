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
    <main className="flex min-h-screen flex-col bg-[#F6F6F8] bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(255,106,0,0.05),rgba(246,246,248,0))] text-[#171717] overflow-hidden">
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
