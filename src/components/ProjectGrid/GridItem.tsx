// Displays an individual project card that navigates to details or opens external URLs 
// https://github.com/maybeitsmark 
// 2026

import { useNavigationLock } from "@/hooks/navigation_lock.hook";
import { transitionLock } from "@/utils/transition_lock.util";
import LazyImage from "@/components/LazyImage/LazyImage";
// styles
import "./project_grid.css";

interface GridItemProps {
  image: string;
  id: string;
  title: string;
  description: string;
  externalUrl?: string;
};

const GridItem = ({ image, id, title, description, externalUrl }: GridItemProps) => {
  const navigate = useNavigationLock();
  const handleClick = () => {
    if (transitionLock.current) return;
    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    navigate(`/projects/${id}`);
  };

  return (
    <div className="grid-item" onClick={handleClick}>
      <LazyImage
        className="grid-item-image"
        wrapperClassName="grid-item-image-frame"
        src={image}
        alt={title}
        deferUntilVisible
      />
      <div className="grid-item-text">
        <div className="grid-item-title">{title}</div>
        <div className="grid-item-description">{description}</div>
      </div>
    </div>
  );
};

export default GridItem;
