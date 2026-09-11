// Renders a responsive Masonry grid of project cards, supporting category filtering via tags
// https://github.com/maybeitsmark 
// 2026

import { useMemo, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
// components
import GridItem from './GridItem';
import PillFilter from './PillFilter';
// data
import { projectCards } from "@/data/projects";
// styles
import './project_grid.css';

const ProjectGrid = () => {
  const [filterList, setFilterList] = useState<string[]>([]);

  const tagList = useMemo(() => {
    return [...new Set(projectCards.flatMap((project) => project.tags))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filterList.length === 0) {
      return projectCards;
    }

    return projectCards.filter((project) =>
      project.tags.some((tag: string) => filterList.includes(tag))
    );
  }, [filterList]);

  const toggleFilter = (tag: string) => {
    setFilterList((prev) => prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]);
  };

  return (
    <div className="grid-container">
      <div className="pill-container">
        {tagList.map((tag) => (
          <PillFilter key={tag} tag={tag} active={filterList.includes(tag)} onClick={() => toggleFilter(tag)} />
        ))}
      </div>

      <ResponsiveMasonry columnsCountBreakPoints={{ 750: 1, 1300: 2 }}>
        <Masonry gutter="8px">
          {filteredProjects.map((project) => (
            <GridItem key={project.id} id={project.id} title={project.name} image={project.image} description={project.description} externalUrl={project.externalUrl} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ProjectGrid;
