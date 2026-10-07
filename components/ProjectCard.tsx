import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="px-1.25 mt-2 flex-col flex gap-1 lg:gap-2">
        <div className="flex justify-baseline items-baseline">
        <h3 className="font-modestic text-[1.5rem] leading-6 md:text-[2rem] md:leading-8 ">{project.title}</h3>
        <p className="mx-2.5">-</p>
        <p className="font-europa"> {project.role}</p>
        </div>
        <p className="font-europa">{project.description}</p>
        {project.tags && (
          <ul className="flex gap-x-2">
            {project.tags.map((tag) => (
              <li className={`border-1 py-1 px-5 rounded-4xl font-winter`}key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
     
    </>
  );

  if (!project.url) {
    return <div className="block px-2.5">{content}</div>;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block px-2.5"
    >
      {content}
    </a>
  );
}