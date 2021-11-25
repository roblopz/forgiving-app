import React from 'react';
import { SxProps, Theme } from '@mui/system';
import Slider, { SliderProps } from '@mui/material/Slider';
import Box from '@mui/material/Box';

export interface IHateSliderProps {
  sxWrapper?: SxProps<Theme>;
  sxSlider?: SxProps<Theme>;
  value?: number;
  disabled?: boolean;
  onChange?: SliderProps['onChange']
}

export const HateSlider: React.FC<IHateSliderProps> = ({ 
  sxWrapper,
  sxSlider,
  value = 0,
  disabled,
  onChange
}) => {
  return (
    <Box sx={{ ...sxWrapper }}>
      <Slider sx={{ 
        minWidth: 200, 
        ...sxSlider,
        color: () => {
          if (value === 0) return 'warning.main';
          else if (value < 0) return 'primary.main';
          else return 'error.main'
        },
        cursor: disabled ? 'default' : 'pointer'
      }}
        size="small" 
        value={value} 
        min={-100} 
        max={100} 
        onChange={disabled ? undefined : onChange}/>
    </Box>
  );
}