import React, { useState, useMemo, useCallback } from 'react';
import Plot from 'react-plotly.js';
import { Eye, EyeOff } from 'lucide-react';
import useChartData from '../hooks/useChartData';

const ChartDashboard = () => {
  // Estado de aba ativa ("combined", "lines", "scatter", "boxplots") 
  const [activeTab, setActiveTab] = useState('combined');

  // Controle de visibilidade por tipo de série
  const [visibleSeries, setVisibleSeries] = useState({
    lines: true,
    scatter: true,
    boxplots: true,
  });

   // Hook customizado para carregar os dados do gráfico
  const { data, isLoading } = useChartData({ activeTab, visibleSeries });

  // Layout estático do gráfico (memoizado para evitar re-render)
  const plotLayout = useMemo(() => ({
      margin: { t: 20, r: 80, b: 50, l: 50 },
      font: { family: 'Inter, sans-serif', size: 14 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      autosize: true,
      showlegend: true,
      legend: {
        x: 1.05,
        y: 1,
        orientation: 'v',
      },
      xaxis: {
        title: { text:'Duration (Anos)', standoff: 20 },
        automargin: true,
        dtick: 1,
      },
      yaxis: {
        title: { text: 'Spreads a.a', standoff: 20 },
        automargin: true,
        dtick: 2,
      },
    }), []);

  // Configurações do gráfico
  const plotConfig = useMemo(() => ({
    responsive: true,
    displayModeBar: 'hover',
    modeBarButtonsToRemove: ['toImage'],
    displaylogo: false,
    toImageButtonOptions: {
      format: 'png',
      filename: 'chart_dashboard',
      height: 400,
      width: 800,
      scale: 1,
    },
  }), []);

  // Alternância de visibilidade para cada tipo de série
  const renderVisibilityButton = useCallback(
    (label, key) => {
      const isVisible = visibleSeries[key];
      return (
        <button
          onClick={() =>
            setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }))
          }
          className="flex items-center gap-1 px-3 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          <span className="text-sm">{label}</span>
        </button>
      );
    },
    [visibleSeries]
  );

  return (
    <div id='grafico' className="scroll-mt-50 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-c2pDarkBlue px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Análise Combinada</h1>
          <p className="mt-1 text-md text-gray-400 mb-3">
            Visualização de séries temporais, pontos de dispersão e box plots
          </p>
        </div>
      </div>

      {/* Abas de seleção de tipo de gráfico */}
      <div className="flex justify-start bg-gray-50 border-b border-gray-200 px-8">
        {['combined', 'lines', 'scatter', 'boxplots'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-6 -mb-px text-lg font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab
                ? 'border-c2pOrange text-c2pOrange'
                : 'border-transparent text-gray-500 hover:text-c2pOrange'
            }`}
          >
            {{
              combined: 'Combinado',
              lines: 'Linhas',
              scatter: 'Dispersão',
              boxplots: 'Box Plots',
            }[tab]}
          </button>
        ))}
      </div>

      {/* Conteúdo do Gráfico */}
      <div className="p-6">
        {isLoading ? (
          <p>Carregando dados do CSV...</p>
        ) : (
          <Plot
            data={data}
            layout={plotLayout}
            config={plotConfig}
            style={{ width: '100%', height: '400px' }}
          />
        )}
      </div>

      {/* Rodapé com Botões */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          {renderVisibilityButton('Linhas', 'lines')}
          {renderVisibilityButton('Dispersão', 'scatter')}
          {renderVisibilityButton('Box Plots', 'boxplots')}
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
