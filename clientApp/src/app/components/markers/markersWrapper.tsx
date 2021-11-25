import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf, faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons'
import { faSith } from '@fortawesome/free-brands-svg-icons';

import { HateSlider } from '@components/hateSlider/hateSlider';

export interface IMarkersWrapperProps {
  sx?: SxProps<Theme>;
}

const smallTitleSx: SxProps<Theme> = {
  fontSize: '.8rem'
};

const smallCaptionSx: SxProps<Theme> = {
  fontSize: '.65rem'
};

export const MarkersWrapper: React.FC<IMarkersWrapperProps> = observer(({ sx }) => {
  return (
    <Box sx={sx}>
      <Typography fontWeight="500" variant="caption" sx={{ marginLeft: 1 }}>RESUMEN:</Typography>
      <Grid sx={{ marginTop: 0 }} container spacing={1}>
        <Grid item xs={5} sm lg>
          <Paper sx={{
            padding: 2,
            display: 'flex'
          }}>
            <Box sx={{ marginRight: 1.5 }}>
              <Avatar sizes="" sx={{ bgcolor: '#d81b60', width: 36, height: 36 }}>
                <FontAwesomeIcon icon={faSith} />
              </Avatar>
            </Box>
            <Box>
              <Typography sx={smallTitleSx} variant="subtitle2">Status:</Typography>
              <Typography sx={smallCaptionSx} variant="caption">EN RIÑA</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={7} sm lg>
          <Paper sx={{
            padding: 2,
            display: 'flex'
          }}>
            <Box sx={{ marginRight: 1.5 }}>
              <Avatar sizes="" sx={{ bgcolor: '#cddc39', width: 36, height: 36 }}>
                <FontAwesomeIcon size="xs" icon={faHourglassHalf} />
              </Avatar>
            </Box>
            <Box>
              <Typography sx={smallTitleSx} variant="subtitle2">En disputa:</Typography>
              <Typography sx={smallCaptionSx} variant="caption">23d 18h:47m:23s</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} lg>
          <Paper sx={{
            padding: 2,
            display: 'flex'
          }}>
            <Box sx={{ marginRight: 1.5 }}>
              <Avatar sizes="" sx={{ bgcolor: '#ff9800', width: 39, height: 39 }}>
                <FontAwesomeIcon icon={faThermometerThreeQuarters} />
              </Avatar>
            </Box>
            <Box sx={{ flexGrow: 1, position: 'relative', minHeight: 44 }}>
              <Typography sx={smallTitleSx} variant="subtitle2">Odiométro:</Typography>
              <HateSlider value={0} sxWrapper={{
                position: 'absolute',
                top: 12,
                width: '100%'
              }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});