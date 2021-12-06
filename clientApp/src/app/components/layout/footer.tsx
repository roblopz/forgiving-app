import React from 'react';
import { Box, Typography } from '@mui/material';
import { createStyles } from '@lib/util/muiUtil';

import apolloIcon from 'src/app/assets/images/apollo-graphql.svg';
import graphqlIcon from 'src/app/assets/images/graphql.svg';
import muiIcon from 'src/app/assets/images/mui.svg';
import reactIcon from 'src/app/assets/images/react.svg';
import nodeIcon from 'src/app/assets/images/node.svg';

const styles = createStyles({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBox: {
    '&>img': { height: 20 },
    '&:not(last-of-type)': {
      mr: .5
    },
    '&:not(first-of-type)': {
      ml: .5
    }
  }
});

export const Footer: React.FC = () => {
  return (
    <Box pt={1}>
      <Box p={3}>
        <Typography component="div" sx={{ fontSize: 12, textAlign: 'center' }} variant="caption">
          Powered by:
        </Typography>
        <Box sx={[styles.flexCenter, { mt: .5, mb: 1 }]}>
          <Box sx={[styles.imgBox, styles.flexCenter]}>
            <Box component="img" sx={{ position: 'relative', top: '2px' }} src={reactIcon} />
          </Box>
          <Box sx={[styles.imgBox, styles.flexCenter]}>
            <img src={nodeIcon} />
          </Box>
          <Box sx={[styles.imgBox, styles.flexCenter]}>
            <img src={graphqlIcon} />
          </Box>
          <Box sx={[styles.imgBox, styles.flexCenter]}>
            <img src={apolloIcon} />
          </Box>
          <Box sx={[styles.imgBox, styles.flexCenter]}>
            <img src={muiIcon} />
          </Box>
        </Box>
        <Box sx={{ fontSize: 12, color: theme => theme.palette.text.secondary, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 14 }}>© RobDev. 2021, MX</Typography>
          <Typography variant="caption">All rights reserved</Typography>
        </Box>
      </Box>
    </Box>
  );
};