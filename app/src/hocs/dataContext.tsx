import React from 'react';
import axios from 'axios';
import { absoluteUrl } from '../../helpers/absoluteUrl';
// import data from '../../data';
import { Context as ContextTypes } from '../../types';
import Loading from '../components/Loading';

export const DataProvider: React.Context<ContextTypes> = React.createContext(
  null
);

interface Props {}
const withDataProvider = (C) => {
  const WithDataProvider: React.FC<Props> = ({ ...props }) => {
    const [data, setData] = React.useState<ContextTypes>(null);

    React.useEffect(() => {
      const baseUrl = absoluteUrl(`localhost:3000`);
      try {
        axios.get(`${baseUrl}/api/data`).then(({ data }) => setData(data));
      } catch (err) {
        console.log({ err });
      }
    }, []);

    if (!data) {
      return <Loading />;
    }

    return (
      <DataProvider.Provider value={data}>
        <C {...props} />
      </DataProvider.Provider>
    );
  };

  WithDataProvider.displayName = `withDataProvider(
    ${
      C.displayName ||
      C.name ||
      `component
  `
    })`;

  return WithDataProvider;
};

export default withDataProvider;
