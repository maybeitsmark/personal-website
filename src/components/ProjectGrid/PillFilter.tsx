// Renders an interactive tag filter button that toggles active states to refine project lists
// https://github.com/maybeitsmark 
// 2026

// styles
import './project_grid.css';

interface PillFilterProps {
  tag: string;
  active: boolean;
  onClick: () => void;
};

const PillFilter = ({ tag, active, onClick }: PillFilterProps) => {
  return (
    <button type="button" className={`pill-button ${active ? 'active' : ''}`} onClick={onClick}>{tag}</button>
  );
};

export default PillFilter;