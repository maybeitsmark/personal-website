// Renders an image slideshow component for project pages using Swiper
// https://github.com/maybeitsmark 
// 2026

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// components
import ProjectRow from './ProjectRow';
import LazyImage from '@/components/LazyImage/LazyImage';
// swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// styles
import './project_page.css';

interface Props {
  section: {
    images: string[];
  };
};

const ProjectSlideshow = ({ section }: Props) => {
  return (
    <ProjectRow>
      <div className="project-slideshow">
        <Swiper pagination={{ type: 'fraction' }} navigation modules={[Pagination, Navigation]} className="project-swiper">
          {section.images.map((image, index) => (
            <SwiperSlide key={index} className="project-swiper-slide">
              <LazyImage
                src={image}
                alt={`Slide ${index + 1}`}
                className="project-swiper-image"
                wrapperClassName="project-slideshow-image-placeholder"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ProjectRow>
  );
};

export default ProjectSlideshow;
