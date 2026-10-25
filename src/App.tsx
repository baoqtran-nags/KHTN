/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ExamView } from './components/ExamView';
import { AIAssistantView } from './components/AIAssistantView';
import { KnowledgeHandbookView } from './components/KnowledgeHandbookView';
import { AtomSimulatorView } from './components/AtomSimulatorView';
import { MolecularMassCalcView } from './components/MolecularMassCalcView';
import { Sparkles, FlaskConical, Award, BookCheck, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('exams');
  const [initialAIPrompt, setInitialAIPrompt] = useState<string>('');
  const [examScores, setExamScores] = useState<Record<string, number | null>>({
    'de-1': null,
    'de-2': null,
    'de-3': null,
  });

  const handleAskAI = (prompt: string) => {
    setInitialAIPrompt(prompt);
    setActiveTab('ai-tutor');
  };

  const handleExamScoreUpdate = (examId: string, score: number) => {
    setExamScores((prev) => ({
      ...prev,
      [examId]: score,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        examScores={examScores}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'exams' && (
          <ExamView
            onExamScoreUpdate={handleExamScoreUpdate}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'ai-tutor' && (
          <AIAssistantView
            initialPrompt={initialAIPrompt}
            onClearInitialPrompt={() => setInitialAIPrompt('')}
          />
        )}

        {activeTab === 'handbook' && (
          <KnowledgeHandbookView onAskAI={handleAskAI} />
        )}

        {activeTab === 'atom-sim' && (
          <AtomSimulatorView onAskAI={handleAskAI} />
        )}

        {activeTab === 'calculator' && (
          <MolecularMassCalcView onAskAI={handleAskAI} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-sm block">
                KHTN 7 • Ôn Tập & Luyện Đề Hóa Học
              </span>
              <span className="text-slate-400">
                Chương trình chuẩn môn Khoa học tự nhiên 7 (Bộ GD&ĐT)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('handbook')}
              className="hover:text-emerald-700 transition-colors"
            >
              Lý thuyết cốt lõi
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className="hover:text-emerald-700 transition-colors"
            >
              3 Bộ đề mẫu
            </button>
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className="hover:text-emerald-700 transition-colors text-purple-700 font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gia sư AI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
