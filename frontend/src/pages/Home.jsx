import { Header } from '../components/Header';
import HeroSection from '../components/HeroSection';
import { MethodologySection } from '../components/MethodologySection';
import ServicesSection from '../components/ServicesSection';
import GrowthSection from '../components/GrowthSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Resumes from '../components/Resumes';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="">
        <Header />
        <HeroSection />
        <MethodologySection />
        <ServicesSection />
        <GrowthSection />
        <Resumes />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}