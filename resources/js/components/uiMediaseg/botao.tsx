import React, { useState, useRef, useEffect } from "react";
import LoginModal from "@/components/loginModal";

interface ButtonProps {
  icon?: React.ElementType;
  cor: string;
  texto: string;
  onClick?: () => void;
  renderModal?: boolean;
}

const Botao: React.FC<ButtonProps> = ({ icon: Icon, cor, texto, onClick, renderModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (onClick) onClick();

    if (renderModal) setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Detectar clique fora do modal
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="flex text-black hover:text-white items-center space-x-2" onClick={handleClick}>
      {Icon && <Icon className="w-4 " />}
      <button className={`${cor} rounded px-2 py-3`} >
        {texto}
      </button>

      {renderModal && isModalOpen && (
        <div className="fixed inset-0 bg-black/30  backdrop-blur-xs flex items-center justify-center z-50 px-50"
        >

          <div 
            ref={modalRef} 
            className="rounded shadow-lg space-y-4 "
            
          >
            <LoginModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Botao;
