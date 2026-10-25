import React from 'react';
import { BookOpen, Sparkles, Atom, Calculator, CheckCircle2, FlaskConical } from 'lucide-react';

export type TabType = 'exams' | 'ai-tutor' | 'handbook' | 'atom-sim' | 'calculator';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  examScores: Record<string, number | null>;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, examScores }) => {
  const completedCount = Object.values(examScores).filter((s) => s !== null).length;

  const navItems = [
    {
      id: 'exams' as TabType,
      label: '3 Bộ Đề Mẫu',
      sublabel: 'Chuẩn 4 phần KHTN 7',
      icon: CheckCircle2,
      badge: completedCount > 0 ? `${completedCount}/3 đề` : 'Đề 1-2-3',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'ai-tutor' as TabType,
      label: 'Gia Sư AI KHTN 7',
      sublabel: 'Hỏi đáp & Chấm bài 24/7',
      icon: Sparkles,
      badge: 'Gemini 3.8',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      id: 'handbook' as TabType,
      label: 'Sổ Tay Kiến Thức',
      sublabel: '4 Trọng tâm ôn tập',
      icon: BookOpen,
      badge: 'Lý thuyết',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      id: 'atom-sim' as TabType,
      label: 'Mô Phỏng Nguyên Tử',
      sublabel: '20 Nguyên tố & Ion hóa',
      icon: Atom,
      badge: 'Tương tác',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    },
    {
      id: 'calculator' as TabType,
      label: 'Máy Tính KLPT & %',
      sublabel: 'Tính amu & % khối lượng',
      icon: Calculator,
      badge: 'Công cụ',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('exams')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
              <FlaskConical className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  KHTN 7 <span className="text-emerald-600 font-bold">HÓA HỌC</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  Giữa Kỳ 1
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Nguyên tố, Bảng tuần hoàn & Liên kết hóa học
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-md font-medium border ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right helper CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ai-tutor')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:from-purple-500 hover:to-indigo-500 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Hỏi Gia Sư AI</span>
              <span className="sm:hidden">Hỏi AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Subnav */}
      <div className="md:hidden overflow-x-auto no-scrollbar border-t border-slate-100 bg-slate-50/80 px-2 py-1.5 flex space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 bg-white border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
