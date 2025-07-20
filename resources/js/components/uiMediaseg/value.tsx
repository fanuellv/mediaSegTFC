import React, { ElementType } from "react";

interface CardProps {
  titulo: string;
  descricao: string;
  link: string;
  icon?: ElementType;
}

const Card: React.FC<CardProps> = ({ titulo, descricao, link, icon: Icon }) => {
  return (
    <div className="flex bg-gray-200 p-5">
      {/* Conteúdo Esquerdo */}
      <div className="w-3/4 space-y-4">
        <h1 className="font-bold text-black text-lg">{titulo}</h1>
        <p className="w-[90%] text-gray-600">{descricao}</p>
        <a href={link} className="flex items-center gap-1 text-blue-600">
          Ver Mais
          <span className="ml-1">→</span>
        </a>
      </div>

      {/* Ícone Direito */}
      <div className="w-1/4 h-full flex items-center justify-center">
        {Icon && <Icon className="w-full h-full text-[#0153A5]" />}
      </div>
    </div>
  );
};

export default Card;
