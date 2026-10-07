import HorizontalScroll from "@/components/HorizontalScroll";
import Menu from "@/components/Menu";
import Panel from "@/components/Panel";
import ProjectCard from "@/components/ProjectCard";
import { profile, projects } from "@/data/projects";
import "./globals.css";

const toId = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Home() {
  const menuItems = [
    { id: "intro", label: "Intro" },
    ...projects.map((p) => ({ id: toId(p.title), label: p.title })),
    { id: "contact", label: "Contact" },
  ];

  return (
    <main>
      <Menu items={menuItems} />

      <HorizontalScroll>
        <Panel id="intro" color={profile.colors.intro} text={profile.colors.introText}>
          <h1 className="font-modestic -ml-1 text-[2rem] leading-8 md:text-[3rem] md:leading-12 md:-ml-1.75 lg:text-[4rem] lg:leading-16 lg:-ml-2.75">{profile.name}</h1>
          <p className="font-europa text-[1.25rem] md:text-[2rem] lg:text-[2.5rem]">{profile.headline}</p>
        </Panel>

        <Panel id="bio" color={profile.colors.bio} text={profile.colors.bioText}>
          <p className="font-europa text-[1.25rem] md:text-[2rem] lg:text-[2.5rem]">{profile.bio}</p>
        </Panel>


        {projects.map((project) => (
          <Panel
            key={project.title}
            id={toId(project.title)}
            color={project.color}
            text={project.textColor}
          >
            <ProjectCard project={project} />
          </Panel>
        ))}

        <Panel id="contact" color={profile.colors.contact} text={profile.colors.contactText}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <ul>
            {profile.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </HorizontalScroll>
    </main>
  );
}
