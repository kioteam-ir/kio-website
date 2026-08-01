import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { PROJECTS } from "./data/projects";

export function Projects() {
  return (
    <Container as="section" id="projects" dir="rtl" className="py-20">
      <SectionHeading
        index="03"
        eyebrow="نمونه‌کار"
        title="کارهایی که ساخته‌ایم"
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PROJECTS.map((project) => (
          <CornerFrame
            key={project.id}
            className="flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40 transition-colors hover:border-slate-700"
          >
            <div className="h-48 w-full overflow-hidden border-b border-slate-800">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-2 w-fit rounded border border-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-500">
                {project.tag}
              </span>
              <h3 className="mb-2 text-lg font-bold text-white">
                {project.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-7 text-slate-400 line-clamp-4">
                {project.description}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grad-brand-text text-center font-mono text-md mt-4 font-bold uppercase tracking-widest transition-transform hover:scale-105"
              >
                <span className="border-2 p-2 hover:[border-image:linear-gradient(to_left,theme(colors.brand.crimson.500),theme(colors.brand.navy.500))_1] border-transparent [border-image:linear-gradient(to_right,theme(colors.brand.crimson.500),theme(colors.brand.navy.500))_1] duration-500 transition-all">
                  {"⥛ "}مشاهده زنده{" ⥚"}
                </span>
              </a>
            </div>
          </CornerFrame>
        ))}
      </div>
    </Container>
  );
}
