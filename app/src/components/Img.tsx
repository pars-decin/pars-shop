import React from 'react';
import ObjectFitImage from '@threespot/object-fit-image';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
  handleClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  backgroundSize?: string;
}

const Img: React.FC<Props> = (
  { src, alt = 'alt', handleClick, className = '', backgroundSize = 'cover' },
  ref
) => {
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    new ObjectFitImage(wrapRef.current, {
      backgroundSize: backgroundSize,
    });
  }, []);

  return (
    <div className='bg-image' ref={wrapRef}>
      <img
        ref={ref}
        src={process.env.ASSET_PREFIX + src}
        alt={alt}
        onClick={handleClick}
        className={`bg-image-source ${className}`}
      />
    </div>
  );
};

export default React.forwardRef(Img);
