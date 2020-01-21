import React from 'react';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
  handleClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const Img: React.FC<Props> = ({
  src,
  alt = 'alt',
  handleClick,
  className = '',
}) => {
  return (
    <img src={src} alt={alt} onClick={handleClick} className={className} />
  );
};

export default Img;
