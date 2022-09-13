import { useCubesPolicy } from '@hooks/Policies/CubesPolicy';
import CubesContainer from '@views/Baslake/Cubes/CubesContainer';
import LoginContainer from '@views/Baslake/Login/LoginContainer';
import { If, Then, Else } from 'react-if';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PolicyProtectedRoute from '../components/Library/PolicyProtectedRoute';
import { useBaslakePolicy } from '../hooks/Policies/BaslakePolicy';
import BaslakeDashboardContainer from '../views/Baslake/Dashboard/BaslakeDashboardContainer';
import Code404 from '../views/Baslake/Errors/Code404';
import BaslakePage from '../views/Layout/BaslakePage';

const BaslakeRoutes = (props: any) => {
  const BaslakePolicy = useBaslakePolicy();

  const CubesPolicy = useCubesPolicy();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
      </Routes>
      <BaslakePage {...props}>
        <If condition={BaslakePolicy.canAccess()}>
          <Then>
            {() => (
              <>
                <PolicyProtectedRoute
                  policy={BaslakePolicy.canAccess()}
                  exact
                  path="/"
                  element={BaslakeDashboardContainer}
                />

                <PolicyProtectedRoute
                  policy={CubesPolicy.canAccess()}
                  exact
                  path="/cubes"
                  element={CubesContainer}
                />

                <Routes>
                  <Route element={<Code404 />} />
                </Routes>
              </>
            )}
          </Then>
          <Else>{() => <Route element={<Code404 />} />}</Else>
        </If>
      </BaslakePage>
    </BrowserRouter>
  );
};

export default BaslakeRoutes;
