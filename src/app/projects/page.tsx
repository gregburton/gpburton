import { Metadata } from "next";

import ProjectCard from "@/components/project-card";
import projects from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | gpburton",
  description:
    "Browse through my projects to learn more about my coding style.",
};

export default function Projects() {
  return (
    <main className="container mt-5 mb-20 flex flex-col gap-14">
      <h1 className="text-4xl">Projects</h1>
      {projects?.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10">
          {projects.map((project) => (
            <li key={project.name}>
              <ProjectCard
                name={project.name}
                image={project.image}
                description={project.description}
                link={project.link}
                tools={project.tools}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
