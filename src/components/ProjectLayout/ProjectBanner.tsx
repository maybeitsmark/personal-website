// Renders an image banner section for project pages using ProjectRow
// https://github.com/maybeitsmark 
// 2026

import ProjectRow from './ProjectRow';
import LazyImage from '@/components/LazyImage/LazyImage';
import './project_page.css';

interface Props {
  section: {
    src: string;
    alt?: string;
  };
  eager?: boolean;
};

const ProjectBanner = ({ section, eager = false }: Props) => {
  return (
    <ProjectRow>
      <div className="project-banner">
        <LazyImage src={section.src} alt={section.alt ?? ''} eager={eager} />
      </div>
    </ProjectRow>
  );
};

export default ProjectBanner;
