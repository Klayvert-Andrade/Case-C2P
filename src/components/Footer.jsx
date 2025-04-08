// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center p-4">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} C2P. Todos os direitos reservados.
      </p>
      <nav className="mt-2 flex justify-center gap-4">
        <a href="#privacidade" className="text-sm text-gray-600 hover:text-c2pTurquoise transition-colors">
          Política de Privacidade
        </a>
        <a href="#termos" className="text-sm text-gray-600 hover:text-c2pTurquoise transition-colors">
          Termos de Uso
        </a>
        <a href="#contato" className="text-sm text-gray-600 hover:text-c2pTurquoise transition-colors">
          Contato
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
