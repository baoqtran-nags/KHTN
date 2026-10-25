import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  EXAM_SETS,
  ExamSet,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  EssayQuestion,
} from '../data/examData';
import { ChemToolbar } from './ChemToolbar';
import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Sparkles,
  HelpCircle,
  RefreshCw,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Send,
  Eye,
  EyeOff,
  Flame,
} from 'lucide-react';

interface ExamViewProps {
  onExamScoreUpdate: (examId: string, score: number) => void;
  onAskAI: (prompt: string) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ onExamScoreUpdate, onAskAI }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>('de-1');
  const [mode, setMode] = useState<'practice' | 'test'>('practice');

  // Exam Answers State
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean>>({});
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<string, string>>({});

  // AI Grading State for Essays
  const [gradingState, setGradingState] = useState<
    Record<string, { loading: boolean; result?: string; error?: string }>
  >({});

  // Show model answer toggles in Practice Mode
  const [showModelAnswers, setShowModelAnswers] = useState<Record<string, boolean>>({});

  // Test Mode Timer & Submission
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    mcqScore: number;
    tfScore: number;
    shortScore: number;
    totalAutoScore: number;
    maxAutoScore: number;
  } | null>(null);

  const currentExam = EXAM_SETS.find((e) => e.id === selectedExamId) || EXAM_SETS[0];

  // Timer logic for test mode
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (mode === 'test' && isTimerRunning && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [mode, isTimerRunning, timeLeft, isSubmitted]);

  // Reset exam state when changing exam or mode
  const handleSelectExam = (examId: string) => {
    setSelectedExamId(examId);
    setMcqAnswers({});
    setTfAnswers({});
    setShortAnswers({});
    setEssayAnswers({});
    setGradingState({});
    setShowModelAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
    setTimeLeft(45 * 60);
    setIsTimerRunning(mode === 'test');
  };

  const handleModeChange = (newMode: 'practice' | 'test') => {
    setMode(newMode);
    setIsSubmitted(false);
    setScoreResult(null);
    setTimeLeft(45 * 60);
    setIsTimerRunning(newMode === 'test');
  };

  // Helper for formatting time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check short answer
  const isShortAnswerCorrect = (userAns: string | undefined, correctAnswers: string[]) => {
    if (!userAns) return false;
    const cleanUser = userAns.trim().toLowerCase().replace(/\s+/g, '');
    return correctAnswers.some((ans) => {
      const cleanCorrect = ans.trim().toLowerCase().replace(/\s+/g, '');
      return cleanUser === cleanCorrect;
    });
  };

  // Submit and calculate auto-score
  const handleSubmitExam = () => {
    let mcqCorrect = 0;
    currentExam.part1.forEach((q) => {
      if (mcqAnswers[q.id] === q.correctAnswer) {
        mcqCorrect += 1;
      }
    });
    // MCQ is worth 3.0 points (0.5 pts each x 6 = 3.0)
    const mcqScore = (mcqCorrect / currentExam.part1.length) * 3.0;

    // Part 2: True/False (1.0 pt total = 0.25 each)
    let tfCorrect = 0;
    currentExam.part2.statements.forEach((st) => {
      const key = `${currentExam.part2.id}-${st.subId}`;
      if (tfAnswers[key] === st.isCorrect) {
        tfCorrect += 1;
      }
    });
    const tfScore = (tfCorrect / currentExam.part2.statements.length) * 1.0;

    // Part 3: Short answer (2.0 pts total)
    let totalShortItems = 0;
    let correctShortItems = 0;
    currentExam.part3.forEach((q) => {
      q.subQuestions.forEach((sq) => {
        totalShortItems += 1;
        const key = `${q.id}-${sq.subId}`;
        if (isShortAnswerCorrect(shortAnswers[key], sq.correctAnswers)) {
          correctShortItems += 1;
        }
      });
    });
    const shortScore = totalShortItems > 0 ? (correctShortItems / totalShortItems) * 2.0 : 0;

    const totalAuto = Math.round((mcqScore + tfScore + shortScore) * 10) / 10;
    setScoreResult({
      mcqScore: Math.round(mcqScore * 10) / 10,
      tfScore: Math.round(tfScore * 10) / 10,
      shortScore: Math.round(shortScore * 10) / 10,
      totalAutoScore: totalAuto,
      maxAutoScore: 6.0, // Parts 1, 2, 3 total 6.0 pts. Part 4 is 4.0 pts essay.
    });
    setIsSubmitted(true);
    setIsTimerRunning(false);

    // Call callback
    onExamScoreUpdate(currentExam.id, totalAuto);

    // Fire confetti if good score
    if (totalAuto >= 4.5) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  // Grade an essay question using Gemini AI
  const handleGradeWithAI = async (
    qId: string,
    sqId: string,
    questionTitle: string,
    promptText: string,
    modelAnswerText: string,
    maxScore: number
  ) => {
    const key = `${qId}-${sqId}`;
    const studentAns = essayAnswers[key];

    if (!studentAns || !studentAns.trim()) {
      alert('Em hãy nhập bài làm của mình trước khi nhờ AI chấm nhé!');
      return;
    }

    setGradingState((prev) => ({
      ...prev,
      [key]: { loading: true, error: undefined },
    }));

    try {
      const res = await fetch('/api/gemini/grade-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionTitle,
          questionPrompt: promptText,
          studentAnswer: studentAns,
          modelAnswer: modelAnswerText,
          maxScore,
        }),
      });

      const data = await res.json();
      if (res.ok && data.evaluation) {
        setGradingState((prev) => ({
          ...prev,
          [key]: { loading: false, result: data.evaluation },
        }));
      } else {
        throw new Error(data.error || 'Không nhận được kết quả chấm bài.');
      }
    } catch (err: any) {
      setGradingState((prev) => ({
        ...prev,
        [key]: { loading: false, error: err.message || 'Lỗi kết nối khi chấm bài.' },
      }));
    }
  };

  const handleInsertChem = (fieldKey: string, char: string) => {
    setEssayAnswers((prev) => ({
      ...prev,
      [fieldKey]: (prev[fieldKey] || '') + char,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner & Exam Selector */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ngân Hàng Đề Kiểm Tra Chuẩn KHTN 7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentExam.code}: {currentExam.title}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">{currentExam.description}</p>
          </div>

          {/* Mode Switcher */}
          <div className="bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 flex items-center gap-1 self-start md:self-auto">
            <button
              onClick={() => handleModeChange('practice')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'practice'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Luyện Tập Tự Do
            </button>
            <button
              onClick={() => handleModeChange('test')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                mode === 'test'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Thi Thử 45 Phút
            </button>
          </div>
        </div>

        {/* 3 Exam Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800">
          {EXAM_SETS.map((exam) => {
            const isSelected = exam.id === selectedExamId;
            return (
              <button
                key={exam.id}
                onClick={() => handleSelectExam(exam.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-white/15 border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-white/5 border-slate-700/60 hover:bg-white/10 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-300">{exam.code}</span>
                  <span className="text-xs text-slate-400 font-mono">45 phút • 11 câu</span>
                </div>
                <div className="text-sm font-medium text-slate-100 truncate mt-1">
                  {exam.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Test Mode Timer Bar */}
        {mode === 'test' && (
          <div className="mt-4 p-3 bg-amber-950/40 border border-amber-600/40 rounded-xl flex items-center justify-between text-amber-200 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Thời gian còn lại:</span>
              <span className="font-mono font-bold text-base text-amber-300">
                {formatTime(timeLeft)}
              </span>
            </div>
            {!isSubmitted && (
              <button
                onClick={handleSubmitExam}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                Nộp Bài Ngay
              </button>
            )}
          </div>
        )}
      </div>

      {/* Submission Result Score Card (if submitted) */}
      {isSubmitted && scoreResult && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
                {scoreResult.totalAutoScore}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Kết Quả Chấm Điểm Tự Động (Phần I, II, III)
                </h3>
                <p className="text-sm text-slate-600">
                  Điểm trắc nghiệm & điền khuyết: <strong>{scoreResult.totalAutoScore} / 6.0 điểm</strong>.
                  (Phần IV Tự luận 4.0 điểm chấm chi tiết bằng nút "Chấm bằng AI" bên dưới).
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSelectExam(selectedExamId)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Làm lại đề này
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <span className="text-xs text-slate-500 block">Phần I (Trắc nghiệm 4 lựa chọn)</span>
              <span className="text-lg font-bold text-emerald-700">
                {scoreResult.mcqScore} / 3.0 điểm
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <span className="text-xs text-slate-500 block">Phần II (Trắc nghiệm Đúng/Sai)</span>
              <span className="text-lg font-bold text-emerald-700">
                {scoreResult.tfScore} / 1.0 điểm
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-200">
              <span className="text-xs text-slate-500 block">Phần III (Trả lời ngắn)</span>
              <span className="text-lg font-bold text-emerald-700">
                {scoreResult.shortScore} / 2.0 điểm
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PHẦN I: TRẮC NGHIỆM KHÁCH QUAN (6 câu, 4 lựa chọn)
      ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                PHẦN I • 3.0 ĐIỂM
              </span>
              <span className="text-xs text-slate-500">6 câu hỏi (0.5 điểm / câu)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Trắc Nghiệm Khách Quan (4 Lựa Chọn)</h2>
          </div>
          <span className="text-xs font-medium text-slate-400">Chọn 1 đáp án đúng nhất</span>
        </div>

        <div className="space-y-8">
          {currentExam.part1.map((q) => {
            const selectedOpt = mcqAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctAnswer;
            const showExplanation = (mode === 'practice' && isAnswered) || isSubmitted;

            return (
              <div key={q.id} className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-200">
                    {q.number}
                  </span>
                  <div className="space-y-1">
                    <p className="text-slate-900 font-semibold text-base leading-relaxed">
                      {q.question}
                    </p>
                    <span className="text-[11px] text-slate-400 font-medium">Chủ đề: {q.topic}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-10">
                  {q.options.map((opt) => {
                    const isThisSelected = selectedOpt === opt.key;
                    const isThisCorrect = opt.key === q.correctAnswer;

                    let btnStyle =
                      'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';

                    if (showExplanation) {
                      if (isThisCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isThisSelected && !isThisCorrect) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                      }
                    } else if (isThisSelected) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          if (!isSubmitted) {
                            setMcqAnswers((prev) => ({ ...prev, [q.id]: opt.key }));
                          }
                        }}
                        className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {opt.key}
                        </span>
                        <span className="text-sm leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {showExplanation && (
                  <div
                    className={`ml-10 p-4 rounded-xl text-xs sm:text-sm border transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50/80 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác! Đáp án đúng là {q.correctAnswer}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Chưa chính xác. Đáp án đúng là: {q.correctAnswer}</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI (1 câu, 4 ý a,b,c,d)
      ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                PHẦN II • 1.0 ĐIỂM
              </span>
              <span className="text-xs text-slate-500">Câu 7 (0.25 điểm / ý)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Trắc Nghiệm Đúng / Sai</h2>
          </div>
          <span className="text-xs font-medium text-slate-400">Chọn Đúng hoặc Sai cho mỗi ý</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-200">
              {currentExam.part2.number}
            </span>
            <p className="text-slate-900 font-semibold text-base leading-relaxed">
              {currentExam.part2.title}
            </p>
          </div>

          <div className="space-y-3 pl-10">
            {currentExam.part2.statements.map((st) => {
              const key = `${currentExam.part2.id}-${st.subId}`;
              const userChoice = tfAnswers[key];
              const isAnswered = userChoice !== undefined;
              const isMatch = userChoice === st.isCorrect;
              const showExp = (mode === 'practice' && isAnswered) || isSubmitted;

              return (
                <div
                  key={st.subId}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-slate-900 text-sm mt-0.5">{st.subId})</span>
                      <p className="text-slate-800 text-sm leading-relaxed">{st.text}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      <button
                        onClick={() => {
                          if (!isSubmitted) {
                            setTfAnswers((prev) => ({ ...prev, [key]: true }));
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          userChoice === true
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Đúng
                      </button>
                      <button
                        onClick={() => {
                          if (!isSubmitted) {
                            setTfAnswers((prev) => ({ ...prev, [key]: false }));
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          userChoice === false
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Sai
                      </button>
                    </div>
                  </div>

                  {showExp && (
                    <div
                      className={`p-3 rounded-xl text-xs border ${
                        isMatch
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <span className="font-bold">
                        Đáp án: {st.isCorrect ? 'ĐÚNG' : 'SAI'}.{' '}
                      </span>
                      <span>{st.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          PHẦN III: TRẢ LỜI NGẮN (2 câu, tính toán/điền số)
      ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                PHẦN III • 2.0 ĐIỂM
              </span>
              <span className="text-xs text-slate-500">Câu 8 & Câu 9</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Trắc Nghiệm Trả Lời Ngắn</h2>
          </div>
          <span className="text-xs font-medium text-slate-400">Điền số hoặc kí hiệu chính xác</span>
        </div>

        <div className="space-y-8">
          {currentExam.part3.map((q) => (
            <div key={q.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-200">
                  {q.number}
                </span>
                <div>
                  <h3 className="text-slate-900 font-semibold text-base">{q.title}</h3>
                  {q.context && <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{q.context}</p>}
                </div>
              </div>

              <div className="space-y-3 pl-10">
                {q.subQuestions.map((sq) => {
                  const key = `${q.id}-${sq.subId}`;
                  const userVal = shortAnswers[key] || '';
                  const isCorrect = isShortAnswerCorrect(userVal, sq.correctAnswers);
                  const showExp = (mode === 'practice' && userVal.trim().length > 0) || isSubmitted;

                  return (
                    <div
                      key={sq.subId}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <label className="text-sm font-medium text-slate-800 flex items-start gap-2">
                          <span className="font-bold text-emerald-700">{sq.subId})</span>
                          <span>{sq.prompt}</span>
                        </label>
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <input
                            type="text"
                            value={userVal}
                            disabled={isSubmitted}
                            onChange={(e) =>
                              setShortAnswers((prev) => ({ ...prev, [key]: e.target.value }))
                            }
                            placeholder="Nhập kết quả..."
                            className={`w-36 px-3 py-1.5 bg-white border rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                              showExp
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 focus:ring-emerald-400'
                                  : 'border-rose-400 bg-rose-50 text-rose-900 focus:ring-rose-400'
                                : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-200'
                            }`}
                          />
                          {sq.unit && <span className="text-xs text-slate-500">{sq.unit}</span>}
                        </div>
                      </div>

                      {showExp && (
                        <div
                          className={`p-2.5 rounded-xl text-xs border ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-amber-50 border-amber-200 text-amber-900'
                          }`}
                        >
                          <span className="font-bold">
                            Đáp án chuẩn: {sq.correctAnswers[0]}.{' '}
                          </span>
                          <span>{sq.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PHẦN IV: TỰ LUẬN (2 câu: Câu 10 & 11) - HỖ TRỢ CHẤM AI
      ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                PHẦN IV • 4.0 ĐIỂM
              </span>
              <span className="text-xs text-slate-500">Câu 10 & Câu 11 (Tự luận giải thích & tính toán)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Tự Luận & Hướng Dẫn Chấm AI</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Chấm Điểm Bằng AI
            </span>
          </div>
        </div>

        <div className="space-y-10">
          {currentExam.part4.map((q) => (
            <div key={q.id} className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-200">
                  {q.number}
                </span>
                <div>
                  <h3 className="text-slate-900 font-semibold text-base">{q.title}</h3>
                  {q.context && (
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      {q.context}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6 pl-10">
                {q.subQuestions.map((sq) => {
                  const key = `${q.id}-${sq.subId}`;
                  const studentAns = essayAnswers[key] || '';
                  const gradeInfo = gradingState[key];
                  const showSolution = showModelAnswers[key];

                  return (
                    <div
                      key={sq.subId}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <label className="text-sm font-bold text-slate-900 flex items-start gap-2">
                          <span className="text-rose-600">{sq.subId})</span>
                          <span>{sq.prompt}</span>
                        </label>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 flex-shrink-0">
                          {sq.maxScore} điểm
                        </span>
                      </div>

                      {/* Chemical formula helper bar */}
                      <ChemToolbar onInsert={(char) => handleInsertChem(key, char)} />

                      {/* Textarea for student's explanation */}
                      <textarea
                        rows={4}
                        value={studentAns}
                        onChange={(e) =>
                          setEssayAnswers((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        placeholder="Nhập câu trả lời hoặc các bước giải toán của em tại đây..."
                        className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed shadow-2xs"
                      />

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={gradeInfo?.loading}
                            onClick={() =>
                              handleGradeWithAI(
                                q.id,
                                sq.subId,
                                q.title,
                                sq.prompt,
                                sq.modelAnswer,
                                sq.maxScore
                              )
                            }
                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {gradeInfo?.loading ? 'AI đang chấm bài...' : 'Chấm Bài Bằng AI'}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setShowModelAnswers((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            {showSolution ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                Ẩn Đáp Án Mẫu
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                Xem Đáp Án Mẫu
                              </>
                            )}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onAskAI(
                              `Em đang làm câu tự luận: "${sq.prompt}". Nhờ thầy cô hướng dẫn phương pháp giải từng bước giúp em!`
                            )
                          }
                          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          Hỏi thêm Gia sư AI
                        </button>
                      </div>

                      {/* AI Grading Result Box */}
                      {gradeInfo?.result && (
                        <div className="p-4 rounded-xl bg-purple-50/90 border border-purple-200 text-purple-950 space-y-2 mt-3 animate-fade-in">
                          <div className="flex items-center gap-2 font-bold text-xs text-purple-900 border-b border-purple-200/60 pb-1.5">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span>Nhận Xét & Chấm Điểm Của Gia Sư AI:</span>
                          </div>
                          <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-slate-800">
                            {gradeInfo.result}
                          </div>
                        </div>
                      )}

                      {/* AI Grading Error */}
                      {gradeInfo?.error && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                          {gradeInfo.error}
                        </div>
                      )}

                      {/* Model Answer Toggle */}
                      {showSolution && (
                        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-slate-800 space-y-1.5 mt-2">
                          <span className="text-xs font-bold text-emerald-800 block">
                            Đáp án & Biểu điểm chuẩn:
                          </span>
                          <div className="text-xs sm:text-sm whitespace-pre-line font-mono bg-white p-3 rounded-lg border border-emerald-200 text-slate-800 leading-relaxed">
                            {sq.modelAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Submit Button */}
      {!isSubmitted && (
        <div className="flex items-center justify-between p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
          <div className="space-y-0.5">
            <h4 className="font-bold text-base">Hoàn Thành Đề Thi?</h4>
            <p className="text-xs text-slate-400">
              Kiểm tra lại các câu hỏi trắc nghiệm và điền khuyết trước khi nộp nhé!
            </p>
          </div>
          <button
            onClick={handleSubmitExam}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 group"
          >
            <span>Nộp Bài & Chấm Điểm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
