import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import SportsKabaddi from '@mui/icons-material/SportsKabaddi';
import { SxProps, Theme } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove, faClock } from '@fortawesome/free-solid-svg-icons'
import { PlayerStatus } from '@graphql/types';

export type ChipStatus = PlayerStatus | 'MIDDLE_POINT';

export interface IStatusChipProps {
  boxSx?: SxProps<Theme>;
  chipSx?: SxProps<Theme>;
  status: ChipStatus;
}

export const StatusChip: React.FC<IStatusChipProps> = ({
  boxSx,
  chipSx,
  status
}) => {
  return (
    <Box sx={boxSx}>
      <Chip sx={{ padding: '0 4px', ...chipSx }}
        size="small"
        color={status === 'PEACE' ? 'success' : status === 'MIDDLE_POINT' ? 'warning' : 'error'}
        icon={status === 'PEACE' ? <FontAwesomeIcon icon={faDove} /> : status === 'MIDDLE_POINT' ? <FontAwesomeIcon icon={faClock} /> : <SportsKabaddi />}
        label={status === 'PEACE' ? 'PERDÓN' : status === 'MIDDLE_POINT' ? 'INDECISO' : 'RIÑA'} />
    </Box>
  );
}