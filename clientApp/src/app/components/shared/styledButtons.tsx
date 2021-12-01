import { Theme, styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const InfoButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.info.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.info.dark
  },
  "&:disabled": {
    backgroundColor: theme.palette.info.light
  }
}));