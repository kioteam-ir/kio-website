import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MethodologySection from '../components/MethodologySection';
import ServicesSection from '../components/ServicesSection';
import GrowthSection from '../components/GrowthSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <MethodologySection />
      <ServicesSection />
      <GrowthSection />
      <ContactForm />
      <Footer />
    </div>
  );
}