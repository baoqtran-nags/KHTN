import React, { useState } from 'react';
import { COMMON_COMPOUNDS, CompoundPreset } from '../data/compoundsData';
import { Calculator, Sparkles, CheckCircle2, ChevronRight, PieChart, BookOpen } from 'lucide-react';
import { ChemToolbar } from './ChemToolbar';

interface MolecularMassCalcViewProps {
  onAskAI: (prompt: string) => void;
}

export const MolecularMassCalcView: React.FC<MolecularMassCalcViewProps> = ({ onAskAI }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('caco3');
  const [customFormula, setCustomFormula] = useState<string>('');

  const currentPreset =
    COMMON_COMPOUNDS.find((c) => c.id === selectedPresetId) || COMMON_COMPOUNDS[0];

  // Helper color map for elements
  const elementColors: Record<string, string> = {
    Ca: 'bg-amber-500 text-white',
    C: 'bg-slate-700 text-white',
    O: 'bg-rose-500 text-white',
    N: 'bg-blue-600 text-white',
    H: 'bg-sky-400 text-slate-900',
    Na: 'bg-amber-600 text-white',
    Cl: 'bg-emerald-500 text-white',
    Fe: 'bg-orange-600 text-white',
    P: 'bg-purple-600 text-white',
    Al: 'bg-indigo-500 text-white',
    S: 'bg-yellow-500 text-slate-900',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
          <Calculator className="w-3.5 h-3.5" />
          <span>Công Cụ Tính Toán Hóa Học 7 Chuẩn</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Máy Tính Khối Lượng Phân Tử (KLPT) & % Khối Lượng
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Tự động phân tích công thức hóa học, tính tổng khối lượng phân tử (đơn vị amu) và tỉ lệ phần trăm (%) khối lượng của từng nguyên tố với lời giải chi tiết theo các đề kiểm tra mẫu.
        </p>

        {/* Quick presets pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-semibold mr-1">Hợp chất trong đề thi:</span>
          {COMMON_COMPOUNDS.map((c) => {
            const isSelected = c.id === selectedPresetId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedPresetId(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {c.formula}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Step-by-Step Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Hợp chất đang xem
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                {currentPreset.formula} - {currentPreset.nameVi}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Khối Lượng Phân Tử</span>
              <span className="text-2xl font-black text-emerald-700 font-mono">
                {currentPreset.totalMass} amu
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{currentPreset.description}</p>

          {/* Step 1: List of Elements and Atomic Masses */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Các nguyên tố cấu tạo nên phân tử:</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentPreset.elements.map((el, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${
                        elementColors[el.symbol] || 'bg-slate-800 text-white'
                      }`}
                    >
                      {el.symbol}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {el.count} nguyên tử
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 pt-1">
                    <span>KLNT: </span>
                    <strong className="font-mono text-slate-900">{el.atomicMass} amu</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Calculation Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Các bước tính Khối lượng phân tử (KLPT):</span>
            </h3>

            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 font-mono text-xs sm:text-sm text-indigo-950 space-y-2 leading-relaxed">
              <div className="text-slate-600 font-sans font-medium text-xs">
                Công thức: KLPT = Tổng (Số nguyên tử × Khối lượng nguyên tử)
              </div>
              <div className="p-3 bg-white rounded-xl border border-indigo-200 font-bold text-indigo-900">
                KLPT({currentPreset.formula}) ={' '}
                {currentPreset.elements
                  .map((el) => `${el.atomicMass} × ${el.count}`)
                  .join(' + ')}{' '}
                = {currentPreset.totalMass} (amu)
              </div>
            </div>
          </div>

          {/* Step 3: Percent Composition Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Các bước tính phần trăm (%) khối lượng từng nguyên tố:</span>
            </h3>

            <div className="space-y-2.5">
              {currentPreset.percentages.map((p, idx) => {
                const elInfo = currentPreset.elements.find((el) => el.symbol === p.symbol);
                const subTotal = (elInfo?.count || 1) * (elInfo?.atomicMass || 1);

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800">
                      <span>Phần trăm khối lượng của {p.symbol}:</span>
                      <span className="font-bold text-emerald-700 font-mono text-base">
                        %{p.symbol} = {p.percentage}%
                      </span>
                    </div>
                    <div className="font-mono text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                      %{p.symbol} = [({subTotal}) / {currentPreset.totalMass}] × 100% = {p.percentage}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Visual Percentage Composition Chart & Interactive QA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Percentage Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              <PieChart className="w-5 h-5 text-indigo-600" />
              <span>Biểu Đồ Thành Phần % Khối Lượng</span>
            </div>

            {/* Stacked Percentage Bar */}
            <div className="space-y-2">
              <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner border border-slate-200">
                {currentPreset.percentages.map((p, idx) => {
                  const colors = [
                    'bg-emerald-500',
                    'bg-indigo-500',
                    'bg-amber-500',
                    'bg-rose-500',
                    'bg-sky-500',
                  ];
                  return (
                    <div
                      key={idx}
                      style={{ width: `${p.percentage}%` }}
                      className={`${colors[idx % colors.length]} flex items-center justify-center text-[10px] text-white font-bold truncate px-1 transition-all`}
                      title={`${p.symbol}: ${p.percentage}%`}
                    >
                      {p.percentage > 10 ? `${p.symbol} ${p.percentage}%` : ''}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                {currentPreset.percentages.map((p, idx) => {
                  const colors = [
                    'bg-emerald-500',
                    'bg-indigo-500',
                    'bg-amber-500',
                    'bg-rose-500',
                    'bg-sky-500',
                  ];
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
                      <span className="font-semibold text-slate-700">
                        {p.symbol}: {p.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chemical rule reminder */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold block">Quy tắc vàng khi làm bài kiểm tra:</span>
              <p className="leading-relaxed">
                Tổng phần trăm tất cả các nguyên tố trong một hợp chất luôn luôn bằng 100%. Khi tính xong, em hãy cộng lại để kiểm tra nhé!
              </p>
            </div>

            {/* Ask AI button for this formula */}
            <button
              onClick={() =>
                onAskAI(
                  `Thầy/cô hướng dẫn chi tiết cách tính khối lượng phân tử và % khối lượng của các nguyên tố trong hợp chất ${currentPreset.formula} (${currentPreset.nameVi}) giúp em với ạ!`
                )
              }
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hỏi Gia sư AI về bài toán {currentPreset.formula}</span>
            </button>
          </div>

          {/* Quick Valence Reference for Grade 7 */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Bảng Hóa Trị & Khối Lượng Thường Gặp (Lớp 7)</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-2 font-semibold">Nguyên tố</th>
                    <th className="pb-2 font-semibold">Kí hiệu</th>
                    <th className="pb-2 font-semibold font-mono">KLNT (amu)</th>
                    <th className="pb-2 font-semibold">Hóa trị chuẩn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  <tr>
                    <td className="py-2">Hydrogen</td>
                    <td className="font-bold text-slate-900">H</td>
                    <td className="font-mono">1</td>
                    <td className="font-bold text-emerald-700">I (Chuẩn)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Oxygen</td>
                    <td className="font-bold text-slate-900">O</td>
                    <td className="font-mono">16</td>
                    <td className="font-bold text-emerald-700">II (Chuẩn)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Carbon</td>
                    <td className="font-bold text-slate-900">C</td>
                    <td className="font-mono">12</td>
                    <td className="font-bold">IV, II</td>
                  </tr>
                  <tr>
                    <td className="py-2">Nitrogen</td>
                    <td className="font-bold text-slate-900">N</td>
                    <td className="font-mono">14</td>
                    <td className="font-bold">III, IV, V</td>
                  </tr>
                  <tr>
                    <td className="py-2">Calcium</td>
                    <td className="font-bold text-slate-900">Ca</td>
                    <td className="font-mono">40</td>
                    <td className="font-bold">II</td>
                  </tr>
                  <tr>
                    <td className="py-2">Iron</td>
                    <td className="font-bold text-slate-900">Fe</td>
                    <td className="font-mono">56</td>
                    <td className="font-bold">II, III</td>
                  </tr>
                  <tr>
                    <td className="py-2">Aluminium</td>
                    <td className="font-bold text-slate-900">Al</td>
                    <td className="font-mono">27</td>
                    <td className="font-bold">III</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
