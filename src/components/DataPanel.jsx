import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Componentes de Tabela
const TableWrapper = ({ children }) => (
  <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
    <table className="min-w-full text-sm text-left border-collapse">{children}</table>
  </div>
);

const TableHead = ({ headers }) => (
  <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
    <tr>
      {headers.map((header, idx) => (
        <th key={idx} className="px-4 py-3 border-b border-gray-200">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TemporalTable = ({ data }) => (
  <TableWrapper>
    <TableHead headers={['Index', 'Corporate DI', 'Engie Brasil']} />
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-2 border-b">{row.index}</td>
          <td className="px-4 py-2 border-b">{row.corporateDI}</td>
          <td className="px-4 py-2 border-b">{row.engieBrasil}</td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

const ScatterTable = ({ data }) => (
  <TableWrapper>
    <TableHead headers={['Index', 'X', 'Y']} />
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-2 border-b">{row.index}</td>
          <td className="px-4 py-2 border-b">{row.x}</td>
          <td className="px-4 py-2 border-b">{row.y}</td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

const BoxPlotTable = ({ data }) => (
  <TableWrapper>
    <TableHead headers={['Index', 'Valores']} />
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-2 border-b">{row.index}</td>
          <td className="px-4 py-2 border-b text-sm text-gray-700">{row.values.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

// Função auxiliar para parse de CSV
const parseCSV = (path) => {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};

const DataPanel = () => {
  const [activeTab, setActiveTab] = useState('temporal');
  const [temporalData, setTemporalData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { key: 'temporal', label: 'Séries Temporais' },
    { key: 'scatter', label: 'Pontos de Dispersão' },
    { key: 'boxplots', label: 'Box Plots' },
  ];

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const [boxDataRaw, lineDataRaw, scatterDataRaw] = await Promise.all([
          parseCSV('/data/boxPlots.csv'),
          parseCSV('/data/lineData.csv'),
          parseCSV('/data/scatterPoints.csv'),
        ]);

        const processedBox = boxDataRaw.map(row => ({
          index: row.name,
          values: [row.y1, row.y2, row.y3, row.y4, row.y5].map(Number),
        }));
        setBoxData(processedBox);

        const processedTemporal = lineDataRaw
            .filter(row => row.duration !== undefined && row.duration !== '') // filtra linhas vazias
            .map(row => ({
                index: parseInt(row.duration, 10) + 1,
                corporateDI: parseFloat(row['Corporate DI']),
                engieBrasil: parseFloat(row['Engie Brasil']),
            }));
        setTemporalData(processedTemporal);

        const processedScatter = scatterDataRaw.map(row => ({
          index: row.name,
          x: parseFloat(row.x),
          y: parseFloat(row.y),
        }));
        setScatterData(processedScatter);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  const exportDataToCSV = (data, filename) => {
    // Converte os dados para CSV
    const csv = Papa.unparse(data);
    // Cria um Blob com o conteúdo CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // Cria um link para download
    const link = document.createElement('a');
    if (link.download !== undefined) { // Verifica se o navegador suporta o atributo download
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportCSV = () => {
    if (activeTab === 'temporal') {
      exportDataToCSV(temporalData, 'temporal_data');
    } else if (activeTab === 'scatter') {
      exportDataToCSV(scatterData, 'scatter_data');
    } else if (activeTab === 'boxplots') {
      exportDataToCSV(boxData, 'boxplot_data');
    } else {
      console.warn('Nenhuma tabela selecionada para exportação.');
    }
  };

  const renderCurrentTable = () => {
    switch (activeTab) {
      case 'temporal':
        return <TemporalTable data={temporalData} />;
      case 'scatter':
        return <ScatterTable data={scatterData} />;
      case 'boxplots':
        return <BoxPlotTable data={boxData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Dados do Gráfico</h2>
          <p className="text-sm text-gray-500">Visualize os dados em formato tabular</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-c2pDarkBlue text-white rounded-md hover:bg-c2pTurquoise transition-colors duration-200"
        >
          Exportar CSV
        </button>
      </div>

      {/* Exibe mensagem de loading ou erro, se houver */}
      {loading ? (
        <p>Carregando dados do CSV...</p>
      ) : error ? (
        <p className="text-red-500">Erro ao carregar dados.</p>
      ) : (
        <>
          {/* Abas */}
          <div className="mb-4 border-b border-gray-200">
            <nav className="flex flex-wrap gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-3 text-sm rounded-t-md ${
                    activeTab === tab.key
                      ? 'bg-c2pDarkBlue text-white font-semibold shadow'
                      : 'text-gray-600 hover:text-c2pDarkBlue hover:bg-gray-100'
                  } transition-colors`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tabela atual */}
          <div>{renderCurrentTable()}</div>
        </>
      )}
    </div>
  );
};

export default DataPanel;
