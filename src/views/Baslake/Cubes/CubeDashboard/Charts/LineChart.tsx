import { useEffect, useMemo, useRef } from 'react';
import Plotly, { Data } from 'plotly.js/dist/plotly';
import Plot from 'react-plotly.js';
import { Loader } from 'semantic-ui-react';
import { range } from 'lodash';
import Segment from '@/components/Library/Segment';

function LineChart({ dataset, gridLayout, loading }: any) {
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
          type: 'scatter', // Tipo de gráfico
          x: range(0, dataset?.length), // Valores do eixo X
          y: dataset, // Valores do eixo Y
          mode: 'lines', // Configuração para exibir apenas as linhas
          line: {
            color: 'blue', // Cor da linha
            width: 2, // Largura da linha
          },
        },
      ] as Data,
    [dataset],
  );

  // Layout para o heatmap
  const layout = {
    autosize: true,
    xaxis: {
      title: 'Eixo X',
    },
    yaxis: {
      title: 'Eixo Y',
    },
  };

  return loading ? (
    <Loader disabled />
  ) : (
    <Segment>
      <Plot
        ref={plotDivRef}
        data={data}
        layout={layout}
        config={{ responsive: true }}
        responsive
        style={{ width: '100%', height: '100%' }}
      />
    </Segment>
  );
}

export default LineChart;
