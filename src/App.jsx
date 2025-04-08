// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChartDashboard from './components/ChartDashboard';
import ChartInfoPanel from './components/InfoPanel';
import DataPanel from './components/DataPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 mt-20">
        <section id="dashboard" className="mb-8">
          <ChartDashboard />
          {/* Container flex para os painéis laterais */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <ChartInfoPanel />
            </div>
            <div className="flex-1">
              <DataPanel />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
