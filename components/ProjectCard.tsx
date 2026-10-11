import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div
        data-card-frame
        className="relative aspect-16/10 w-full overflow-hidden shadow-[1px_1px_4px_3px] shadow-white"
      >
        {/* 10% larger than the frame on every side, so the parallax never shows gaps */}
        <div data-card-image className="absolute inset-[-10%]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out motion-safe:mouse:group-hover:scale-105"
          />
        </div>
      </div>
      <div
        data-card-text
        className="md:px-1.25 mt-4 flex-col flex gap-1 md:mt-6 lg:gap-2 "
      >
        <div className="flex flex-col mb-1 md:flex-row justify-baseline items-baseline">
          <h3 className="font-modestic text-[1.5rem] leading-6 md:text-[2rem] md:leading-8 ">{project.title}</h3>
          <p className="mx-2.5 hidden md:block">-</p>
          <p className="font-europa"> {project.role}</p>
        </div>
        <p className="font-modestic">{project.description}</p>
        {project.tags && (
          <ul className="flex gap-x-2 mt-2 md:mt-4 flex-wrap gap-y-2.5">
            {project.tags.map((tag) => (
              <li className="border py-1 px-5 rounded-4xl font-winter" key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  if (!project.url) {
    return (
      <div data-card className="group block px-2.5">
        {content}
      </div>
    );
  }

  return (
    <a
      data-card
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block px-2.5"
    >
      {content}
    </a>
  );
}