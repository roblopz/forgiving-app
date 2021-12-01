/* eslint-disable react/display-name */
import React, { CSSProperties, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookDead, 
  faHeartbeat, 
  faHeart, 
  faHandshake, 
  faHandsWash,
  faHeartBroken,
  faAngry
} from '@fortawesome/free-solid-svg-icons';
import { red, blueGrey, blue, grey, pink } from '@mui/material/colors';

import { PlayerVM, hateLevelTranslation, HateLevelEnum } from '@store/playerStore';
import { HateSlider } from './hateSlider';
import { observer } from 'mobx-react-lite';
import { HateProgress } from '@components/shared/hateProgress';
import { playerSettingsStyles } from './playerSettingsStyles';

export interface IPlayerHateProps {
  player: PlayerVM;
  sx?: SxProps<Theme>;
}

export const PlayerHate: React.FC<IPlayerHateProps> = observer(({ player, sx }) => {
  const onHateChange = useCallback((hate: number) => {
    player.setHateLevel(hate);
  }, [player.id])

  const HateIcon = useMemo(() => {
    const faStyle: CSSProperties = {
      fontSize: 13,
      width: 18,
      marginRight: 2
    };

    switch (player.hateLevelEnum) {
      case HateLevelEnum.DEVOTION:
        return () => (
          <FontAwesomeIcon color={red[500]} icon={faHeartbeat} style={faStyle} />
        );
      case HateLevelEnum.LOVE:
        return () => (
          <FontAwesomeIcon color={red[400]} icon={faHeart} style={faStyle} />
        );
      case HateLevelEnum.AFFECTION:
        return () => (
          <FontAwesomeIcon color={blue[400]} icon={faHandshake} style={faStyle} />
        );
      case HateLevelEnum.INDIFERENCE:
        return () => (
          <FontAwesomeIcon color={blueGrey[500]} icon={faHandsWash} style={faStyle} />
        );
      case HateLevelEnum.DISSAPOINTMENT:
        return () => (
          <FontAwesomeIcon color={pink[400]} icon={faHeartBroken} style={faStyle} />
        );
      case HateLevelEnum.HATE:
        return () => (
          <FontAwesomeIcon color={red[500]} icon={faAngry} style={faStyle} />
        );
      default:
        return () => (
          <FontAwesomeIcon color={grey[900]} icon={faBookDead} style={faStyle} />
        );
    }
  }, [player.hateLevelEnum]);

  return (
    <Box sx={sx}>
      <Typography component="div" variant="caption">NIVEL DE ODIO:</Typography>
      <Typography component="div" variant="caption" sx={{ ...playerSettingsStyles.captionWithIcon, mb: 1 }}>
        <HateIcon />
        {hateLevelTranslation[player.hateLevelEnum]}
      </Typography>

      <Box>
        {player.canEdit ?
          <HateSlider
            value={player.hateLevel}
            onChange={(evt, lvl) => onHateChange(lvl as number)}
            sxWrapper={{
              position: 'relative',
              height: '6px'
            }}
            sxSlider={{
              transform: 'translateY(-25%)',
              position: 'absolute',
              top: '-6px',
              left: 0,
              height: '4px'
            }} />
          :
          <HateProgress hate={player.hateLevel} />}
      </Box>
    </Box>
  );
});