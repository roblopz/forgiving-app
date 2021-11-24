import { useMemo } from 'react';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
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
  const text = useMemo(() => {
    if (value === 0) return 'Indiferencia';
    else if (value === -100) return 'Amor incondicional';
    else if (value === 100) return 'Odio máximo';
    else if (value < 0) return 'Amor';
    else return 'Odio';
  }, [value]);

  return (
    <Box sx={{ ...sxWrapper }}>
      <Slider sx={{ 
        minWidth: 200, 
        ...sxSlider,
        color: () => {
          if (value === 0) return 'warning.main';
          else if (value < 0) return 'primary.main';
          else return 'error.main'
        }
      }} 
        disabled={disabled} size="small" 
        value={value} 
        min={-100} 
        max={100} 
        onChange={onChange}/>

      <Typography sx={{ marginLeft: 1, textAlign: 'center', whiteSpace: 'nowrap' }}>
        {text}
      </Typography>
    </Box>
  );
}