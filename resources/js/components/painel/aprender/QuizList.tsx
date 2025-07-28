import { Quiz } from '@/types/Quiz';

interface Props {
  quizzes: Quiz[];
  onSelecionar: (quiz: Quiz) => void;
}

export default function QuizList({ quizzes, onSelecionar }: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="w-64 p-4 rounded-xl bg-white shadow hover:shadow-md cursor-pointer transition"
          onClick={() => onSelecionar(quiz)}
        >
          <h2 className="text-lg font-bold mb-2 truncate">{quiz.titulo}</h2>
        </div>
      ))}
    </div>
  );
}
