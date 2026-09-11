
import type { ProjectPageData } from '@/types/content';
import ProjectSection from './ProjectSection';
import './project_page.css';

interface Props {
  data: ProjectPageData;
}

const ProjectPage = ({ data }: Props) => {
  const heroIndex = data.sections?.findIndex((section) => section.type === 'image' || section.type === 'banner');
  return (
      <div className="project-page" style={{ fontFamily: data.theme?.fontFamily }}>
          {data.sections?.map((section, index) => (
            <div
              key={`${data.slug}-${section.id}-${index}`}
              className={index === heroIndex ? 'project-hero' : undefined}
            >
              <ProjectSection section={section} eager={index < 2 || index === heroIndex} />
            </div>
          ))}
      </div>
  );
};

export default ProjectPage;
