import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#163a3d] p-1">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:underline hover:text-green-500">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/registro-animal" className="text-white hover:underline hover:text-green-500" passHref>
              Registro de Animales
            </Link>
          </li>
          <li>
            <Link href="/control-bienestar" className="text-white hover:underline hover:text-green-500" passHref>
              Control de Bienestar
            </Link>
          </li>
          <li>
            <Link href="/panel-revisiones" className="text-white hover:underline hover:text-green-500" passHref>
              Panel de Revisiones
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
