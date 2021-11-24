import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import { StatusMarker } from './statusMarker';
import { HateLevelMarker } from './hateLevelMarker';
import { TimeElapsedMarker } from './timeElapsedMarker';

export interface IMarkersWrapperProps {
  sx?: SxProps<Theme>;
}

export const MarkersWrapper: React.FC<IMarkersWrapperProps> = observer(({ sx }) => {
  const status = useMemo((): ChipStatus => {
    if (playerStore.player1.status === playerStore.player2.status)
      return playerStore.player1.status;
    else return 'MIDDLE_POINT'
  }, [playerStore.player1.status, playerStore.player2.status]);

  const avgHateLevel = useMemo(() => {
    return (playerStore.player1.hateLevel + playerStore.player2.hateLevel) / 2;
  }, [playerStore.player1.hateLevel, playerStore.player2.hateLevel]);

  return (
    <Box>
      <Typography fontWeight="500" variant="caption" sx={{ marginLeft: 1 }}>GENERAL:</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: `max-content max-content max-content`,
        gridGap: '12px',
        marginTop: 1,
        ...sx
      }}>
        <StatusMarker status={status} />
        <HateLevelMarker level={avgHateLevel} />
        <TimeElapsedMarker />
      </Box>
    </Box>
  );
});