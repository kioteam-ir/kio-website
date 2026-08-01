import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { Accordion } from "../../components/ui/Accordion";
import { FAQS } from "./data/faqs";

export function Faq() {
  return (
    <Container as="section" id="faq" dir="rtl" className="py-20">
      <SectionHeading index="06" eyebrow="سوالات متداول" title="سوالی دارید؟" />
      <div className="mx-auto mt-14 max-w-3xl">
        <Accordion items={FAQS} />
      </div>
    </Container>
  );
}
