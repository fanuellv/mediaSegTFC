import { Quiz } from '@/types/Quiz';
import { FaCar, FaShieldAlt, FaHeartbeat, FaHome } from 'react-icons/fa';

interface Props {
  quizzes: Quiz[];
  onSelecionar: (quiz: Quiz) => void;
}

const icons = [FaCar, FaShieldAlt, FaHeartbeat, FaHome];

export default function QuizList({ quizzes, onSelecionar }: Props) {
  return (
    <div className="relative flex w-full rounded gap-4 mb-3 cursor-pointer hover:opacity-90">
      {quizzes.map((quiz) => {
        const Icon = icons[quiz.id % icons.length]; // Ícones variados

        return (
          <div
            key={quiz.id}
            onClick={() => onSelecionar(quiz)}
            className="w-64 bg-white text-gray-600 rounded-2xl shadow-blue-200 hover:shadow-xl cursor-pointer transition duration-300 border border-gray-100 hover:border-blue-500"
          >
            <div className="flex flex-col items-center p-6">
              <div className="mb-4 p-4 bg-blue-100 rounded-full text-blue-600 text-4xl">
                <Icon aria-label="ícone do quiz" />
              </div>
              <h2 className="text-center text-lg font-semibold truncate">
                {quiz.titulo}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
