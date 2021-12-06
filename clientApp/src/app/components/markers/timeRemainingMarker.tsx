import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { QueryBuilder } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import moment from 'moment';

import { markerStyles } from './markerStyles';
import { appSettingsStore } from '@store/appSettingsStore';

export interface ITimeRemainingMarkerProps {
  sx?: SxProps<Theme>;
}

interface ITimeElapsed {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}

export const TimeRemainingMarker: React.FC<ITimeRemainingMarkerProps> = observer(({ sx }) => {
  const [timeElapsed, setTimeElapsed] = useState<ITimeElapsed>(null);

  useEffect(() => {
    let timeout: NodeJS.Timer;

    if (!timeElapsed && appSettingsStore.currentConflict?.dateStarted) {
      timeout = setInterval(() => {
        const conflictStarted = moment(appSettingsStore.currentConflict.dateStarted).toDate().getTime();
        const timeElapsed = Date.now() - conflictStarted;
        const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
        setTimeElapsed({ days, hours, minutes, seconds });
      }, 1000);
    }

    return () => clearInterval(timeout);
  }, [appSettingsStore.currentConflict?.dateStarted]);

  return (
    <Paper sx={sx}>
      <Box sx={{ marginRight: 1.5, position: 'relative' }}>
        <Avatar sx={{
          ...markerStyles.avatar,
          bgcolor: deepPurple[500],
          transform: 'translateY(-8px)'
        }}>
          <QueryBuilder />
        </Avatar>
        <Typography sx={{
          ...markerStyles.markerCardCaption,
          fontWeight: 500,
          position: 'absolute',
          transform: 'translateX(50%) translateY(-8px)',
          textAlign: 'center',
          minWidth: 18
        }} variant="caption">
          {timeElapsed ? `${timeElapsed.days}d` : '---'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={markerStyles.markerCardTitle} variant="subtitle2">En disputa:</Typography>
        <Typography sx={markerStyles.markerCardCaption} variant="caption">
          {timeElapsed ? `${timeElapsed.hours}h:${timeElapsed.minutes}m${timeElapsed.seconds}s` : '---------------------'}
        </Typography>
      </Box>
    </Paper>
  );
});