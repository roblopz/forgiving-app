import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';

import { PlayerSettings } from './playerSettings';
import { playerStore } from '@store/playerStore';

export interface ISpecificsWrapper {
  sx?: SxProps<Theme>;
}

export const PlayerSettingsWrapper: React.FC<ISpecificsWrapper> = observer(({ sx }) => {
  return (
    <Box sx={sx}>
      <Typography fontWeight="500" variant="caption" sx={{ marginLeft: 1 }}>CONTRINCANTES:</Typography>      

      <Grid sx={{ marginTop: .25 }} container spacing={1}>
        {playerStore.players.map((player) => (
          <Grid item xs={12} sm={6} key={player.id}>
            <PlayerSettings player={player} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});