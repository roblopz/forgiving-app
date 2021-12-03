import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThermometerEmpty,
  faThermometerQuarter,
  faThermometerHalf,
  faThermometerThreeQuarters,
  faThermometerFull
} from '@fortawesome/free-solid-svg-icons'
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { blue, red, blueGrey, lightBlue, amber, cyan, deepOrange } from '@mui/material/colors';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

import { HateProgress } from '@components/shared/players/hateProgress';
import { getHateLevelEnum, HateLevelEnum, hateLevelTranslation } from '@store/playerStore';
import { markerStyles } from './markerStyles';

export interface IHateMarkerProps {
  sx?: SxProps<Theme>;
  averageHate: number;
}

export const HateMarker: React.FC<IHateMarkerProps> = observer(({ averageHate, sx }) => {
  const hateLevel = useMemo(() => getHateLevelEnum(averageHate), [averageHate]);
  const hateString = useMemo(() => hateLevelTranslation[hateLevel], [hateLevel]);

  return (
    <Paper sx={sx}>
      <Box sx={{ marginRight: 1.5 }}>
        <Avatar sx={{
          ...markerStyles.avatarLg,
          bgcolor: () => {
            switch (hateLevel) {
              case HateLevelEnum.DEVOTION:
                return blue[500];
              case HateLevelEnum.LOVE:
                return lightBlue[500];
              case HateLevelEnum.AFFECTION:
                return cyan[500];
              case HateLevelEnum.INDIFERENCE:
                return blueGrey[400];
              case HateLevelEnum.DISSAPOINTMENT:
                return amber[500];
              case HateLevelEnum.HATE:
                return deepOrange[500];
              default:
                return red[500];
            }
          }
        }}>
          <FontAwesomeIcon icon={(() => {
            switch (hateLevel) {
              case HateLevelEnum.DEVOTION:
                return faThermometerEmpty;
              case HateLevelEnum.LOVE:
                return faThermometerQuarter;
              case HateLevelEnum.AFFECTION:
                return faThermometerQuarter;
              case HateLevelEnum.INDIFERENCE:
                return faThermometerHalf;
              case HateLevelEnum.DISSAPOINTMENT:
                return faThermometerThreeQuarters;
              case HateLevelEnum.HATE:
                return faThermometerThreeQuarters;
              default:
                return faThermometerFull;
            }
          })()} />
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
        <Typography sx={markerStyles.markerCardTitle} variant="subtitle2">
          Odiométro:
        </Typography>

        <HateProgress hate={averageHate} />

        <Typography sx={markerStyles.markerCardCaption} variant="caption">
          {hateString.toUpperCase()}
        </Typography>
      </Box>
    </Paper>
  );
});