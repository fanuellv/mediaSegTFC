import React from "react";

interface CardProps {
  titulo: string;
  icon?: React.ElementType;
  onClick?: () => void;
  classe?: string;
}

export default function NavDashboard({ titulo, icon: Icon, onClick, classe}: CardProps) {
  return (
    <div
      className={`w-full flex gap-4 items-center p-2 cursor-pointer hover:text-blue-600 ${classe}`}
      onClick={onClick}
    >
      {Icon && (
        <span>
          <Icon className="text-4xl" />
        </span>
      )}
      <h1 className="text-2xl">{titulo}</h1>
    </div>
  );
}
