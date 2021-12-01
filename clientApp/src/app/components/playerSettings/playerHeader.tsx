import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Box, Avatar, Typography, AvatarProps } from '@mui/material';

import { PlayerVM } from '@store/playerStore';
import { buildRoute } from '@lib/serverRouter';

export interface IPlayerHeaderProps {
  player: PlayerVM;
  sx?: SxProps<Theme>;
}

export const PlayerHeader: React.FC<IPlayerHeaderProps> = observer(({ player }) => {
  const getAvatarProps = useCallback((player: PlayerVM): Partial<AvatarProps> => {
    if (player.imagePath) return { src: buildRoute(player.imagePath) };
    else return { children: (<>{player.name.substr(0, 1)}</>) }
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: 1 }}>
        <Avatar {...getAvatarProps(player)} sx={{ width: 32, height: 32 }} />
      </Box>
      <Typography variant="body1">{player.name}</Typography>
    </Box>
  );
});