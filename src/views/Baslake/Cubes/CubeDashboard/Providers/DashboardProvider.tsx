import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);
function DashboardProvider({ children, dashboardItems, onLayoutChange }: any) {
  const onLayChange = (newLayout: any) => {
    newLayout.forEach((l: any) => {
      const item = dashboardItems.find((i: any) => i.id.toString() === l.i);
      const toUpdate = JSON.stringify({
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
      });
      console.log({ item, toUpdate });
      if (item && toUpdate !== item.layout) {
        // updateDashboardItem({
        //   variables: {
        //     id: item.id,
        //     input: {
        //       layout: toUpdate,
        //     },
        //   },
        // });
      }
    });

    onLayoutChange(newLayout);
  };
  console.log({ dashboardItems });
  return (
    <ReactGridLayout cols={12} rowHeight={20} autoSize isResizable onLayoutChange={onLayChange}>
      {children}
    </ReactGridLayout>
  );
}
export default DashboardProvider;
