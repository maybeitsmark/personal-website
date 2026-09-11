// Loads project details by slug, handles scroll locking for detail view, and renders fallback if not found
// https://github.com/maybeitsmark 
// 2026

import { useEffect } from "react";
import { useParams } from "react-router";
// components
import ProjectPage from "@/components/ProjectLayout/ProjectPage";
// data
import { projects } from "@/data/projects";
// hooks 
import { useAppLayout } from "@/hooks/app_layout.hook";

const ProjectRoute = () => {
  const { layout } = useAppLayout();
  const { slug } = useParams();

  const project = slug ? projects[slug as keyof typeof projects] : undefined;

  useEffect(() => {
    if (layout === "project-detail") {
      window.scrollTo(0, 0);
    }
  }, [layout, slug]);

  if (!project) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>404 - Project Not Found</h1>
      </div>
    );
  }

  return <ProjectPage key={slug} data={project} />;
};

export default ProjectRoute;
