import React from 'react';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
  handleClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const Img: React.FC<Props> = (
  { src, alt = 'alt', handleClick, className = '' },
  ref
) => {
  return (
    <img
      ref={ref}
      src={process.env.ASSET_PREFIX + src}
      alt={alt}
      onClick={handleClick}
      className={className}
    />
  );
};

export default React.forwardRef(Img);
