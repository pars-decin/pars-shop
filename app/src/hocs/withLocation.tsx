import React from 'react';
import { RouteComponentProps } from 'react-router';

export const LocationProvider = React.createContext({} as RouteComponentProps);

export const withLocation = (C: React.FC) => {
  const WithLocation: React.FC<RouteComponentProps> = ({
    history,
    location,
    match,
    ...props
  }) => {
    return (
      <LocationProvider.Provider value={{ history, location, match }}>
        <C {...props} />
      </LocationProvider.Provider>
    );
  };

  WithLocation.displayName = `
    withLocation(${C.displayName || C.name || `component`})
  `;

  return WithLocation;
};
