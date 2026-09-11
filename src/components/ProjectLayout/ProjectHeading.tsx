// Renders an h1 heading section for project pages using ProjectRow wrapper
// https://github.com/maybeitsmark 
// 2026

import ProjectRow from './ProjectRow';
import './project_page.css';

interface Props {
  section: {
    content: string;
  };
};

const ProjectHeading = ({ section }: Props) => {
  return (
    <ProjectRow>
      <div className="project-heading">
        <h1>{section.content}</h1>
      </div>
    </ProjectRow>
  );
};

export default ProjectHeading;