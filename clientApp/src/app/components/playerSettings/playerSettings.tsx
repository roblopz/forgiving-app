import React, { useCallback, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { SxProps, Theme } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { observer } from "mobx-react-lite"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faDove, faHandMiddleFinger, faBookDead } from '@fortawesome/free-solid-svg-icons';

import { HateSlider } from '@components/hateSlider/hateSlider';
import { PlayerVM } from '@store/playerStore';
import { userStore } from '@store/userStore';
import { PlayerStatus } from '@graphql/types';
import { buildRoute } from '@lib/serverRouter';

export interface ISpecificsProps {
  sx?: SxProps<Theme>;
  player: PlayerVM;
}

export const PlayerSettings: React.FC<ISpecificsProps> = observer(({ sx, player }) => {
  const canWrite = useMemo(() => {
    return player.id === userStore.currentUser?.player?.id;
  }, [player.id, userStore.currentUser?.player?.id]);

  const forgiveUnforgive = useCallback(() => {
    if (!canWrite) return;

    if (player.status === 'PEACE')
      player.setStatus(PlayerStatus.War);
    else player.setStatus(PlayerStatus.Peace);
  }, [player.status, canWrite]);

  const onLove = useCallback(() => {
    if (canWrite) player.setHateLevel(player.hateLevel - 10);
  }, [player.hateLevel, canWrite]);

  const onHate = useCallback(() => {
    if (canWrite) player.setHateLevel(player.hateLevel + 10);
  }, [player.hateLevel, canWrite]);

  const getAvatarProps = useCallback((player: PlayerVM): Partial<AvatarProps> => {
    if (player.imagePath) return { src: buildRoute(player.imagePath) };
    else return { children: (<>{player.name.substr(0, 1)}</>) }
  }, []);

  return (
    <Paper sx={{ paddingX: 2, paddingY: 1.5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginRight: 1 }}>
          <Avatar {...getAvatarProps(player)} />
        </Box>
        <Box>
          <Typography variant="body1">{player.name}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginY: 1 }} />
      <Box mb={1}>
        <Typography variant="caption">STATUS:</Typography>
        <Box sx={{ paddingLeft: .5 }}>
          <FontAwesomeIcon color="#03a9f4" size="xs" className="me-1" icon={faDove} />
          <Typography variant="caption">En paz</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="caption">NIVEL DE ODIO:</Typography>
        <Box sx={{ paddingLeft: .5 }}>
          <FontAwesomeIcon color="#f44336" size="xs" className="me-1" icon={faBookDead} />
          <Typography variant="caption">Odio máximo</Typography>
        </Box>
        <HateSlider value={player.hateLevel}
          sxWrapper={{
            position: 'relative',
            height: '16px'
          }}
          sxSlider={{
            transform: 'translateY(-25%)',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          onChange={(evt, lvl) => {
            if (canWrite) player.setHateLevel(lvl as number)
          }} />
      </Box>

      {canWrite &&
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
        </>}
    </Paper>
  );
});