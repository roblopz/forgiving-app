import React, { useState, useCallback, ReactNode, useMemo } from 'react';
import {
  Box,
  Collapse,
  Paper,
  Typography,
  Card,
  CardActions,
  IconButton,
  emphasize
} from '@mui/material';
import { SnackbarContent, VariantType, SnackbarMessage, SnackbarKey, useSnackbar } from 'notistack';
import { Close, ExpandMore, Info, Warning, Error as ErrorIcon, CheckCircle } from '@mui/icons-material';
import { green, blue, red, orange } from '@mui/material/colors';

import { createStyles } from '@lib/util/muiUtil';
import { useStyles } from '@hooks/useStyles';
import { SxProps } from '@mui/system';

interface IGetStyleProps {
  variant: VariantType;
  expanded: boolean;
}

const getStyles = ({ variant, expanded }: IGetStyleProps) => createStyles({
  card: {
    backgroundColor: (theme) =>
      variant === 'default' ? emphasize(theme.palette.background.default, theme.palette.mode === 'light' ? 0.8 : 0.98)
        : variant === 'info' ? blue[500]
          : variant === 'warning' ? orange[500]
            : variant === 'error' ? red[700]
              : green[600],
    color: '#fff',
    width: '100%'
  },
  actionRoot: {
    padding: '8px 8px 8px 20px',
    justifyContent: 'space-between',
  },
  actionIcons: {
    color: '#fff',
    '& > button': { color: '#fff' }
  },
  expand: theme => ({
    width: 28,
    height: 28,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }),
  expandCanOpen: {
    transform: () => expanded ? 'rotate(180deg)' : 'none',
  },
  closeIcon: {
    '& > svg': {
      fontSize: '18px'
    }
  },
  collapse: {
    padding: 2,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  }
});

export interface ICollapseSnackbarContentProps {
  message: SnackbarMessage;
  snackKey: SnackbarKey;
  variant?: VariantType;
  content: ReactNode | ((props: Pick<ICollapseSnackbarContentProps, 'message' | 'snackKey'>) => ReactNode);
  icon?: ReactNode;
}

// eslint-disable-next-line react/display-name
export const CollapseSnackbarContent = React.forwardRef<HTMLDivElement, ICollapseSnackbarContentProps>((props, ref) => {
  const {
    variant = 'default',
    message,
    content,
    snackKey,
    icon
  } = props;

  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles(getStyles, { variant, expanded }, [variant, expanded])

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const Icon = useMemo(() => {
    if (icon === null) return null;
    else if (icon) return icon;
    else {
      const iconSx: SxProps = { mr: 1, fontSize: 20 };
      if (variant === 'default') return null;
      else if (variant === 'info') return <Info sx={iconSx} />
      else if (variant === 'warning') return <Warning sx={iconSx} />
      else if (variant === 'error') return <ErrorIcon sx={iconSx} />
      else return <CheckCircle sx={iconSx} />
    }
  }, [variant, icon]);

  return (
    <SnackbarContent ref={ref}>
      <Card sx={styles.card} elevation={8}>
        <CardActions sx={styles.actionRoot}>
          <Typography variant="subtitle2" sx={{ 
            display: 'inline-flex', 
            justifyContent: 'center',
            fontWeight: 400
          }}>
            {Icon}
            {message}
          </Typography>
          <Box sx={styles.actionIcons}>
            <IconButton size="small" sx={[styles.expand, styles.expandCanOpen]} onClick={handleExpandClick}>
              <ExpandMore />
            </IconButton>
            <IconButton size="small" sx={[styles.expand, styles.closeIcon]} onClick={() => closeSnackbar(snackKey)}>
              <Close />
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper sx={styles.collapse}>
            {typeof content === 'function' ? content({ message, snackKey }) : content}
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );
});