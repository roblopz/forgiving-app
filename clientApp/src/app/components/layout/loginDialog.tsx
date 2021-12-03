import React, { useCallback, useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { LoginMutationVariables, useLoginMutation } from '@graphql/types';
import { userStore } from '@store/userStore';
import { handleError } from '@lib/errors/errorHandling';

const loginSchema: yup.SchemaOf<LoginMutationVariables> = yup.object({
  username: yup.string().required('Este campo es requerido'),
  password: yup.string().required('Este campo es requerido')
}).required();

export interface ILoginDialogProps {
  open?: boolean;
  handleClose(): void;
}

export const LoginDialog: React.FC<ILoginDialogProps> = ({ open, handleClose }) => {
  const isClosingRef = useRef(false);
  const [loginError, setLoginError] = useState<string>(null);
  const [login, { loading, reset: resetLoading }] = useLoginMutation();

  const { control, handleSubmit, reset, watch } = useForm<LoginMutationVariables>({
    mode: 'onSubmit',
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(loginSchema)
  });

  useEffect(() => {
    // Clear login error on fields change
    const watcher = watch(() => {
      if (loginError) setLoginError(null);
    });

    return () => watcher.unsubscribe();
  }, [loginError]);

  const onClose = useCallback(() => {
    if (!loading) {      
      handleClose();

      // AppBar button takes focus on dialog form submit...
      if ((document.activeElement as HTMLElement)?.blur)
      (document.activeElement as HTMLElement).blur();
    }
  }, [reset, handleClose, loading]);

  const onClosed = useCallback(() => {
    reset();
    resetLoading();
  }, [reset, resetLoading]);

  const onSubmit = handleSubmit((async (data) => {
    try {
      const { data: loginRes } = await login({
        variables: { username: data.username, password: data.password }
      });

      userStore.login(loginRes.user);
      onClose();
    } catch (err) {
      handleError(err, {
        handleValidationError: () => {          
          setLoginError('Usuario/contraseña inválido');
        }
      });
    } finally {    
      resetLoading();
    }
  }) as SubmitHandler<LoginMutationVariables>);  

  return (
    <Dialog open={open}
      TransitionProps={{ onExited: onClosed }}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 340, p: 3, position: 'relative' } }}>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box sx={{ color: 'info.main', mb: loginError ? 1 : 0 }}>
              <FontAwesomeIcon size="3x" className="mb-1"
                icon={loading ? faSpinner : faUserCircle}
                spin={loading} />
            </Box>
            {loginError &&
              <Box component="span" sx={{ color: 'error.light', fontSize: '.9rem' }}>
                Usuario/contraseña inválido
              </Box>}
          </Grid>
          <Grid item xs={12}>
            <Controller name='username' control={control}
              render={({ field, fieldState }) => (
                <TextField fullWidth label="Usuario" value={field.value || ''}
                  onChange={field.onChange} onBlur={field.onBlur} autoFocus
                  error={!isClosingRef.current && fieldState.invalid && fieldState.isTouched}
                  helperText={!isClosingRef.current && fieldState.error?.message}
                  variant="standard"
                  size="small"
                  InputProps={{ readOnly: loading }} />
              )} />
          </Grid>
          <Grid item xs={12}>
            <Controller name='password' control={control}
              render={({ field, fieldState }) => (
                <TextField fullWidth label="Contraseña" value={field.value || ''}
                  onChange={field.onChange} onBlur={field.onBlur}
                  error={!isClosingRef.current && fieldState.invalid && fieldState.isTouched}
                  helperText={!isClosingRef.current && fieldState.error?.message}
                  variant="standard"
                  size="small"
                  InputProps={{ readOnly: loading }} />
              )} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" 
              disabled={loading}
              color="primary"
              variant="contained"
              className="w-100 mt-3">
              LOGIN
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}