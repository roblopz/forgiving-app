import * as React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { Specifics } from './specifics';

export interface ISpecificsWrapper {
  sx?: SxProps<Theme>;
}

export const SpecificsWrapper: React.FC<ISpecificsWrapper> = observer(({ sx }) => {
  return playerStore.inited ? (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'max-content max-content',
      gridGap: '12px',
      ...sx
    }}>
      <Box>
        <Typography fontWeight="500" variant="caption" sx={{ marginLeft: 1 }}>{playerStore.player1.name}:</Typography>
        <Specifics player={playerStore.player1} sx={{ marginTop: .5 }} />
      </Box>
      <Box>
        <Typography fontWeight="500" variant="caption" sx={{ marginLeft: 1 }}>{playerStore.player2.name}:</Typography>
        <Specifics player={playerStore.player2} sx={{ marginTop: .5 }} />
      </Box>
    </Box>
  ) : null;
});