import { Quiz } from '@/types/Quiz';
import { FaCar, FaHeartbeat, FaHome, FaShieldAlt } from 'react-icons/fa';

interface Props {
    quizzes: Quiz[];
    onSelecionar: (quiz: Quiz) => void;
}

const icons = [FaCar, FaShieldAlt, FaHeartbeat, FaHome];

export default function QuizList({ quizzes, onSelecionar }: Props) {
    return (
        <div
            className="mb-3 flex cursor-pointer gap-4 overflow-x-auto overflow-y-hidden px-1 py-2 hover:opacity-90"
            style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
            }}
            onWheel={(e) => {
                const target = e.currentTarget;
                if (target) target.scrollLeft += e.deltaY; // Suporte ao scroll vertical com mouse
            }}
        >
            {quizzes.map((quiz) => {
                const Icon = icons[quiz.id % icons.length];

                return (
                    <div
                        key={quiz.id}
                        onClick={() => onSelecionar(quiz)}
                        className="w-[40vw] flex-shrink-0 rounded-2xl border border-gray-100 bg-white text-gray-600 shadow-blue-200 transition duration-300 hover:border-blue-500 hover:shadow-xl sm:w-64"
                        role="button"
                        tabIndex={0}
                        aria-label={`Abrir quiz: ${quiz.titulo}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onSelecionar(quiz);
                        }}
                    >
                        <div className="flex flex-col items-center p-6">
                            <div className="mb-4 rounded-full bg-blue-100 p-4 text-4xl text-blue-600">
                                <Icon aria-label="ícone do quiz" />
                            </div>
                            <h2 className=" truncate text-center text-sm font-semibold sm:text-base">{quiz.titulo}</h2>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
