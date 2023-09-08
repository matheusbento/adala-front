import { useCallback } from 'react';
import Form from '@components/Library/Form';
import Cookies from 'js-cookie';
import { uniqueId } from 'lodash';
import CubeDashboardExplore from './CubeDashboardExplore';

function CubeDashboardExploreContainer() {
  const handleSubmit = useCallback(async (values: any) => {
    const store = await Cookies.get('dashItems');
    const dashItems = JSON.parse(store ?? '{}');
    const temp = { ...values, id: uniqueId(), layout: {} };
    const items = dashItems?.length ? [...dashItems, temp] : [temp];
    Cookies.set('dashItems', JSON.stringify(items));
  }, []);

  const initialValues = {};
  return (
    <Form onSubmit={handleSubmit} formArgs={{ defaultValues: initialValues }}>
      <CubeDashboardExplore />
    </Form>
  );
}

export default CubeDashboardExploreContainer;
