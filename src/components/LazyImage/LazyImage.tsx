import { useEffect, useRef, useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react';
import './lazy_image.css';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  eager?: boolean;
  wrapperClassName?: string;
  deferUntilVisible?: boolean;
}

const LazyImage = ({
  src,
  alt,
  eager = false,
  deferUntilVisible = false,
  wrapperClassName = '',
  className = '',
  onLoad,
  onError,
  ...imageProps
}: LazyImageProps) => {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoaded = loadedSrc === src;
  const shouldLoad = eager || !deferUntilVisible || nearViewport;

  useEffect(() => {
    if (shouldLoad) return;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRect.width === 0 || entry.intersectionRect.height === 0) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: '240px 0px', threshold: 0.01 });
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (shouldLoad && imageRef.current?.complete && imageRef.current.naturalWidth > 0) {
      setLoadedSrc(src);
    }
  }, [src, shouldLoad]);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSrc(src);
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    // Clear the loading state while retaining the browser's fallback UI.
    setLoadedSrc(src);
    onError?.(event);
  };

  return (
    <span
      ref={wrapperRef}
      className={`lazy-image ${wrapperClassName} ${isLoaded ? 'is-loaded' : 'is-loading'}`}
      aria-busy={!isLoaded}
    >
      {!isLoaded && (
        <span className="image-loading-indicator" role="status" aria-label={alt ? `Loading media: ${alt}` : 'Loading media'}>
          <span aria-hidden="true">ˡᴼᴬᵈᴵᴺᴳ ᵐᴱᴰᴵᴬ</span>
        </span>
      )}
      {shouldLoad && <img
        ref={imageRef}
        {...imageProps}
        src={src}
        alt={alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
      />}
    </span>
  );
};

export default LazyImage;
