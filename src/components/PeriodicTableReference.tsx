import React, { useState } from 'react';
import { ELEMENTS_20, ChemicalElement } from '../data/elementsData';
import {
  Sparkles,
  Layers,
  Atom,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface PeriodicTableReferenceProps {
  onAskAI?: (prompt: string) => void;
  className?: string;
}

const GROUPS = ['IA', 'IIA', 'IIIA', 'IVA', 'VA', 'VIA', 'VIIA', 'VIIIA'];

export const PeriodicTableReference: React.FC<PeriodicTableReferenceProps> = ({
  onAskAI,
  className = '',
}) => {
  const [selectedElementZ, setSelectedElementZ] = useState<number>(11); // Default: Na (Z=11)
  const [hoveredElementZ, setHoveredElementZ] = useState<number | null>(null);
  const [recentlyClickedZ, setRecentlyClickedZ] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'metal' | 'nonmetal' | 'noble-gas'>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const selectedElement =
    ELEMENTS_20.find((e) => e.z === selectedElementZ) || ELEMENTS_20[10];

  const hoveredElement =
    hoveredElementZ !== null ? ELEMENTS_20.find((e) => e.z === hoveredElementZ) : null;

  // Active period & group for crosshair highlight (from hover or selection)
  const activePeriod = hoveredElement ? hoveredElement.period : selectedElement.period;
  const activeGroup = hoveredElement ? hoveredElement.group : selectedElement.group;

  // Map 20 elements to Periodic Table coordinates
  const getElementAt = (period: number, group: string): ChemicalElement | undefined => {
    return ELEMENTS_20.find((e) => e.period === period && e.group === group);
  };

  // Subtle web audio feedback when selecting an element
  const playClickChime = (z: number) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch slightly varies by atomic number Z for engaging acoustic identity
      const baseFreq = 420 + z * 16;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // Gracefully continue without sound if blocked or unsupported
    }
  };

  const handleSelectElement = (el: ChemicalElement) => {
    setSelectedElementZ(el.z);
    setRecentlyClickedZ(el.z);
    playClickChime(el.z);

    setTimeout(() => {
      setRecentlyClickedZ((prev) => (prev === el.z ? null : prev));
    }, 350);
  };

  const handleNavigateNext = () => {
    const currentIndex = ELEMENTS_20.findIndex((e) => e.z === selectedElementZ);
    const nextIndex = (currentIndex + 1) % ELEMENTS_20.length;
    handleSelectElement(ELEMENTS_20[nextIndex]);
  };

  const handleNavigatePrev = () => {
    const currentIndex = ELEMENTS_20.findIndex((e) => e.z === selectedElementZ);
    const prevIndex = (currentIndex - 1 + ELEMENTS_20.length) % ELEMENTS_20.length;
    handleSelectElement(ELEMENTS_20[prevIndex]);
  };

  // Styling helper for cell base and dynamic hover states
  const getElementColorClass = (el: ChemicalElement, isSelected: boolean, isHovered: boolean) => {
    const isClickedNow = recentlyClickedZ === el.z;

    if (el.type === 'noble-gas') {
      if (isSelected) {
        return `bg-purple-600 text-white ring-4 ring-purple-400/80 shadow-lg shadow-purple-600/30 scale-105 z-20 ${
          isClickedNow ? 'animate-click-burst' : ''
        }`;
      }
      return `bg-purple-50 text-purple-950 border-purple-200 hover:bg-purple-100/90 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 hover:scale-105 hover:z-10 ${
        isHovered ? 'ring-2 ring-purple-300' : ''
      }`;
    }

    if (el.type === 'metal') {
      if (el.group === 'IA' && el.z !== 1) {
        // Alkali metal
        if (isSelected) {
          return `bg-amber-500 text-white ring-4 ring-amber-400/80 shadow-lg shadow-amber-500/30 scale-105 z-20 ${
            isClickedNow ? 'animate-click-burst' : ''
          }`;
        }
        return `bg-amber-50 text-amber-950 border-amber-200 hover:bg-amber-100/90 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-1 hover:scale-105 hover:z-10 ${
          isHovered ? 'ring-2 ring-amber-300' : ''
        }`;
      }
      // Other metal (IIA, IIIA)
      if (isSelected) {
        return `bg-blue-600 text-white ring-4 ring-blue-400/80 shadow-lg shadow-blue-500/30 scale-105 z-20 ${
          isClickedNow ? 'animate-click-burst' : ''
        }`;
      }
      return `bg-blue-50 text-blue-950 border-blue-200 hover:bg-blue-100/90 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 hover:scale-105 hover:z-10 ${
        isHovered ? 'ring-2 ring-blue-300' : ''
      }`;
    }

    // Non-metal
    if (el.group === 'VIIA') {
      // Halogen
      if (isSelected) {
        return `bg-teal-600 text-white ring-4 ring-teal-400/80 shadow-lg shadow-teal-500/30 scale-105 z-20 ${
          isClickedNow ? 'animate-click-burst' : ''
        }`;
      }
      return `bg-teal-50 text-teal-950 border-teal-200 hover:bg-teal-100/90 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-1 hover:scale-105 hover:z-10 ${
        isHovered ? 'ring-2 ring-teal-300' : ''
      }`;
    }

    // Standard non-metal
    if (isSelected) {
      return `bg-emerald-600 text-white ring-4 ring-emerald-400/80 shadow-lg shadow-emerald-500/30 scale-105 z-20 ${
        isClickedNow ? 'animate-click-burst' : ''
      }`;
    }
    return `bg-emerald-50 text-emerald-950 border-emerald-200 hover:bg-emerald-100/90 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1 hover:scale-105 hover:z-10 ${
      isHovered ? 'ring-2 ring-emerald-300' : ''
    }`;
  };

  return (
    <div
      id="periodic-table-ref"
      className={`bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 ${className}`}
    >
      {/* Title & Classification Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 flex items-center gap-1">
              <Atom className="w-3.5 h-3.5" />
              Tra Cứu Bảng Tuần Hoàn KHTN 7
            </span>
            <span className="text-xs text-slate-500">20 nguyên tố đầu (Z = 1 → 20)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Bảng Tuần Hoàn & Cấu Hình Electron
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Rê chuột để xem hiệu ứng giao điểm Chu kỳ - Nhóm. Nhấp chuột vào bất kỳ ô nguyên tố nào để xem số hiệu, cấu hình electron và phân loại.
          </p>
        </div>

        {/* Filter Chips & Audio toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả (20)
            </button>
            <button
              onClick={() => setFilterType('metal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filterType === 'metal'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-amber-800 hover:bg-amber-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Kim loại (7)
            </button>
            <button
              onClick={() => setFilterType('nonmetal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filterType === 'nonmetal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Phi kim (10)
            </button>
            <button
              onClick={() => setFilterType('noble-gas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filterType === 'noble-gas'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-800 hover:bg-purple-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Khí hiếm (3)
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
              soundEnabled
                ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
            }`}
            title={soundEnabled ? 'Tắt âm thanh tương tác' : 'Bật âm thanh tương tác'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Container: Periodic Table Grid (Top) + Interactive Inspector (Bottom) */}
      <div className="space-y-6">
        {/* Table Structure (Periods 1 to 4 vs Groups IA to VIIIA) */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            {/* Header: Groups IA to VIIIA with Crosshair Highlight */}
            <div className="grid grid-cols-9 gap-1.5 mb-1.5 text-center">
              <div className="p-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center">
                Chu kỳ
              </div>
              {GROUPS.map((grp) => {
                const isGroupActive = activeGroup === grp;
                return (
                  <div
                    key={grp}
                    className={`p-1.5 rounded-xl font-extrabold text-xs transition-all duration-200 ${
                      isGroupActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {grp}
                  </div>
                );
              })}
            </div>

            {/* Rows for Period 1 to 4 with Crosshair Highlight */}
            {[1, 2, 3, 4].map((periodNum) => {
              const isPeriodActive = activePeriod === periodNum;

              return (
                <div key={periodNum} className="grid grid-cols-9 gap-1.5 mb-1.5 items-stretch">
                  {/* Period label indicator with Crosshair highlight */}
                  <div
                    className={`flex flex-col items-center justify-center p-1 rounded-xl text-xs font-bold transition-all duration-200 border ${
                      isPeriodActive
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-slate-50 border-slate-200/80 text-slate-600'
                    }`}
                  >
                    <span className={`text-[10px] ${isPeriodActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                      CK
                    </span>
                    <span className="text-base font-black">{periodNum}</span>
                  </div>

                  {/* 8 Columns for Groups IA to VIIIA */}
                  {GROUPS.map((grp) => {
                    const el = getElementAt(periodNum, grp);

                    if (!el) {
                      return (
                        <div
                          key={`${periodNum}-${grp}`}
                          className="rounded-xl border border-dashed border-slate-200/60 bg-slate-50/20"
                        />
                      );
                    }

                    const isSelected = el.z === selectedElementZ;
                    const isHovered = el.z === hoveredElementZ;
                    const isDimmed = filterType !== 'all' && el.type !== filterType;

                    return (
                      <button
                        key={el.z}
                        onClick={() => handleSelectElement(el)}
                        onMouseEnter={() => setHoveredElementZ(el.z)}
                        onMouseLeave={() => setHoveredElementZ(null)}
                        className={`relative p-2 rounded-xl border flex flex-col justify-between items-center text-center transition-all duration-200 min-h-[72px] cursor-pointer select-none ${getElementColorClass(
                          el,
                          isSelected,
                          isHovered
                        )} ${isDimmed ? 'opacity-25 grayscale hover:opacity-100 hover:grayscale-0' : ''}`}
                      >
                        {/* Top row: Atomic number Z & mass */}
                        <div className="w-full flex items-center justify-between text-[10px] font-mono leading-none opacity-80">
                          <span className="font-extrabold">{el.z}</span>
                          <span>{el.mass}</span>
                        </div>

                        {/* Chemical Symbol */}
                        <div className="font-black text-lg sm:text-xl tracking-tight my-0.5">
                          {el.symbol}
                        </div>

                        {/* Name */}
                        <div className="w-full truncate text-[10px] font-medium leading-none opacity-90">
                          {el.nameVi.split(' ')[0]}
                        </div>

                        {/* Selection spark badge */}
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[9px] font-bold shadow-xs">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Legend & Hover Indicator Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-slate-700">Màu phân loại:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-500" />
              <span>Kim loại kiềm (Nhóm IA)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-blue-500" />
              <span>Kim loại khác (Nhóm IIA, IIIA)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500" />
              <span>Phi kim</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-teal-500" />
              <span>Halogen (Nhóm VIIA)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-purple-500" />
              <span>Khí hiếm (Nhóm VIIIA)</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            {hoveredElement ? (
              <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                Đang rê: {hoveredElement.symbol} ({hoveredElement.nameVi}) • Chu kỳ {hoveredElement.period}, Nhóm {hoveredElement.group}
              </span>
            ) : (
              <span>* Nhấp vào ô nguyên tố để khám phá</span>
            )}
          </div>
        </div>

        {/* Selected Element Interactive Inspector Card with Animation and Mini Orbit Preview */}
        {selectedElement && (
          <div
            key={selectedElement.z}
            className="animate-pop-card bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Quick Next / Prev element navigation header */}
            <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-semibold font-mono">
                  Nguyên tố {selectedElement.z} / 20
                </span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="text-slate-300 hidden sm:inline">
                  Chu kỳ {selectedElement.period} • Nhóm {selectedElement.group}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleNavigatePrev}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Nguyên tố liền trước"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trước</span>
                </button>
                <button
                  onClick={handleNavigateNext}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Nguyên tố liền sau"
                >
                  <span className="hidden sm:inline">Sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Big Symbol Badge + Mini Orbital Preview */}
              <div className="md:col-span-4 flex items-center gap-5">
                <div className="w-24 h-24 rounded-3xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex flex-col items-center justify-center flex-shrink-0 shadow-lg text-center p-2 group hover:border-emerald-400 transition-colors">
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    Z = {selectedElement.z}
                  </span>
                  <span className="text-4xl font-black tracking-tight text-white group-hover:scale-105 transition-transform">
                    {selectedElement.symbol}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    {selectedElement.mass} amu
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        selectedElement.type === 'metal'
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : selectedElement.type === 'noble-gas'
                          ? 'bg-purple-400 text-slate-950 shadow-xs'
                          : 'bg-emerald-400 text-slate-950 shadow-xs'
                      }`}
                    >
                      {selectedElement.type === 'metal'
                        ? 'Kim Loại (Metal)'
                        : selectedElement.type === 'noble-gas'
                        ? 'Khí Hiếm (Noble Gas)'
                        : 'Phi Kim (Non-metal)'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{selectedElement.nameVi}</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Tên tiếng Anh: {selectedElement.nameEn}
                  </p>
                </div>
              </div>

              {/* Middle Column: Core Characteristics & Electron Configuration */}
              <div className="md:col-span-5 grid grid-cols-2 gap-3 text-xs">
                {/* Electron Shells */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-1.5 col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-[11px] flex items-center gap-1.5 font-semibold">
                      <Layers className="w-3.5 h-3.5 text-sky-400" />
                      Cấu hình electron từng lớp (Bohr):
                    </span>
                    <span className="text-slate-300 text-[11px] font-mono">
                      {selectedElement.electronShells.length} lớp electron
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-xl text-sky-300 tracking-wider">
                      [{selectedElement.electronShells.join(' - ')}]
                    </span>
                  </div>

                  {/* Visual Shell Dots Preview */}
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    <span className="text-[10px] text-slate-400">Các lớp (trong → ngoài):</span>
                    <div className="flex items-center gap-1.5">
                      {selectedElement.electronShells.map((count, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-200 border border-sky-400/30 font-mono text-[10px] font-bold"
                          title={`Lớp ${idx + 1}: ${count} electron`}
                        >
                          L{idx + 1}: {count}e
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outer Electrons & Group */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-0.5">
                  <span className="text-slate-400 text-[11px]">Vị trí Nhóm & Lớp ngoài:</span>
                  <div className="font-bold text-white text-sm">
                    Nhóm {selectedElement.group}
                  </div>
                  <div className="text-[11px] text-emerald-300 font-medium">
                    {selectedElement.outerElectrons} electron ngoài cùng
                  </div>
                </div>

                {/* Period */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-0.5">
                  <span className="text-slate-400 text-[11px]">Vị trí Chu kỳ:</span>
                  <div className="font-bold text-white text-sm">
                    Chu kỳ {selectedElement.period}
                  </div>
                  <div className="text-[11px] text-sky-300 font-medium">
                    Có {selectedElement.period} lớp electron
                  </div>
                </div>

                {/* Standard Valence */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-0.5">
                  <span className="text-slate-400 text-[11px]">Hóa trị chuẩn KHTN 7:</span>
                  <div className="font-bold text-amber-300 text-sm font-mono">
                    Hóa trị {selectedElement.valence}
                  </div>
                </div>

                {/* Common Ion */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-0.5">
                  <span className="text-slate-400 text-[11px]">Ion tạo thành:</span>
                  <div className="font-bold text-rose-300 text-sm font-mono">
                    {selectedElement.commonIon ? selectedElement.commonIon : 'Không tạo ion'}
                  </div>
                </div>
              </div>

              {/* Right Column: Pedagogical Insight & Ask AI */}
              <div className="md:col-span-3 space-y-3">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xs text-slate-200 leading-relaxed">
                  <p>{selectedElement.description}</p>
                </div>

                {onAskAI && (
                  <button
                    onClick={() =>
                      onAskAI(
                        `Thầy/cô giải thích giúp em vị trí của nguyên tố ${selectedElement.nameVi} (${selectedElement.symbol}, Z=${selectedElement.z}) trong Bảng tuần hoàn, cấu hình electron và tính chất hóa học nổi bật của nó ạ!`
                      )
                    }
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all group"
                  >
                    <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    <span>Hỏi AI về {selectedElement.symbol}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
