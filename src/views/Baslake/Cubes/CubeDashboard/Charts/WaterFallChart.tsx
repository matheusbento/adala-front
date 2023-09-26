import { useEffect, useMemo, useRef } from 'react';
import Segment from '@components/Library/Segment';
import { mean, range } from 'lodash';
import Plotly, { Data } from 'plotly.js/dist/plotly';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';
import { Loader } from 'semantic-ui-react';

function WaterFallChart({ dataset, item, gridLayout, loading }: any) {
  const plotWaterfallRef = useRef(null);
  const plotLineRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (plotWaterfallRef && plotWaterfallRef?.current && gridLayout) {
      Plotly.Plots.resize(plotWaterfallRef.current);
    }
    if (plotLineRef && plotLineRef?.current && gridLayout) {
      Plotly.Plots.resize(plotLineRef.current);
    }
  }, [plotWaterfallRef, plotLineRef, gridLayout]);

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
  const layoutWaterfall = {
    autosize: true,
  };

  const layoutLine = {
    autosize: true,
    xaxis: {
      title: 'Eixo X',
    },
    yaxis: {
      title: 'Eixo Y',
    },
  };

  const calculatedMean = useMemo(
    () =>
      dataset?.map((subArray: any) => {
        return mean(subArray);
      }),
    [dataset],
  );

  const meanData = useMemo(
    () =>
      [
        {
          type: 'scatter', // Tipo de gráfico
          x: calculatedMean, // Valores do eixo X
          y: range(0, calculatedMean?.length), // Valores do eixo Y
          // x: range(0, calculatedMean?.length), // Valores do eixo X
          // y: calculatedMean, // Valores do eixo Y
          mode: 'lines', // Configuração para exibir apenas as linhas
          line: {
            color: 'blue', // Cor da linha
            width: 2, // Largura da linha
          },
        },
      ] as Data,
    [calculatedMean],
  );

  return loading ? (
    <Loader disabled />
  ) : (
    <Segment>
      <Plot
        ref={plotLineRef}
        data={meanData}
        layout={layoutLine}
        config={{ responsive: true }}
        responsive
        style={{ width: '100%', height: '100%' }}
      />
      <Plot
        ref={plotWaterfallRef}
        data={data}
        layout={layoutWaterfall}
        config={{ responsive: true }}
        responsive
        style={{ width: '100%', height: '100%' }}
      />
    </Segment>
  );
}

export default WaterFallChart;
