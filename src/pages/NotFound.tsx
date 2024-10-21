import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Página não encontrada</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
