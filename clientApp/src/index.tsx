import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';

import './app/styles/index.scss';

import { client } from './app/graphql/client';
import { App } from './app/app';

const Index: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));