// Renders an image section for project pages using ProjectRow wrapper
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

const ProjectImage = ({ section, eager = false }: Props) => {
  return (
    <ProjectRow>
      <div className="project-image">
        <LazyImage
          src={section.src}
          alt={section.alt ?? ''}
          eager={eager}
          wrapperClassName="project-image-placeholder"
        />
      </div>
    </ProjectRow>
  );
};

export default ProjectImage;
