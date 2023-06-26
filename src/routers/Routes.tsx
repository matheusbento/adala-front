import { useCubesPolicy } from '@hooks/Policies/CubesPolicy';
import { useSiloPolicy } from '@hooks/Policies/SilosPolicy';
import CubesContainer from '@views/Baslake/Cubes/CubesContainer';
// import LoginContainer from '@views/Baslake/Login/LoginContainer';
import { Else, If, Then } from 'react-if';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PolicyProtectedRoute from '../components/Library/PolicyProtectedRoute';
import { useBaslakePolicy } from '../hooks/Policies/BaslakePolicy';
import BaslakeDashboardContainer from '../views/Baslake/Dashboard/BaslakeDashboardContainer';
import Code404 from '../views/Baslake/Errors/Code404';
import SilosContainer from '../views/Baslake/Silos/SilosContainer';
import BaslakePage from '../views/Layout/BaslakePage';

function BaslakeRoutes(props: any) {
  const BaslakePolicy = useBaslakePolicy();

  const CubesPolicy = useCubesPolicy();

  const SilosPolicy = useSiloPolicy();

  return (
    <BrowserRouter>
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

                <PolicyProtectedRoute
                  policy={SilosPolicy.canAccess()}
                  exact
                  path="/silos"
                  element={SilosContainer}
                />

                <Routes>
                  <Route element={<Code404 />} />
                </Routes>
              </>
            )}
          </Then>
          <Else>
            {() => (
              <Routes>
                <Route element={<Code404 />} />
              </Routes>
            )}
          </Else>
        </If>
      </BaslakePage>
    </BrowserRouter>
  );
}

export default BaslakeRoutes;
