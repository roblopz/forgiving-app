import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { QueryBuilder } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

import { markerStyles } from './markerStyles';

export interface ITimeRemainingMarkerProps {
  sx?: SxProps<Theme>;
}

export const TimeRemainingMarker: React.FC<ITimeRemainingMarkerProps> = observer(({ sx }) => {
  return (
    <Paper sx={sx}>
      <Box sx={{ marginRight: 1.5, position: 'relative' }}>
        <Avatar sx={{ 
          ...markerStyles.avatar, 
          bgcolor: deepPurple[500],
          transform: 'translateY(-4px)'
        }}>
          <QueryBuilder />
        </Avatar>
        <Typography sx={{ 
          ...markerStyles.markerCardCaption, 
          fontWeight: 500,
          position: 'absolute',
          transform: 'translateX(50%)'
        }} variant="caption">
          23d
        </Typography>
      </Box>
      <Box>
        <Typography sx={markerStyles.markerCardTitle} variant="subtitle2">En disputa:</Typography>
        <Typography sx={markerStyles.markerCardCaption} variant="caption">18h:47m:23s</Typography>
      </Box>
    </Paper>
  );
});