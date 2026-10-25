import React, { useState } from 'react';
import { ELEMENTS_20, ChemicalElement } from '../data/elementsData';
import { Atom, Zap, Info, Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface AtomSimulatorViewProps {
  onAskAI: (prompt: string) => void;
}

export const AtomSimulatorView: React.FC<AtomSimulatorViewProps> = ({ onAskAI }) => {
  const [selectedElementZ, setSelectedElementZ] = useState<number>(11); // Default Sodium (Na)
  const [isIonMode, setIsIonMode] = useState<boolean>(false);

  const element = ELEMENTS_20.find((e) => e.z === selectedElementZ) || ELEMENTS_20[10];

  // Calculate ion properties if available
  let displayShells = [...element.electronShells];
  let currentCharge = 0;
  let ionName = '';

  if (isIonMode && element.commonIon) {
    if (element.type === 'metal') {
      // Loses outer electrons
      const lost = element.outerElectrons;
      currentCharge = lost;
      displayShells = displayShells.slice(0, -1);
      ionName = element.commonIon;
    } else if (element.type === 'nonmetal') {
      // Gains electrons to reach 8 (or 2 for H)
      const needed = 8 - element.outerElectrons;
      currentCharge = -needed;
      const lastIdx = displayShells.length - 1;
      displayShells[lastIdx] = 8;
      ionName = element.commonIon;
    }
  }

  const totalElectrons = displayShells.reduce((a, b) => a + b, 0);

  // SVG Ring Radii
  const ringRadii = [45, 80, 115, 145];

  // Helper to place electrons evenly around a circle
  const renderElectronsOnRing = (count: number, radius: number, ringIndex: number) => {
    const electrons = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const cx = 175 + radius * Math.cos(angle);
      const cy = 175 + radius * Math.sin(angle);

      electrons.push(
        <g key={`${ringIndex}-${i}`}>
          <circle
            cx={cx}
            cy={cy}
            r="6"
            className="fill-sky-400 stroke-2 stroke-sky-200 drop-shadow-md"
          />
          <text
            x={cx}
            y={cy + 3}
            textAnchor="middle"
            className="text-[9px] font-bold fill-sky-950 select-none pointer-events-none"
          >
            -
          </text>
        </g>
      );
    }
    return electrons;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30">
          <Atom className="w-3.5 h-3.5" />
          <span>Mô Phỏng Phòng Thí Nghiệm Nguyên Tử</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Cấu Tạo Hạt & Cơ Chế Hình Thành Ion (20 Nguyên Tố Đầu)
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Quan sát trực quan hạt nhân (p, n), các lớp electron chuyển động quanh hạt nhân và trải nghiệm cách nguyên tử kim loại nhường electron hoặc phi kim nhận electron để tạo thành ion bền vững.
        </p>
      </div>

      {/* 20 Elements Quick Selector Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Chọn 1 trong 20 nguyên tố đầu bảng tuần hoàn (Z = 1 → 20)
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-600">Kim loại kiềm</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 ml-2" />
            <span className="text-slate-600">Halogen</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-400 ml-2" />
            <span className="text-slate-600">Khí hiếm</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {ELEMENTS_20.map((el) => {
            const isSelected = el.z === selectedElementZ;
            let typeColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';

            if (el.group === 'IA' && el.z !== 1) {
              typeColor = isSelected
                ? 'bg-amber-500 text-white border-amber-600 font-bold'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100';
            } else if (el.group === 'VIIA') {
              typeColor = isSelected
                ? 'bg-sky-500 text-white border-sky-600 font-bold'
                : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100';
            } else if (el.group === 'VIIIA') {
              typeColor = isSelected
                ? 'bg-purple-600 text-white border-purple-700 font-bold'
                : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100';
            } else if (isSelected) {
              typeColor = 'bg-emerald-600 text-white border-emerald-700 font-bold';
            }

            return (
              <button
                key={el.z}
                onClick={() => {
                  setSelectedElementZ(el.z);
                  setIsIonMode(false);
                }}
                className={`p-2 rounded-xl border text-center transition-all ${typeColor} ${
                  isSelected ? 'shadow-md scale-105 ring-2 ring-emerald-500/20' : ''
                }`}
              >
                <div className="text-[10px] opacity-75 font-mono">{el.z}</div>
                <div className="font-extrabold text-sm">{el.symbol}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: Atom Visualization + Information Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Bohr Orbital SVG Simulation */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
          {/* Header pill */}
          <div className="w-full flex items-center justify-between mb-4 z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/15">
                Mô hình hành tinh Bohr (Lớp 7)
              </span>
              {isIonMode && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Dạng Ion: {ionName}
                </span>
              )}
            </div>

            {/* Toggle Ion mode button */}
            {element.commonIon ? (
              <button
                onClick={() => setIsIonMode(!isIonMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                  isIonMode
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{isIonMode ? 'Về Nguyên Tử Trung Hòa' : `Mô Phỏng Tạo Ion (${element.commonIon})`}</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 font-medium">Khí hiếm (Trơ, không tạo ion)</span>
            )}
          </div>

          {/* SVG Canvas for Atom Shells */}
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 350 350" className="w-full h-full">
              {/* Concentric Electron Orbital Rings */}
              {displayShells.map((_, idx) => (
                <circle
                  key={idx}
                  cx="175"
                  cy="175"
                  r={ringRadii[idx]}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-spin-slow origin-center"
                />
              ))}

              {/* Central Nucleus */}
              <circle
                cx="175"
                cy="175"
                r="30"
                className="fill-gradient drop-shadow-lg"
                fill="url(#nucleusGradient)"
              />
              <defs>
                <radialGradient id="nucleusGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </radialGradient>
              </defs>

              {/* Nucleus Label */}
              <text
                x="175"
                y="170"
                textAnchor="middle"
                className="text-xs font-bold fill-white select-none pointer-events-none"
              >
                {element.symbol}
              </text>
              <text
                x="175"
                y="185"
                textAnchor="middle"
                className="text-[9px] font-mono fill-rose-200 select-none pointer-events-none"
              >
                {element.z}p + {Math.round(element.mass - element.z)}n
              </text>

              {/* Electrons on each shell */}
              {displayShells.map((electronCount, idx) =>
                renderElectronsOnRing(electronCount, ringRadii[idx], idx)
              )}
            </svg>
          </div>

          {/* Bottom legend */}
          <div className="w-full mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span>Phân bố electron các lớp: </span>
              <span className="font-mono font-bold text-sky-300">
                [{displayShells.join(', ')}]
              </span>
            </div>
            <div>
              <span>Tổng electron: </span>
              <span className="font-mono font-bold text-sky-300">{totalElectrons}e</span>
            </div>
          </div>
        </div>

        {/* Right: Detailed Element Analysis & Exam Explanations */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Số hiệu nguyên tử Z = {element.z}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {element.nameVi} ({element.symbol})
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  element.type === 'metal'
                    ? 'bg-amber-100 text-amber-800'
                    : element.type === 'noble-gas'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {element.typeLabelVi}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {element.description}
            </p>

            {/* Atomic Parameters Table */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Số hạt Proton (p)</span>
                <span className="text-base font-bold text-rose-600 font-mono">{element.z} (+)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Số hạt Electron (e)</span>
                <span className="text-base font-bold text-sky-600 font-mono">
                  {totalElectrons} (-)
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Số hạt Neutron (n)</span>
                <span className="text-base font-bold text-slate-700 font-mono">
                  {Math.round(element.mass - element.z)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Khối lượng nguyên tử</span>
                <span className="text-base font-bold text-emerald-700 font-mono">
                  {element.mass} amu
                </span>
              </div>
            </div>

            {/* Periodic Table Position */}
            <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-2">
              <span className="text-xs font-bold text-indigo-900 block">
                Vị trí trong Bảng tuần hoàn:
              </span>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-600">Ô nguyên tố: </span>
                  <strong className="text-indigo-950 font-bold">Số {element.z}</strong>
                </div>
                <div>
                  <span className="text-slate-600">Chu kỳ: </span>
                  <strong className="text-indigo-950 font-bold">
                    {element.period} ({element.electronShells.length} lớp e)
                  </strong>
                </div>
                <div>
                  <span className="text-slate-600">Nhóm: </span>
                  <strong className="text-indigo-950 font-bold">
                    {element.group} ({element.outerElectrons}e ngoài cùng)
                  </strong>
                </div>
              </div>
            </div>

            {/* Ion mechanism explanation */}
            {element.ionFormation && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cơ chế tạo ion:</span>
                </div>
                <div className="font-mono text-xs font-bold text-emerald-800 bg-white p-2.5 rounded-lg border border-emerald-200">
                  {element.ionFormation}
                </div>
                <p className="text-[11px] text-emerald-900 leading-normal">
                  {element.type === 'metal'
                    ? `Kim loại ${element.symbol} nhường ${element.outerElectrons} electron ở lớp ngoài cùng để đạt cấu hình electron bền vững 8e giống khí hiếm.`
                    : `Phi kim ${element.symbol} nhận thêm ${8 - element.outerElectrons} electron vào lớp ngoài cùng để đạt cấu hình electron bền vững 8e giống khí hiếm.`}
                </p>
              </div>
            )}

            {/* Ask AI button for this element */}
            <button
              onClick={() =>
                onAskAI(
                  `Thầy/cô giải thích giúp em vị trí của nguyên tố ${element.nameVi} (${element.symbol}, Z=${element.z}) trong bảng tuần hoàn và tính chất hóa học nổi bật của nó ạ!`
                )
              }
              className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Hỏi Gia sư AI về nguyên tố {element.symbol}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
