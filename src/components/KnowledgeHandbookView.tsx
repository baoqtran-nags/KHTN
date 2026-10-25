import React, { useState } from 'react';
import { KNOWLEDGE_TOPICS, KnowledgeSection } from '../data/knowledgeData';
import {
  BookOpen,
  FlaskConical,
  Atom,
  Network,
  Calculator,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { PeriodicTableReference } from './PeriodicTableReference';

interface KnowledgeHandbookViewProps {
  onAskAI: (prompt: string) => void;
}

export const KnowledgeHandbookView: React.FC<KnowledgeHandbookViewProps> = ({ onAskAI }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [openQuizAnswers, setOpenQuizAnswers] = useState<Record<string, boolean>>({});

  const iconMap: Record<string, React.ElementType> = {
    FlaskConical,
    Atom,
    Network,
    Calculator,
  };

  const toggleQuiz = (key: string) => {
    setOpenQuizAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredTopics =
    selectedTopicId === 'all'
      ? KNOWLEDGE_TOPICS
      : KNOWLEDGE_TOPICS.filter((t) => t.id === selectedTopicId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Sổ Tay Kiến Thức Chuẩn Lớp 7</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Hệ Thống Kiến Thức Cốt Lõi Giữa Kỳ 1 KHTN 7
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Tóm tắt toàn bộ 4 chuyên đề trọng tâm: Phương pháp nghiên cứu, Cấu tạo nguyên tử & Bảng tuần hoàn, Đơn chất - Hợp chất - Liên kết hóa học, Quy tắc hóa trị và Tính toán hóa học.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setSelectedTopicId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTopicId === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Tất cả 4 chuyên đề
          </button>
          <button
            onClick={() => setSelectedTopicId('periodic-table')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTopicId === 'periodic-table'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-white/10 text-amber-300 hover:bg-white/20'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>Tra cứu Bảng Tuần Hoàn (20 Nguyên tố)</span>
          </button>
          {KNOWLEDGE_TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {topic.title.split('.')[1]?.trim() || topic.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* If Periodic Table reference tab is selected */}
      {selectedTopicId === 'periodic-table' && (
        <PeriodicTableReference onAskAI={onAskAI} />
      )}

      {/* Topic Cards */}
      {selectedTopicId !== 'periodic-table' && (
        <div className="space-y-8">
          {filteredTopics.map((topic) => {
            const Icon = iconMap[topic.icon] || BookOpen;

            return (
              <React.Fragment key={topic.id}>
                <div
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow"
                >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                        {topic.badge}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {topic.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">{topic.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onAskAI(
                      `Thầy/cô giải thích chi tiết hơn cho em về chuyên đề: "${topic.title}" và các ví dụ thực tế liên quan được không ạ?`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Hỏi AI về bài này</span>
                </button>
              </div>

              {/* Summary note */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed font-medium">
                {topic.summary}
              </div>

              {/* Key points cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-5 rounded-2xl border border-slate-200/90 bg-white space-y-2.5 hover:border-indigo-300 transition-colors shadow-2xs"
                  >
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {point.content}
                    </p>

                    {point.formulaOrExample && (
                      <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 font-mono text-xs text-indigo-950 font-semibold whitespace-pre-line">
                        {point.formulaOrExample}
                      </div>
                    )}

                    {point.highlight && (
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>{point.highlight}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Self-Check Mini Quiz */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-sm text-slate-900">
                    Câu Hỏi Tự Kiểm Tra Nhanh (Click để xem đáp án)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.quickQuiz.map((quiz, qIdx) => {
                    const quizKey = `${topic.id}-${qIdx}`;
                    const isOpen = openQuizAnswers[quizKey];

                    return (
                      <div
                        key={qIdx}
                        onClick={() => toggleQuiz(quizKey)}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/40 cursor-pointer transition-all space-y-2 select-none"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs sm:text-sm font-semibold text-slate-800">
                            {quiz.question}
                          </p>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          )}
                        </div>

                        {isOpen && (
                          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1 animate-fade-in">
                            <div className="font-bold text-emerald-800">
                              Đáp án: {quiz.answer}
                            </div>
                            <p className="text-slate-600 leading-normal">{quiz.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* If Topic 2 (Cấu tạo nguyên tử & Bảng tuần hoàn), embed Periodic Table Reference */}
            {topic.id === 'atom-periodic-table' && (
              <PeriodicTableReference onAskAI={onAskAI} />
            )}
          </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
