interface CardProps {
  titulo: string;
  icon?: React.ElementType;
  onClick?: () => void;
  classe?: string;
  modo?: 'desktop' | 'mobile'; // 👈 adiciona modo
}

export default function NavDashboard({ titulo, icon: Icon, onClick, classe, modo = 'desktop' }: CardProps) {
  if (modo === 'mobile') {
    return (
      <div
        className={`flex flex-col items-center justify-center text-xs cursor-pointer ${classe}`}
        onClick={onClick}
      >
        {Icon && <Icon className="text-2xl mb-1" />}
        <span className="text-[10px]">{titulo}</span>
      </div>
    );
  }

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
