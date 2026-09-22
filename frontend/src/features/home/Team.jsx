import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { TestimonialCarousel } from "../../components/testimonials/TestimonialCarousel";
import { TEAM_TESTIMONIALS } from "./data/testimonials";

export function Team() {
  return (
    <Container as="section" id="team" dir="rtl" className="py-10">
      <SectionHeading index="05" eyebrow="تیم" title="توسعه‌دهندگان" />
      <div className="mt-12">
        <TestimonialCarousel testimonials={TEAM_TESTIMONIALS} />
      </div>
    </Container>
  );
}
