import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PacmanLoader from "react-spinners/PacmanLoader";
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

import { playerStore } from '@store/playerStore';
import { useGetAllPlayersLazyQuery } from '@graphql/types';
import { MarkersWrapper } from '@components/markers/markersWrapper';
import { takeAtLeast } from '@lib/util/takeAtLeast';
import { PlayerSettingsWrapper } from '@components/playerSettings/playerSettingsWrapper';
import { AppBar } from '@components/layout/appBar';

const loaderWrapperCss: SxProps<Theme> = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const mainWrapperCss: SxProps<Theme> = {
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
};

export const App: React.FC = observer(() => {
  const [getAllPlayers] = useGetAllPlayersLazyQuery();

  useEffect(() => {    
    (async function initPlayers() {
      const { data } = await takeAtLeast(getAllPlayers(), 2000);
      if (data?.players) playerStore.setPlayers(data.players);
    })();
  }, []);

  if (!playerStore.players?.length) {
    return (
      <Box sx={loaderWrapperCss}>
        <PacmanLoader color="#29b6f6" size="2rem" />
      </Box>
    );
  }

  return (
    <>
      <AppBar />
      <Box component="main" sx={mainWrapperCss}>
        <MarkersWrapper />
        <PlayerSettingsWrapper sx={{ mt: 2 }} />
      </Box>
    </>
  )
});