import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import appLogo from 'src/app/assets/images/clojure.svg';
import { LoginDialog } from './loginDialog';
import { userStore } from '@store/userStore';
import { LogoutDialog } from './logoutDialog';

const ElevationScroll: React.FC = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const AppBar: React.FC = observer(() => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <MuiAppBar position="fixed">
          <Toolbar>
            <Box sx={{ maxHeight: 32, mr: 1 }} component="img" src={appLogo} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1rem' }}>
              PeaceApp
            </Typography>
            {!userStore.isLoggedIn ?
              <Button color="inherit" onClick={() => setLoginOpen(true)}>
                <FontAwesomeIcon className="me-1" icon={faUserCircle} />
                Login
              </Button> :
              <Button color="inherit" onClick={() => setLogoutOpen(true)}>
                <FontAwesomeIcon className="me-1" icon={faSignOutAlt} />
                Logout
              </Button>}
          </Toolbar>
        </MuiAppBar>
      </ElevationScroll>
      <Toolbar />
      <LoginDialog open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <LogoutDialog open={logoutOpen} handleClose={() => setLogoutOpen(false)} />
    </Box >
  );
});