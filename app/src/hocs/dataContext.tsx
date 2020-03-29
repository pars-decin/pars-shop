import React from 'react';

import data from '../../data';
import { Context as ContextTypes } from '../../types';

export const DataProvider: React.Context<ContextTypes> = React.createContext(
  data
);

interface Props {}

const withDataProvider = C => {
  const WithDataProvider: React.FC<Props> = ({ ...props }) => {
    return (
      <DataProvider.Provider value={data}>
        <C {...props} />
      </DataProvider.Provider>
    );
  };

  WithDataProvider.displayName = `withDataProvider(
    ${C.displayName ||
      C.name ||
      `component
  `})`;

  return WithDataProvider;
};

export default withDataProvider;
