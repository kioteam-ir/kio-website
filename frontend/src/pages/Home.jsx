import { Header } from "../components/Header";
import HeroSection from "../components/HeroSection";
import { MethodologySection } from "../components/MethodologySection";
import ServicesSection from "../components/ServicesSection";
import GrowthSection from "../components/GrowthSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Resumes from "../components/Resumes";
import Consulting from "../components/Consulting";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div>
        <Header />
        <HeroSection />
        <MethodologySection />
        <ServicesSection />
        {/* <GrowthSection /> */}
        <Resumes />
        <Consulting />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
