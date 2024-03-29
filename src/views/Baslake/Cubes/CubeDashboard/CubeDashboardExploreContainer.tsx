import { useCallback } from 'react';
import Form from '@components/Library/Form';
import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import CubeDashboardExplore from './CubeDashboardExplore';

function CubeDashboardExploreContainer(props: any) {
  const { setActiveIndex } = props;
  const { cube } = useCubes();
  const { saveCubeItemHandler } = useDashboard();

  const handleSubmit = useCallback(
    async (values: any) => {
      // const store = await Cookies.get(`dashItems-${cube.id}`);
      // const dashItems = JSON.parse(store ?? '{}');
      const temp = { ...values, layout: {}, select: [values.select] };
      const result = saveCubeItemHandler(temp);
      // const items = dashItems?.length ? [...dashItems, temp] : [temp];
      // Cookies.set(`dashItems-${cube.id}`, JSON.stringify(items));
      setActiveIndex(1);
      return result;
    },
    [saveCubeItemHandler, setActiveIndex],
  );

  const initialValues = {};
  return (
    <Form onSubmit={handleSubmit} formArgs={{ defaultValues: initialValues }}>
      <CubeDashboardExplore />
    </Form>
  );
}

export default CubeDashboardExploreContainer;
