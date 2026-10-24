import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Marketplace } from "@/components/sections/Marketplace";
import { RibbonTicker } from "@/components/sections/RibbonTicker";
import { FeatureTech } from "@/components/sections/FeatureTech";
import { FeatureMobile } from "@/components/sections/FeatureMobile";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { getAllProjects, getAllMarketplaceProducts } from "@/db/service";

export default async function Home() {
  const [projects, products] = await Promise.all([
    getAllProjects(),
    getAllMarketplaceProducts(),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#171717] overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio items={projects} />
      <Marketplace items={products} />
      <RibbonTicker />
      <Process />
      <FeatureMobile />
      <FeatureTech />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
