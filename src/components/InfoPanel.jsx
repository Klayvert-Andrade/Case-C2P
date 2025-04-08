// src/components/ChartInfoPanel.jsx
import React from 'react';

const ChartInfoPanel = () => {
  return (
    <div id="dados" className="scroll-mt-20 bg-white rounded-xl shadow-md p-6">
      {/* Cabeçalho */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Informações do Gráfico</h2>
          <p className="text-sm text-gray-500">
            Detalhes sobre os dados e elementos visuais que compõem o gráfico
          </p>
        </div>
      </div>

      {/* Conteúdo informativo */}
      <div className="space-y-6 text-sm text-gray-700">
        {/* Séries Temporais */}
        <section>
          <h3 className="text-c2pDarkBlue font-semibold mb-2">Séries Temporais</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Corporate DI</strong> – Representada pela linha azul</li>
            <li><strong>Engie Brasil</strong> – Representada pela linha laranja</li>
          </ul>
        </section>

        {/* Pontos de Dispersão */}
        <section>
          <h3 className="text-c2pDarkBlue font-semibold mb-2">Pontos de Dispersão</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>ENGIA0, ENGIA1, ENGIA2, ENGIB2, ENGIC3</li>
            <li>Cada ponto representa o valor para cada entidade</li>
          </ul>
        </section>

        {/* Box Plots */}
        <section>
          <h3 className="text-c2pDarkBlue font-semibold mb-2">Box Plots</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Exibe a distribuição de dados para cada entidade</li>
          </ul>
        </section>

        {/* Interatividade */}
        <section>
          <h3 className="text-c2pDarkBlue font-semibold mb-2">Interatividade</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Zoom e pan com a roda do mouse</li>
            <li>Ocultar/mostrar séries dinamicamente</li>
          </ul>
        </section>

        {/* Eixos */}
        <section>
          <h3 className="text-c2pDarkBlue font-semibold mb-2">Eixos do Gráfico</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Eixo X (Duration Anos)</strong> – Duração em anos</li>
            <li><strong>Eixo Y (Spread)</strong> – Spread dos ativos</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ChartInfoPanel;
