import React from "react";

import logo from "/public/img/logo.svg";
import alvo from "/public/img/alvo.svg";

import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "@inertiajs/react";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full max-w-screen bg-[#0153A5] sm:py-10 py-5 relative top-35">
      {/* Seção 1 - Header */}
      <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:px-16 px-6 gap-10">
        <div className="space-y-5 flex flex-col sm:items-start items-center">
          <h1 className="text-white text-2xl font-bold">Começar Agora</h1>
          <p className="text-white sm:w-full w-[80%] text-center sm:text-left">
            Não perca tempo, seu seguro ideal está a um clique!
          </p>
          <Link href={route('cadastro')}>
          <button className="bg-white text-[#003162] font-bold text-xs sm:text-sm px-4 py-2 rounded">
            Abrir a minha Conta
          </button>
          </Link>
          
        </div>

        <div className="flex justify-center sm:justify-end">
          {/* Adicione a imagem ou o conteúdo que desejar aqui */}
          <img src={alvo} alt="" />
        </div>
      </div>

      {/* Seção 2 - Conteúdo */}
      <div className="bg-white grid sm:grid-cols-2 grid-cols-1 grid-rows-2 px-16 py-8 relative top-10 w-full gap-10">
        <div className="sm:w-1/4 w-full">
          {/* Adicione conteúdo ou imagem aqui */}
          <img src={logo} alt="" />
        </div>

        <div className="w-3/4 grid sm:grid-cols-4 grid-cols-1 grid-rows-4 gap-5">
          {["Título 1", "Título 2", "Título 3", "Título 4"].map((titulo, index) => (
            <div key={index}>
              <span className="text-[#003162]">{titulo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Seção 3 - Footer */}
      <div className="w-full max-w-screen h-20 grid grid-cols-2 bg-[#0153A5] text-white items-center px-6 sm:px-16 relative top-10">
        <div className="flex items-center">
          <p className="sm:text-sm text-xs">
            © 2025 <strong>mediaSeg</strong>. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-10"/>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className="w-10"/>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare className="w-10"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
