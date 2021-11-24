import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { HateSlider } from '@components/hateSlider/hateSlider';

export interface IHateLevelMarkerProps {
  level: number;
}

export const HateLevelMarker: React.FC<IHateLevelMarkerProps> = ({ level }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="caption">❤️ - 👹</Typography>
      <Typography sx={{ color: 'text.secondary', marginLeft: .5 }} fontWeight="500" variant="caption">NIVEL DE ODIO:</Typography>
      <HateSlider value={level} />
    </Paper>
  );
}