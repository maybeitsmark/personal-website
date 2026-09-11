// Manages scroll triggered fade up animations for individual project content rows
// https://github.com/maybeitsmark 
// 2026

import { ReactNode, useRef } from 'react';
// hooks
import { useFadeUp } from '@/hooks/fade_up.hook';
// styles
import './project_page.css';

interface Props {
  children: ReactNode;
};

const ProjectRow = ({ children }: Props) => {
  const projectRef = useRef<HTMLDivElement | null>(null);
  useFadeUp(projectRef); 

  return (
    <div className="project-row" ref={projectRef} >
      {children}
    </div>
  );
};

export default ProjectRow;
