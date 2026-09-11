export interface BasePageSection {
  id: string;
}

export interface ImagePageSection extends BasePageSection {
  type: 'image' | 'banner';
  src: string;
  alt?: string;
}

export interface VideoPageSection extends BasePageSection {
  type: 'video';
  url: string;
}

export interface SlideshowPageSection extends BasePageSection {
  type: 'slideshow';
  images: string[];
}

export interface TextPageSection extends BasePageSection {
  type: 'text';
  content: string;
}

export interface HeadingPageSection extends BasePageSection {
  type: 'heading';
  content: string;
}

export type PageSection =
  | ImagePageSection
  | VideoPageSection
  | SlideshowPageSection
  | TextPageSection
  | HeadingPageSection;

export interface ProjectPageData {
  slug: string;
  theme?: {
    fontFamily?: string;
  };
  sections?: PageSection[];
}
