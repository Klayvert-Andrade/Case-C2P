import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const colorMap = {
  'Corporate DI': '#1f77b4',
  'Engie Brasil': '#ff7f0e',
  'ENGIA0': '#0000FF',
  'ENGIA1': '#800080',
  'ENGIA2': '#FF0000',
  'ENGIB2': '#8B0000',
  'ENGIC3': '#000000',
};

const loadCSV = async (path) => {
  const response = await fetch(path);
  const text = await response.text();
  return Papa.parse(text, { header: true }).data;
};

const processLineData = (lineParsed) => {
  const durations = lineParsed.map(row => parseFloat(row.duration));
  const keys = Object.keys(lineParsed[0]).filter(k => k !== 'duration');
  return keys.map(key => {
    const yValues = lineParsed.map(row => parseFloat(row[key]));
    return {
      x: durations,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      name: key,
      line: { width: 2, color: colorMap[key] },
    };
  });
};

const processScatterData = (scatterParsed) =>
  scatterParsed.map(({ x, y, name }) => ({
    x: [parseFloat(x)],
    y: [parseFloat(y)],
    text: [name],
    mode: 'markers',
    type: 'scatter',
    name,
    marker: {
      size: 12,
      color: colorMap[name] || undefined,
    },
  }));

const processBoxData = (boxParsed) =>
  boxParsed.map(row => {
    const { x, name, ...rest } = row;
    const yValues = Object.values(rest)
      .filter(val => val !== name)
      .map(val => parseFloat(val))
      .filter(val => !isNaN(val));
    return {
      x: Array(yValues.length).fill(parseFloat(x)),
      y: yValues,
      type: 'box',
      name,
      marker: { color: colorMap[name] || undefined },
      line: { color: colorMap[name] || undefined },
      boxpoints: 'all',
      jitter: 0.3,
      pointpos: -1.8,
    };
  });

const useChartData = ({ activeTab, visibleSeries }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lineParsed, scatterParsed, boxParsed] = await Promise.all([
          loadCSV('/data/lineData.csv'),
          loadCSV('/data/scatterPoints.csv'),
          loadCSV('/data/boxPlots.csv'),
        ]);

        let plotData = [];

        if ((activeTab === 'combined' || activeTab === 'lines') && visibleSeries.lines) {
          plotData = plotData.concat(processLineData(lineParsed));
        }

        if ((activeTab === 'combined' || activeTab === 'scatter') && visibleSeries.scatter) {
          plotData = plotData.concat(processScatterData(scatterParsed));
        }

        if ((activeTab === 'combined' || activeTab === 'boxplots') && visibleSeries.boxplots) {
          plotData = plotData.concat(processBoxData(boxParsed));
        }

        setData(plotData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        
      }
    };

    fetchData();
  }, [activeTab, visibleSeries]);

  return { data };
};

export default useChartData;