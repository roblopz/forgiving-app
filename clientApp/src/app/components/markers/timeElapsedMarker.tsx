import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment, { Moment } from 'moment';

const getDateUpdate = (eventDate: Moment) => {
  const duration = moment.duration(moment().diff(eventDate));
  return `${duration.days()}d ${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`;
};

export const TimeElapsedMarker: React.FC = () => {
  const [eventDate] = useState(moment('2021-10-31 14:00'));
  const [strTime, setStrTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setStrTime(getDateUpdate(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="caption">⏳</Typography>
      <Typography sx={{ color: 'text.secondary', marginLeft: .5 }} fontWeight="500" variant="caption">TIEMPO EN DISPUTA:</Typography>
      <Box sx={{ marginTop: 1 }}>
        <Typography sx={{ textAlign: 'center' }} fontWeight="500">
          {strTime}
        </Typography>
      </Box>
    </Paper>
  );
}