import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';

import { makeSxProps } from '@lib/util/muiUtil';
import { playerStore } from '@store/playerStore';
import { StatusMarker } from './statusMarker';
import { TimeRemainingMarker } from './timeRemainingMarker';
import { HateMarker } from './hateMarker';

export interface IMarkersWrapperProps {
  sx?: SxProps<Theme>;
}

const styles = {
  paperMarker: makeSxProps({
    display: 'flex',
    alignItems: 'center',
    padding: 2,
    minHeight: 78
  })
};

export const MarkersWrapper: React.FC<IMarkersWrapperProps> = observer(({ sx }) => {
  return (
    <Box sx={sx}>
      <Typography fontWeight="500" variant="caption" sx={{ marginLeft: 1 }}>RESUMEN</Typography>

      <Grid sx={{ marginTop: 0 }} container spacing={1}>
        <Grid item xs={6} sm lg>
          <StatusMarker status={playerStore.overallStatus} sx={styles.paperMarker} />
        </Grid>

        <Grid item xs={6} sm lg>
          <TimeRemainingMarker sx={styles.paperMarker} />         
        </Grid>

        <Grid item xs={12} sm={12} lg>
          <HateMarker averageHate={playerStore.averageHate} sx={styles.paperMarker} />
        </Grid>
      </Grid>
    </Box>
  );
});