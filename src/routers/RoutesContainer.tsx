/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';

import LoginContainer from '@views/Baslake/Login/LoginContainer';
import { Else, If, Then } from 'react-if';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppearanceTypes, useToasts } from 'react-toast-notifications';

import { useAuth } from '../hooks/Auth';
import { useToaster } from '../hooks/Toaster/Toaster';
import Loading from '../views/Baslake/Auth/Loading/Loading';
import LoadingGate from '../views/Baslake/LoadingGate/LoadingGate';
import BaslakeRoutes from './Routes';

const RoutesContainer = () => {
  const { addToast } = useToasts();
  const { getAuthenticationHandler, wasFetched, session, loggedIn } = useAuth();

  const { toaster } = useToaster();

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname !== '/login' && loggedIn) {
      getAuthenticationHandler();
    }
  }, [loggedIn]);

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname !== '/login' && wasFetched && !loggedIn) {
      window.location.href = '/login';
    }
  }, [wasFetched, loggedIn]);

  useEffect(() => {
    if (toaster.trigger) {
      addToast(toaster.message, {
        appearance: toaster.status as AppearanceTypes,
        placement: 'top-center',
      });
    }
  }, [addToast, toaster.message, toaster.status, toaster.trigger]);

  return (
    <LoadingGate waitFor={wasFetched} meanwhile={<Loading />}>
      <If condition={loggedIn}>
        <Then>{() => <BaslakeRoutes />}</Then>
        <Else>
          {() => (
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginContainer />} />
              </Routes>
            </BrowserRouter>
          )}
        </Else>
      </If>
    </LoadingGate>
  );
};

export default RoutesContainer;
