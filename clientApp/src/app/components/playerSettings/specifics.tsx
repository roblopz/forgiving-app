import { useCallback } from 'react';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { observer } from "mobx-react-lite"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faDove, faHandMiddleFinger, faUser } from '@fortawesome/free-solid-svg-icons';

import { StatusChip } from '@components/statusChip/statusChip';
import { HateSlider } from '@components/hateSlider/hateSlider';

export interface ISpecificsProps {
  sx?: SxProps<Theme>;
  player: Player;
}

export const Specifics: React.FC<ISpecificsProps> = observer(({ sx, player }) => {
  const forgiveUnforgive = useCallback(() => {
    if (player.status === 'PEACE')
      player.setStatus('WAR');
    else player.setStatus('PEACE');
  }, [player.status]);

  const onLove = useCallback(() => {
    player.setHateLevel(player.hateLevel - 10);
  }, [player.hateLevel]);

  const onHate = useCallback(() => {
    player.setHateLevel(player.hateLevel + 10);
  }, [player.hateLevel]);

  const tryLogin = useCallback(() => {
    const user = window.prompt('user');
    if (user) {
      const pass = window.prompt('pass');
      if (pass)
        playerStore.tryLoginPlayer(user, pass);      
    }
  }, []);

  return (
    <Paper sx={{ padding: 2, ...sx }}>
      <Box mb={2}>
        <Typography variant="caption">STATUS:</Typography>
        <StatusChip boxSx={{ marginTop: .5 }} status={player.status} />
      </Box>

      <Box>
        <Typography variant="caption">NIVEL DE ODIO:</Typography>
        <HateSlider value={player.hateLevel} onChange={(evt, lvl) => {
          if (player.loggedIn)
            player.setHateLevel(lvl as number)
        }} />
      </Box>

      <Divider sx={{ marginTop: 2 }} />

      {player.loggedIn ?
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button sx={{ color: 'info.main', marginRight: 1 }} size="small"
              startIcon={<FontAwesomeIcon icon={faHeart} />}
              onClick={onLove}>
              Amar
            </Button>
            <Button sx={{ color: 'error.main' }} size="small"
              startIcon={<FontAwesomeIcon icon={faHeartBroken} />}
              onClick={onHate}>
              Odiar
            </Button>
          </Box>
          <Button sx={{ marginLeft: 1 }} variant="contained" color={player.status === 'WAR' ? 'primary' : 'error'} size="small"
            startIcon={<FontAwesomeIcon icon={player.status === 'WAR' ? faDove : faHandMiddleFinger} />}
            onClick={forgiveUnforgive}>{player.status === 'WAR' ? 'Perdonar' : 'Enemistarse'}</Button>
        </Box>
        :
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" size="small" sx={{ width: '100%' }}
            startIcon={<FontAwesomeIcon icon={faUser} />}
            onClick={tryLogin}>
              Login
          </Button>
        </Box>}
    </Paper>
  );
});