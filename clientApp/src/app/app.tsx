import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Box } from '@mui/material';

import { playerStore } from '@store/playerStore';
import { useGetAllPlayersLazyQuery } from '@graphql/types';
import { MarkersWrapper } from '@components/markers/markersWrapper';
import { takeAtLeast } from '@lib/util/takeAtLeast';
import { PlayerSettingsWrapper } from '@components/playerSettings/playerSettingsWrapper';
import { AppBar } from '@components/layout/appBar';
import { handleError } from '@lib/errors/errorHandling';
import { Footer } from '@components/layout/footer';
import { createStyles } from '@lib/util/muiUtil';

const styles = createStyles({
  loaderWrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainWrapper: {
    display: 'grid',
    gridTemplateRows: `auto 1fr auto`,
    minHeight: '100vh'
  },
  main: {
    padding: 1,
    '@media (min-width: 360px)': {
      padding: 2
    },
    margin: '0 auto',
    maxWidth: {
      sm: 500,
      md: 700,
      lg: 900
    }
  }
});

export const App: React.FC = observer(() => {
  const [getAllPlayers] = useGetAllPlayersLazyQuery();

  useEffect(() => {
    (async function initPlayers() {
      try {
        const { data } = await takeAtLeast(getAllPlayers(), 2000);
        if (data?.players) playerStore.setPlayers(data.players);        
      } catch(err) {
        handleError(err).onAnyError('HANDLE_DEFAULT');
      }
    })();
  }, []);

  if (!playerStore.players?.length) {
    return (
      <Box sx={styles.loaderWrapper}>
        <PacmanLoader color="#29b6f6" size="2rem" />
      </Box>
    );
  }

  return (
    <Box sx={styles.mainWrapper}>
      <AppBar />
      <Box component="main" sx={styles.main}>
        <MarkersWrapper />
        <PlayerSettingsWrapper sx={{ mt: 2 }} />        
      </Box>
      <Footer />
    </Box>
  )
});