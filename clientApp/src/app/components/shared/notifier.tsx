import React, { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';

import { uiStore } from '@store/uiStore';

export const Notifier: React.FC = observer(() => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayedNotificationsRef = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    return autorun(() => {
      const notifications = uiStore._snackbarQueue;
      const displayedNotifications = displayedNotificationsRef.current;

      notifications.forEach(noti => {
        if (!displayedNotifications[noti.key]) {
          displayedNotifications[noti.key] = true;
          enqueueSnackbar(noti.message, noti.options);
          uiStore._dequeueSnackbar(noti.key);
        }
      });
    });
  }, []);

  useEffect(() => {
    return autorun(() => {
      const toCloseKeys = uiStore._closeSnackbarQueue;

      toCloseKeys.forEach(key => {
        closeSnackbar(key);
        uiStore._dequeueCloseSnackbar(key);
      });
    });
  }, []);

  return null;
});