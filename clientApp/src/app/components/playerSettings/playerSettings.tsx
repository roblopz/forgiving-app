import React from 'react';
import { Paper, Divider} from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { observer } from "mobx-react-lite"

import { PlayerVM } from '@store/playerStore';

import { PlayerStatusIndicator } from './playerStatusIndicator';
import { PlayerHeader } from './playerHeader';
import { PlayerHate } from './playerHate';

export interface ISpecificsProps {
  sx?: SxProps<Theme>;
  player: PlayerVM;
}

export const PlayerSettings: React.FC<ISpecificsProps> = observer(({ sx, player }) => {
  return (
    <Paper sx={{ paddingX: 2, paddingY: 1.5, ...sx }}>
      <PlayerHeader player={player} />
      <Divider sx={{ marginY: 1 }} />
      <PlayerStatusIndicator player={player} sx={{ mb: .5 }} />
      <PlayerHate player={player} />

      {/* {canWrite &&
        <>
          <Divider sx={{ marginTop: 2 }} />
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
        </>} */}
    </Paper>
  );
});