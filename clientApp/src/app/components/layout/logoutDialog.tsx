import React, { useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { userStore } from '@store/userStore';

export interface ILoginDialogProps {
  open?: boolean;
  handleClose(): void;
}

export const LogoutDialog: React.FC<ILoginDialogProps> = ({ open, handleClose }) => {
  const onClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const onLogout = useCallback(() => {
    userStore.logout();
    onClose();

    // Appbar button takes focus on dialog form submit...
    if ((document.activeElement as HTMLElement)?.blur)
      (document.activeElement as HTMLElement).blur();
  }, [onClose]);

  return (
    <Dialog open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: '80vw', maxWidth: 340, p: 2, position: 'relative' } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'        
      }}>
        <Button sx={{ width: '100%' }}
          size="small"
          variant="contained"
          color="warning"
          onClick={onLogout}>
          Logout
        </Button>
        <Button sx={{ width: '100%', mt: 2 }}
          size="small"
          variant="contained"
          color="primary"
          onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}