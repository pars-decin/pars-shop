import React, { ReactText } from 'react';

interface Props {
  type: `info` | `warn`;
  children: ReactText;
}

const Badge: React.FC<Props> = ({ type, children }) => {
  const [showBadge, toggleBadge] = React.useState(false);
  return (
    <span
      className={`badge`}
      onMouseEnter={() => toggleBadge(true)}
      onMouseLeave={() => toggleBadge(false)}
    >
      <span className={`badge__icon`}>{type === `info` ? `?` : `!`}</span>
      {showBadge && <span className={`badge__message`}>{children}</span>}
    </span>
  );
};

export default Badge;
