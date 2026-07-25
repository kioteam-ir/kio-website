import Header from "../components/Header";
import Hero from "../components/Hero";
import Techs from "../components/Techs";
import Services from "../components/Services";
import Devs from "../components/Devs";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Resumes from "../components/Resumes";
import Growth from "../components/Growth";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div>
        <Header />
        <Hero />
        <Techs />
        <Services />
        <Devs />
        <Resumes />
        <Growth />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}
