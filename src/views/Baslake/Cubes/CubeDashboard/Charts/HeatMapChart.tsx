import { useEffect, useMemo, useRef } from 'react';
import Plotly, { Data } from 'plotly.js/dist/plotly';
import Plot from 'react-plotly.js';
import { Loader } from 'semantic-ui-react';

function HeatMap({ dataset, gridLayout, loading }: any) {
  const plotDivRef = useRef(null);

  useEffect(() => {
    if (plotDivRef && plotDivRef?.current && gridLayout) {
      Plotly.Plots.resize(plotDivRef.current);
    }
  }, [plotDivRef, gridLayout]);

  // Dados para o heatmap
  const data = useMemo(
    () =>
      [
        {
          z: dataset,
          type: 'heatmap',
          colorscale: 'Viridis',
        },
      ] as Data,
    [dataset],
  );

  // Layout para o heatmap
  const layout = {
    autosize: true,
  };

  return loading ? (
    <Loader disabled />
  ) : (
    <Plot
      ref={plotDivRef}
      data={data}
      layout={layout}
      config={{ responsive: true }}
      responsive
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default HeatMap;
