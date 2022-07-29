/* eslint-disable react/jsx-props-no-spreading */
import PoliciesProvider from 'hooks/Policies';
import { useEffect } from 'react';

import { If, Then } from 'react-if';
import {
  AppearanceTypes,
  ToastProvider,
  useToasts,
} from 'react-toast-notifications';

import { AuthProvider, useAuth } from '../hooks/Auth';
import { ToasterProvider, useToaster } from '../hooks/Toaster/Toaster';

import Loading from '../views/Baslake/Auth/Loading/Loading';

import LoadingGate from '../views/Baslake/LoadingGate/LoadingGate';
import BaslakeRoutes from './Routes';

const RoutesContainer = () => {
  const { addToast } = useToasts();
  const { getAuthenticationHandler, wasFetched, loggedIn } = useAuth();

  const { toaster } = useToaster();

  useEffect(() => {
    getAuthenticationHandler();
  }, [getAuthenticationHandler]);

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
      </If>
    </LoadingGate>
  );
};

export default RoutesContainer;
