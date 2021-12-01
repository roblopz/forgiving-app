/* eslint-disable react/display-name */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Typography, Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';
import { blue, indigo } from '@mui/material/colors';
import { SportsMma, SportsKabaddi } from '@mui/icons-material';

import { PlayerVM } from '@store/playerStore';
import { PlayerStatus } from '@graphql/types';
import { playerSettingsStyles } from './playerSettingsStyles';
import { InfoButton } from '@components/shared/styledButtons';

export interface IPlayerStatusIndicatorProps {
  player: PlayerVM;
  sx?: SxProps<Theme>
}

export const PlayerStatusIndicator: React.FC<IPlayerStatusIndicatorProps> = observer(({ sx, player }) => {
  const inPeace = useMemo(() => player.status === PlayerStatus.Peace, [player.status]);

  const Icon = useMemo(() => {
    if (inPeace) {
      return () => (
        <FontAwesomeIcon color={blue[500]} icon={faDove} style={{
          fontSize: 13,
          width: 18,
          marginRight: 2
        }} />
      );
    } else {
      return () => (
        <SportsMma sx={{
          color: indigo[700],
          fontSize: 18,
          position: 'relative',
          top: -2,
          marginRight: '2px'
        }} />
      );
    }
  }, [inPeace]);

  const toggleStatus = useCallback(() => {
    player.setStatus(player.status === PlayerStatus.Peace ? PlayerStatus.War : PlayerStatus.Peace);
  }, [player.status]);

  return (
    <Box sx={{
      ...sx,
      minHeight: 38,
      ...(player.canEdit ? {
        display: 'flex',
        alignItems: 'center'
      } : null)
    }}>
      {player.canEdit ?
        <>
          {player.status === PlayerStatus.War ?
            <InfoButton onClick={toggleStatus}
              size="small" 
              variant="contained" 
              sx={{ width: '100%' }}>
              <FontAwesomeIcon className="me-1" icon={faDove} />
              Perdonar
            </InfoButton>
            :
            <Button onClick={toggleStatus}
              size="small" 
              variant="contained" 
              color="warning" 
              sx={{ width: '100%' }}
              startIcon={<SportsKabaddi />}>
              Enemistarse
            </Button>}
        </>
        :
        <>
          <Typography component="div" variant="caption">STATUS:</Typography>
          <Typography component="div" variant="caption" sx={playerSettingsStyles.captionWithIcon}>
            <Icon />
            {inPeace ? 'En Paz' : 'En Riña'}
          </Typography>
        </>}
    </Box>
  );
});