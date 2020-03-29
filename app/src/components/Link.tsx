import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  url: string;
  children: string | ReactElement;
  className?: string;
  target?: string;
}

function Link({
  url,
  children,
  className,
  target = '_blank',
}: Props): ReactElement {
  return (
    <RouterLink target={target} to={url} className={`link ${className}`}>
      {children}
    </RouterLink>
  );
}

export default Link;
