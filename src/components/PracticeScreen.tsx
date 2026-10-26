import React, { useState, useMemo } from 'react';
import { QuizQuestion, ScreenType } from '../types';
import { PRACTICE_QUIZZES } from '../data/quizzes';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Sparkles,
  Trophy,
  Check,
  X,
  Lightbulb,
} from 'lucide-react';

interface PracticeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ onNavigate }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'de' | 'trung_binh' | 'kho'>('de');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; selectedIndex: number; isCorrect: boolean }[]
  >([]);

  // Filter quizzes by difficulty
  const questions = useMemo(() => {
    return PRACTICE_QUIZZES.filter((q) => q.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex];

  // Handle selecting an option
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  // Submit answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: selectedOption,
        isCorrect,
      },
    ]);
  };

  // Next question or finish
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Reset quiz
  const handleResetQuiz = (difficulty = selectedDifficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setUserAnswers([]);
  };

  const scorePercentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              Luyện tập tương tác có giải thích
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thử thách trắc nghiệm chính tả tiếng Việt
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full font-medium">
              100% Căn cứ từ điển chuẩn
            </span>
          </div>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Rèn luyện khả năng nhận diện các lỗi chính tả s/x, tr/ch, d/gi, hỏi/ngã và phân biệt nghĩa từ Hán-Việt hay gặp trong đời sống.
        </p>
      </div>

      {/* Difficulty Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700">
          <span>Chọn mức độ:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleResetQuiz('de')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              selectedDifficulty === 'de'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mức Dễ (Cơ bản)
          </button>
          <button
            onClick={() => handleResetQuiz('trung_binh')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              selectedDifficulty === 'trung_binh'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mức Trung bình
          </button>
          <button
            onClick={() => handleResetQuiz('kho')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              selectedDifficulty === 'kho'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mức Khó (Chuyên sâu)
          </button>
        </div>
      </div>

      {/* Quiz Progress & Question Body */}
      {!quizFinished && currentQuestion ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Chủ đề: <strong className="text-slate-700">{currentQuestion.category}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Điểm hiện tại:</span>
              <span className="font-extrabold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
                {score} câu đúng
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-serif">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;

              let optionStyle =
                'border-slate-200 bg-white hover:border-teal-400 hover:bg-slate-50 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle =
                    'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-500/30';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50 opacity-60 text-slate-500';
                }
              } else if (isSelected) {
                optionStyle =
                  'border-teal-600 bg-teal-50/70 text-teal-950 ring-2 ring-teal-500/30 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left text-sm sm:text-base transition cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isAnswerSubmitted && isCorrectAnswer
                          ? 'bg-emerald-600 text-white'
                          : isAnswerSubmitted && isSelected && !isCorrectAnswer
                          ? 'bg-red-600 text-white'
                          : isSelected
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-serif">{option}</span>
                  </div>

                  {isAnswerSubmitted && (
                    <div>
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              {isAnswerSubmitted
                ? 'Hãy đọc kỹ lời giải thích và mẹo nhớ bên dưới trước khi qua câu tiếp theo.'
                : 'Chọn phương án bạn cho là chính xác nhất rồi nhấn "Kiểm tra đáp án".'}
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition ${
                  selectedOption === null
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20 cursor-pointer'
                }`}
              >
                Kiểm tra đáp án
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-md transition cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả tổng kết'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation Card */}
          {isAnswerSubmitted && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Giải thích cặn kẽ đáp án</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>

              {currentQuestion.mnemonicTip && (
                <div className="bg-teal-50/80 border border-teal-200/80 rounded-xl p-3 text-xs text-teal-900 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Mẹo ghi nhớ nhanh: </strong>
                    <span>{currentQuestion.mnemonicTip}</span>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-400 border-t border-slate-200/60 pt-2 flex items-center justify-between">
                <span>Căn cứ biên soạn: {currentQuestion.sourceRef}</span>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Finished Summary View */}
      {quizFinished && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Hoàn thành thử thách
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kết quả lượt thi của bạn
            </h2>
            <p className="text-sm text-slate-600">
              {scorePercentage >= 80
                ? 'Tuyệt vời! Bạn có vốn hiểu biết rất sâu sắc và chuẩn mực về chính tả tiếng Việt.'
                : scorePercentage >= 60
                ? 'Khá tốt! Bạn đã nắm được nhiều quy tắc cơ bản, hãy ôn tập thêm các từ Hán-Việt dễ nhầm nhé.'
                : 'Đừng lo lắng! Tiếng Việt rất giàu và đẹp nhưng cũng có nhiều từ dễ nhầm, luyện tập thường xuyên sẽ giúp bạn tiến bộ nhanh chóng.'}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-sm mx-auto space-y-2">
            <div className="text-4xl font-black text-teal-700">{scorePercentage}%</div>
            <div className="text-sm font-semibold text-slate-700">
              Trả lời đúng {score} / {questions.length} câu hỏi
            </div>
            <div className="text-xs text-slate-400">
              Mức độ: {selectedDifficulty === 'de' ? 'Dễ' : selectedDifficulty === 'trung_binh' ? 'Trung bình' : 'Khó'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => handleResetQuiz(selectedDifficulty)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện lại mức này</span>
            </button>

            <button
              onClick={() => onNavigate('checker')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Chuyển sang kiểm tra văn bản</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
