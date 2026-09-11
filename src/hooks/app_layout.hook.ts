// Parses current URL path to determine application section (home/projects/project-detail) and extracts active project slug
// https://github.com/maybeitsmark 
// 2026

import { useMemo } from "react";
import { useLocation } from "react-router";

export type LayoutState = "home" | "projects" | "project-detail";

export const useAppLayout = () => {
  const location = useLocation();

  const { layout, projectSlug } = useMemo(() => {
    const path = location.pathname;

    if (path === "/" || path === "/home") {
      return { layout: "home" as LayoutState, projectSlug: null };
    };

    if (path === "/projects") {
      return { layout: "projects" as LayoutState, projectSlug: null };
    };

    const match = path.match(/^\/projects\/([^/]+)$/);

    if (match) {
      return { layout: "project-detail" as LayoutState, projectSlug: match[1] };
    };

    return { layout: "home" as LayoutState, projectSlug: null };
  }, [location.pathname]);

  return { pathname: location.pathname, layout, projectSlug };
};
