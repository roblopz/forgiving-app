import React, { useMemo } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Slider, SliderProps, Box } from '@mui/material';
import { blue, red, blueGrey, lightBlue, amber, cyan, deepOrange } from '@mui/material/colors';

import { getHateLevelEnum, HateLevelEnum } from '@store/playerStore';

export interface IHateSliderProps {
  sxWrapper?: SxProps<Theme>;
  sxSlider?: SxProps<Theme>;
  value: number;
  disabled?: boolean;
  onChange: SliderProps['onChange']
}

export const HateSlider: React.FC<IHateSliderProps> = ({ 
  sxWrapper,
  sxSlider,
  value,
  disabled,
  onChange
}) => {
  const hateLevel = useMemo(() => getHateLevelEnum(value), [value]);

  const color = useMemo(() => {
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
  }, [hateLevel]);

  return (
    <Box sx={{ ...sxWrapper }}>
      <Slider sx={{ 
        minWidth: 200, 
        ...sxSlider,
        color,
        cursor: disabled ? 'default' : 'pointer'
      }}
        size="small" 
        value={value} 
        min={0} 
        max={100}
        onChange={disabled ? undefined : onChange}/>
    </Box>
  );
}