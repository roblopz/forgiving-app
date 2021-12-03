import React, { useMemo } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';
import { blue, red, blueGrey, lightBlue, amber, cyan, deepOrange } from '@mui/material/colors';

import { getHateLevelEnum, HateLevelEnum } from '@store/playerStore';

export interface IHateProgressProps {
  sx?: SxProps<Theme>;
  hate: number;
}

export const HateProgress: React.FC<IHateProgressProps> = ({ hate, sx }) => {
  const hateLevel = useMemo(() => getHateLevelEnum(hate), [hate]);

  return (
    <LinearProgress variant="determinate" value={hate} sx={{
      my: '2px',
      backgroundColor: () => {
        if ([HateLevelEnum.AFFECTION, HateLevelEnum.LOVE, HateLevelEnum.DEVOTION].includes(hateLevel))
          return blue[50];
        else if ([HateLevelEnum.DEATH_SENTENCE, HateLevelEnum.HATE, HateLevelEnum.DISSAPOINTMENT].includes(hateLevel))
          return red[50]
        return blueGrey[50];
      },
      '&>span': {
        backgroundColor: () => {
          if ([HateLevelEnum.AFFECTION, HateLevelEnum.LOVE, HateLevelEnum.DEVOTION].includes(hateLevel)) {
            if (HateLevelEnum.AFFECTION === hateLevel) return cyan[500];
            else if (HateLevelEnum.LOVE === hateLevel) return lightBlue[500];
            else return blue[600];
          } else if ([HateLevelEnum.DEATH_SENTENCE, HateLevelEnum.HATE, HateLevelEnum.DISSAPOINTMENT].includes(hateLevel)) {
            if (HateLevelEnum.DISSAPOINTMENT === hateLevel) return amber[500];
            else if (HateLevelEnum.HATE === hateLevel) return deepOrange[500];
            else return red[600];
          }

          return blueGrey[500];
        }
      },
      ...sx
    }} />
  );
}