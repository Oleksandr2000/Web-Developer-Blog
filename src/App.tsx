import React from 'react';
import Container from '@mui/material/Container';
import { Header } from './components/Header';
import { authRoutes, publicRoutes } from './routes';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './hooks/useContextHooks';
import { fetchAuth } from './redux/slice/UserSlice';
import Hamburger from './components/Hamburger';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    <>
      <Header />
      <Hamburger />
      <Container maxWidth="lg">
        <Routes>
          {authRoutes.map((route: any, i: number) => (
            <Route path={route.path} element={<route.element />} key={i} />
          ))}
          {publicRoutes.map((route: any, i: number) => (
            <Route path={route.path} element={<route.element />} key={i} />
          ))}
        </Routes>
      </Container>
    </>
  );
}

export default App;
