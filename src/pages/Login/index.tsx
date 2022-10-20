import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { clearStatusPost, fetchLogin } from '../../redux/slice/UserSlice';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';

import styles from './Login.module.scss';
import { callToast } from '../../redux/slice/ToastsSlise';
import Toast from '../../components/RequestHandler/Toast';

export const Login = () => {
  const { data, errorMessage, statusPOST } = useAppSelector((store) => store.user);

  const isSucces = useAppSelector((store) => store.user.statusPOST) === 'loaded';
  const isError = useAppSelector((store) => store.user.statusPOST) === 'error';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isSucces) {
      dispatch(callToast({ show: isSucces, message: 'Succes', saverity: 'success' }));
    }
    if (isError) {
      dispatch(callToast({ show: isError, message: 'Invalid data', saverity: 'error' }));
    }
  }, [statusPOST]);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().min(2, 'Invalid data').required('Required'),
      password: Yup.string().min(6, 'Min length 6').required('Required'),
    }),

    onSubmit: async (values) => {
      if (!data.token) {
        await dispatch(fetchLogin(values));
        dispatch(clearStatusPost());
      }
      if (data.token) {
        dispatch(callToast({ show: true, message: 'You already login', saverity: 'error' }));
      }
      loginForm.resetForm();
    },
  });

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={loginForm.handleSubmit}>
        <FormControl fullWidth margin="normal" error={Boolean(loginForm.errors.email)}>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            aria-describedby="my-helper-text"
            name="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
          />
          <FormHelperText
            id="my-helper-text"
            margin="dense"
            error={Boolean(loginForm.errors.email)}>
            {loginForm.errors.email}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" error={Boolean(loginForm.errors.password)}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
          />

          <FormHelperText
            id="my-helper-text"
            error={Boolean(loginForm.errors.password)}
            margin="dense">
            {loginForm.errors.password}
          </FormHelperText>
        </FormControl>
        <Button size="large" type="submit" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
      <Toast />
    </Paper>
  );
};
