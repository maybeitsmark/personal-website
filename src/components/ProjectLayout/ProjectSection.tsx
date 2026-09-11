// Renders specific project layout sections (image, text, video) based on their type
// https://github.com/maybeitsmark 
// 2026

import { lazy, Suspense, type ReactNode } from 'react';
// types
import type { PageSection } from '@/types/content';
import ProjectImage from './ProjectImage';
import ProjectText from './ProjectText';
import ProjectHeading from './ProjectHeading';
import ProjectBanner from './ProjectBanner';

const ProjectVideo = lazy(() => import('./ProjectVideo'));
const ProjectSlideshow = lazy(() => import('./ProjectSlideshow'));

interface Props {
  section: PageSection;
  eager?: boolean;
};

const ProjectSection = ({ section, eager = false }: Props) => {
  let content: ReactNode = null;

  switch (section.type) {
    case 'image': content = <ProjectImage section={section} eager={eager} />; break;
    case 'banner': content = <ProjectBanner section={section} eager={eager} />; break;
    case 'video': content = <ProjectVideo section={section} />; break;
    case 'slideshow': content = <ProjectSlideshow section={section} />; break;
    case 'text': content = <ProjectText section={section} />; break;
    case 'heading': content = <ProjectHeading section={section} />; break;
  }

  return (
    <Suspense fallback={null}>
      {content}
    </Suspense>
  );
};

export default ProjectSection;
