import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react';

import { ToastProvider } from 'react-toast-notifications';

import { AuthProvider } from 'hooks/Auth';
import PoliciesProvider from 'hooks/Policies';
import { SystemProvider } from 'hooks/System';
import { ToasterProvider } from 'hooks/Toaster/Toaster';

import RoutesContainer from './routers/RoutesContainer';

const App = ({
  changeLanguage,
  currentLocale,
}: {
  changeLanguage?: any;
  currentLocale?: string;
}) => (
  <ToastProvider placement="top-center" autoDismiss>
    <AuthProvider>
      <PoliciesProvider>
        <ToasterProvider>
          <RoutesContainer />
        </ToasterProvider>
      </PoliciesProvider>
    </AuthProvider>
  </ToastProvider>
);
export default App;
