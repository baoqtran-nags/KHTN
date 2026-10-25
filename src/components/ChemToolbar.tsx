import React from 'react';

interface ChemToolbarProps {
  onInsert: (char: string) => void;
  className?: string;
}

export const ChemToolbar: React.FC<ChemToolbarProps> = ({ onInsert, className = '' }) => {
  const symbols = [
    { label: 'H₂O', insert: 'H₂O' },
    { label: 'CO₂', insert: 'CO₂' },
    { label: 'CaCO₃', insert: 'CaCO₃' },
    { label: 'NaCl', insert: 'NaCl' },
    { label: 'CH₄', insert: 'CH₄' },
    { label: '₂', insert: '₂' },
    { label: '₃', insert: '₃' },
    { label: '₄', insert: '₄' },
    { label: '₅', insert: '₅' },
    { label: '⁺', insert: '⁺' },
    { label: '⁻', insert: '⁻' },
    { label: '²⁺', insert: '²⁺' },
    { label: '³⁺', insert: '³⁺' },
    { label: '²⁻', insert: '²⁻' },
    { label: '→', insert: ' → ' },
    { label: '·', insert: ' · ' },
    { label: 'amu', insert: ' amu' },
    { label: '%', insert: '%' },
  ];

  return (
    <div className={`flex items-center gap-1.5 flex-wrap p-2 bg-slate-100 rounded-lg border border-slate-200 text-xs ${className}`}>
      <span className="text-slate-500 font-semibold px-1 select-none flex items-center gap-1">
        <span>Kí hiệu nhanh:</span>
      </span>
      {symbols.map((sym, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onInsert(sym.insert)}
          className="px-2 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded font-mono font-medium shadow-2xs transition-colors"
          title={`Chèn ${sym.label}`}
        >
          {sym.label}
        </button>
      ))}
    </div>
  );
};
