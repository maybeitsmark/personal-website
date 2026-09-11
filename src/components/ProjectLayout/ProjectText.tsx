// Renders text content sections for project pages using React
// https://github.com/maybeitsmark 
// 2026

import ProjectRow from './ProjectRow';
import './project_page.css';

interface Props {
  section: {
    content: string;
  };
};

const ProjectText = ({ section }: Props) => {
  return (
    <ProjectRow>
      <div className="project-text">
        <div className="project-text" dangerouslySetInnerHTML={{ __html: section.content }} />
      </div>
    </ProjectRow>
  );
};

export default ProjectText;