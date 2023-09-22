import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from 'react-toast-notifications';

import { AuthProvider } from 'hooks/Auth';
import PoliciesProvider from 'hooks/Policies';
import { ToasterProvider } from 'hooks/Toaster/Toaster';

import 'moment/locale/pt-br';
import 'moment/dist/locale/pt-br';
import { OrganizationProvider } from './hooks/Organization';
import RoutesContainer from './routers/RoutesContainer';

const queryClient = new QueryClient();

function App({ changeLanguage, currentLocale }: { changeLanguage?: any; currentLocale?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
export default App;
