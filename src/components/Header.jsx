import React from 'react';

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 bg-c2pDarkBlue text-white px-6 py-4 flex justify-between items-center shadow-md z-50">
      <div className="flex items-center gap-4">
        <img
          src="/image2.png"
          alt="Logo C2P"
          className="h-12 w-auto"
        />

        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-6">
          {['Gráfico', 'Dados'].map((text) => (
            <a
              key={text}
              href={`#${text.toLowerCase() === 'gráfico' ? 'grafico' : 'dados'}`}
              className="px-4 py-2 rounded-full transition duration-300 hover:bg-c2pTurquoise/20 hover:text-c2pTurquoise font-semibold"
            >
              {text}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {/* Espaço para possíveis botões ou ícones à direita */}
      </div>
    </header>
  );
};

export default Header;
