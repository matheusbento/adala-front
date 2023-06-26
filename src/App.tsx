import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import { ToastProvider } from 'react-toast-notifications';

import { AuthProvider } from 'hooks/Auth';
import PoliciesProvider from 'hooks/Policies';
import { ToasterProvider } from 'hooks/Toaster/Toaster';

import { OrganizationProvider } from './hooks/Organization';
import RoutesContainer from './routers/RoutesContainer';

function App({ changeLanguage, currentLocale }: { changeLanguage?: any; currentLocale?: string }) {
  return (
    <ToastProvider placement="top-center" autoDismiss>
      <AuthProvider>
        <PoliciesProvider>
          <ToasterProvider>
            <OrganizationProvider>
              <RoutesContainer />
            </OrganizationProvider>
          </ToasterProvider>
        </PoliciesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
export default App;
