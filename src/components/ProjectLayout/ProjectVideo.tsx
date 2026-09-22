// Renders an embedded YouTube video player for project pages

import ReactPlayer from 'react-player/youtube';
import type { VideoPageSection } from '@/types/content';
import ProjectRow from './ProjectRow';
import './project_page.css';

interface Props {
  section: VideoPageSection;
};

const ProjectVideo = ({ section }: Props) => {
  return (
    <ProjectRow>
      <ReactPlayer className="project-video" controls url={section.url} />
    </ProjectRow>
  );
};

export default ProjectVideo;
