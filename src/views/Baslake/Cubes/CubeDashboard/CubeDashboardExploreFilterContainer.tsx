import { useCallback } from 'react';
import Form from '@components/Library/Form';
import { useCubes } from '@hooks/Cubes';
import Cookies from 'js-cookie';
import { uniqueId } from 'lodash';
import CubeDashboardExploreFilter from './CubeDashboardExploreFilter';

function CubeDashboardExploreFilterContainer(props: any) {
  const { item } = props;
  const { cube } = useCubes();
  const handleSubmit = useCallback(
    async (values: any) => {
      const store = await Cookies.get(`dashItems-${cube.id}`);
      const dashItems = JSON.parse(store ?? '{}');
      const temp = { ...values, id: uniqueId(), layout: {} };
      const items = dashItems?.length ? [...dashItems, temp] : [temp];
      Cookies.set(`dashItems-${cube.id}`, JSON.stringify(items));
    },
    [cube.id],
  );

  return (
    <Form onSubmit={handleSubmit} formArgs={{ defaultValues: item }}>
      <CubeDashboardExploreFilter />
    </Form>
  );
}

export default CubeDashboardExploreFilterContainer;
