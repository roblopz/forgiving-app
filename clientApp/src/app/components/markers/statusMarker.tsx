/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { LocalFireDepartment, PauseCircle } from '@mui/icons-material';
import { blue, red, yellow } from '@mui/material/colors';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove } from '@fortawesome/free-solid-svg-icons';

import { PlayerStatus } from '@graphql/types';
import { OverallPlayerStatus } from '@store/playerStore';
import { markerStyles } from './markerStyles';

export interface IStatusMarkerProps {
  sx?: SxProps<Theme>;
  status: OverallPlayerStatus;
}

export const StatusMarker: React.FC<IStatusMarkerProps> = observer(({ sx, status }) => {
  const RenderIcon = useMemo(() => {
    switch (status) {
      case PlayerStatus.War:
        return () => (
          <LocalFireDepartment />
        );
      case PlayerStatus.Peace:
        return () => (
          <FontAwesomeIcon icon={faDove} />
        );
      default:
        return () => (
          <PauseCircle />
        );
    }
  }, [status]);

  return (
    <Paper sx={sx}>
      <Box sx={{ marginRight: 1.5 }}>
        <Avatar sx={{ 
          ...markerStyles.avatar, 
          bgcolor: () => {
            return status === PlayerStatus.War ? red[500] 
              : status === PlayerStatus.Peace ? blue[500] 
              : yellow[600]
          }
        }}>
          <RenderIcon />
        </Avatar>
      </Box>
      <Box>
        <Typography sx={markerStyles.markerCardTitle} variant="subtitle2">
          Status:
        </Typography>
        <Typography sx={markerStyles.markerCardCaption} variant="caption">
          {status === PlayerStatus.War ? 'RIÑA' : status === PlayerStatus.Peace ? 'PAZ' : 'DIVIDIDO'}
        </Typography>
      </Box>
    </Paper>
  );
});