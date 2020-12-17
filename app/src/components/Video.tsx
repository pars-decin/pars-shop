import React from 'react';

interface Props {
  src: string;
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
}

const Video = ({
  src,
  muted = true,
  className,
  loop = true,
  autoPlay = true,
}: Props) => {
  return (
    <div className={`video ${className}`}>
      <video
        src={process.env.ASSET_PREFIX + src}
        playsInline
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
      ></video>
    </div>
  );
};

export default Video;
