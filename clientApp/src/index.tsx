import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import './app/styles/index.scss';

import { client } from './app/graphql/client';
import { App } from './app/app';
import { appTheme } from './app/styles/muiTheme';
import { Notifier } from '@components/shared/notifier';

const Index: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider>
          <CssBaseline>
            <Notifier />
            <App />
          </CssBaseline>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));