import React from "react";

interface CardProps {
  titulo: string;
}

const Card: React.FC<CardProps> = ({ titulo }) => {
  return (
    <div className="w-full h-[280px]">
      <div className="w-full bg-blue-500 h-3/4"></div>

      <div className="w-full py-3 flex flex-col space-y-4 h-1/4">
        <h1 className="text-md font-bold mb-2">{titulo}</h1>
        <p className="text-gray-500 self-start">Há 10 dias</p>
      </div>
    </div>
  );
};

export default Card;
