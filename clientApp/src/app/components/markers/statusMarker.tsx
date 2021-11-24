import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { ChipStatus, StatusChip } from '@components/statusChip/statusChip';

export interface IStatusMarkerProps {
  status: ChipStatus;
}

export const StatusMarker: React.FC<IStatusMarkerProps> = ({ status }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="caption">🚥</Typography>
      <Typography sx={{ color: 'text.secondary', marginLeft: .5 }} fontWeight="500" variant="caption">STATUS:</Typography>
      <StatusChip boxSx={{ marginTop: 1 }} status={status} />
    </Paper>
  );
}