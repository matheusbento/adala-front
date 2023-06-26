import { useMemo } from 'react';

import Code404 from '@views/Baslake/Errors/Code404';
import { Route, Routes } from 'react-router-dom';

export interface PolicyProtectedProps {
  policy?: boolean;
  element: any;
  exact?: boolean;
  path?: string;
}

function PolicyProtectedRoute({ policy = false, element, ...rest }: PolicyProtectedProps) {
  const ComponentToRender = useMemo(() => (policy ? element : Code404), [policy, element]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Routes>
      <Route {...rest} element={<ComponentToRender />} />
    </Routes>
  );
}

export default PolicyProtectedRoute;
