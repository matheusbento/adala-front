import React from 'react';
import { useDashboard } from '@hooks/Dashboard';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);
function DashboardProvider({ children, dashboardItems, onLayoutChange }: any) {
  const { saveCubeItemHandler } = useDashboard();
  const onLayChange = (newLayout: any) => {
    newLayout.forEach((l: any) => {
      console.log({ dashboardItems });
      const item = dashboardItems.find((i: any) => i.id.toString() === l.i);
      const toUpdate = {
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
      };

      if (item && toUpdate !== item.layout) {
        console.log({ toUpdate });
        saveCubeItemHandler({
          ...item,
          layout: toUpdate,
        });
      }
    });

    onLayoutChange(newLayout);
  };

  return (
    <ReactGridLayout cols={12} rowHeight={20} autoSize isResizable onLayoutChange={onLayChange}>
      {children}
    </ReactGridLayout>
  );
}
export default DashboardProvider;
