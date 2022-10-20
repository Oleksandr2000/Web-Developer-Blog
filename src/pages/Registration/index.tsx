import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { clearStatusPost, fetchRegister } from '../../redux/slice/UserSlice';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Toast from '../../components/RequestHandler/Toast';
import { callToast } from '../../redux/slice/ToastsSlise';

export const Registration = () => {
  const { data, errorMessage, statusPOST } = useAppSelector((store) => store.user);

  const isSucces = useAppSelector((store) => store.user.statusPOST) === 'loaded';
  const isError = useAppSelector((store) => store.user.statusPOST) === 'error';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isSucces) {
      dispatch(callToast({ show: isSucces, message: 'Succes', saverity: 'success' }));
    }
    if (isError) {
      dispatch(callToast({ show: isError, message: 'User already exist', saverity: 'error' }));
    }
  }, [statusPOST]);

  const registrationForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().min(2, 'Invalid data').required('Required'),
      fullName: Yup.string().min(2, 'Min length 2').required('Required'),
      password: Yup.string().min(6, 'Min length 6').required('Required'),
    }),

    onSubmit: async (values) => {
      if (!data.token) {
        await dispatch(fetchRegister(values));
        dispatch(clearStatusPost());
      }
      if (data.token) {
        dispatch(callToast({ show: true, message: 'You already login', saverity: 'error' }));
      }
      registrationForm.resetForm();
    },
  });

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={registrationForm.handleSubmit}>
        <FormControl fullWidth margin="normal" error={Boolean(registrationForm.errors.email)}>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            aria-describedby="my-helper-text"
            name="email"
            value={registrationForm.values.email}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
          />
          {registrationForm.errors.email && (
            <FormHelperText id="my-helper-text">{registrationForm.errors.email}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" error={Boolean(registrationForm.errors.fullName)}>
          <InputLabel htmlFor="fullname">Full Name</InputLabel>
          <Input
            id="fullname"
            aria-describedby="my-helper-text"
            name="fullName"
            value={registrationForm.values.fullName}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
          />
          {registrationForm.errors.fullName && (
            <FormHelperText id="my-helper-text">{registrationForm.errors.fullName}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" error={Boolean(registrationForm.errors.password)}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            name="password"
            value={registrationForm.values.password}
            onChange={registrationForm.handleChange}
            onBlur={registrationForm.handleBlur}
          />
          {registrationForm.errors.password && (
            <FormHelperText id="my-helper-text">{registrationForm.errors.password}</FormHelperText>
          )}
        </FormControl>
        <Button size="large" type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
      <Toast />
    </Paper>
  );
};
