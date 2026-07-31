import { MainLayout } from "../components/layout/MainLayout";
import { Hero } from "../features/home/Hero";
import { TechStack } from "../features/home/TechStack";
import { Services } from "../features/home/Services";
import { Process } from "../features/home/Process";
import { Projects } from "../features/home/Projects";
import { Pricing } from "../features/home/Pricing";
import { Team } from "../features/home/Team";
import { GrowthTogether } from "../features/home/GrowthTogether";
import { Faq } from "../features/home/Faq";
import { ContactSection } from "../features/home/ContactSection";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <TechStack />
      <Services />
      <Process />
      <Projects />
      <Pricing />
      <Team />
      <GrowthTogether />
      <Faq />
      <ContactSection />
    </MainLayout>
  );
}
