export interface CompoundPreset {
  id: string;
  nameVi: string;
  formula: string;
  latex?: string;
  description: string;
  elements: {
    symbol: string;
    count: number;
    atomicMass: number;
  }[];
  totalMass: number;
  percentages: {
    symbol: string;
    percentage: number;
  }[];
}

export const COMMON_COMPOUNDS: CompoundPreset[] = [
  {
    id: 'caco3',
    nameVi: 'Calcium carbonate (Đá vôi)',
    formula: 'CaCO₃',
    description: 'Có trong vỏ trứng, vỏ sò và đá vôi, dùng trong sản xuất xi măng và vôi sống.',
    elements: [
      { symbol: 'Ca', count: 1, atomicMass: 40 },
      { symbol: 'C', count: 1, atomicMass: 12 },
      { symbol: 'O', count: 3, atomicMass: 16 }
    ],
    totalMass: 100,
    percentages: [
      { symbol: 'Ca', percentage: 40 },
      { symbol: 'C', percentage: 12 },
      { symbol: 'O', percentage: 48 }
    ]
  },
  {
    id: 'urea',
    nameVi: 'Urea (Phân đạm Urê)',
    formula: 'CO(NH₂)₂',
    description: 'Loại phân đạm phổ biến cung cấp nguyên tố dinh dưỡng Nitrogen cho cây trồng.',
    elements: [
      { symbol: 'C', count: 1, atomicMass: 12 },
      { symbol: 'O', count: 1, atomicMass: 16 },
      { symbol: 'N', count: 2, atomicMass: 14 },
      { symbol: 'H', count: 4, atomicMass: 1 }
    ],
    totalMass: 60,
    percentages: [
      { symbol: 'C', percentage: 20 },
      { symbol: 'O', percentage: 26.67 },
      { symbol: 'N', percentage: 46.67 },
      { symbol: 'H', percentage: 6.67 }
    ]
  },
  {
    id: 'ch4',
    nameVi: 'Methane (Khí bắp bùng / Biogas)',
    formula: 'CH₄',
    description: 'Thành phần chính của khí thiên nhiên và khí hầm biogas, dùng làm nhiên liệu đốt.',
    elements: [
      { symbol: 'C', count: 1, atomicMass: 12 },
      { symbol: 'H', count: 4, atomicMass: 1 }
    ],
    totalMass: 16,
    percentages: [
      { symbol: 'C', percentage: 75 },
      { symbol: 'H', percentage: 25 }
    ]
  },
  {
    id: 'h2o',
    nameVi: 'Water (Nước)',
    formula: 'H₂O',
    description: 'Hợp chất phổ biến và thiết yếu cho mọi sự sống trên Trái Đất.',
    elements: [
      { symbol: 'H', count: 2, atomicMass: 1 },
      { symbol: 'O', count: 1, atomicMass: 16 }
    ],
    totalMass: 18,
    percentages: [
      { symbol: 'H', percentage: 11.11 },
      { symbol: 'O', percentage: 88.89 }
    ]
  },
  {
    id: 'nacl',
    nameVi: 'Sodium chloride (Muối ăn)',
    formula: 'NaCl',
    description: 'Hợp chất ion tạo thành từ cation Na⁺ và anion Cl⁻, gia vị quen thuộc hàng ngày.',
    elements: [
      { symbol: 'Na', count: 1, atomicMass: 23 },
      { symbol: 'Cl', count: 1, atomicMass: 35.5 }
    ],
    totalMass: 58.5,
    percentages: [
      { symbol: 'Na', percentage: 39.32 },
      { symbol: 'Cl', percentage: 60.68 }
    ]
  },
  {
    id: 'fe2o3',
    nameVi: 'Iron(III) oxide (Gỉ sắt)',
    formula: 'Fe₂O₃',
    description: 'Thành phần chính của quặng hematit và lớp gỉ sắt màu nâu đỏ.',
    elements: [
      { symbol: 'Fe', count: 2, atomicMass: 56 },
      { symbol: 'O', count: 3, atomicMass: 16 }
    ],
    totalMass: 160,
    percentages: [
      { symbol: 'Fe', percentage: 70 },
      { symbol: 'O', percentage: 30 }
    ]
  },
  {
    id: 'p2o5',
    nameVi: 'Diphosphorus pentoxide',
    formula: 'P₂O₅',
    description: 'Chất bột màu trắng tạo thành khi đốt cháy phosphorus trong khí oxygen.',
    elements: [
      { symbol: 'P', count: 2, atomicMass: 31 },
      { symbol: 'O', count: 5, atomicMass: 16 }
    ],
    totalMass: 142,
    percentages: [
      { symbol: 'P', percentage: 43.66 },
      { symbol: 'O', percentage: 56.34 }
    ]
  },
  {
    id: 'alcl3',
    nameVi: 'Aluminium chloride',
    formula: 'AlCl₃',
    description: 'Hợp chất của nhôm hóa trị III và clo hóa trị I.',
    elements: [
      { symbol: 'Al', count: 1, atomicMass: 27 },
      { symbol: 'Cl', count: 3, atomicMass: 35.5 }
    ],
    totalMass: 133.5,
    percentages: [
      { symbol: 'Al', percentage: 20.22 },
      { symbol: 'Cl', percentage: 79.78 }
    ]
  },
  {
    id: 'co2',
    nameVi: 'Carbon dioxide (Khí cacbonic)',
    formula: 'CO₂',
    description: 'Khí sinh ra từ quá trình hô hấp, đốt cháy nhiên liệu, tham gia quang hợp của cây xanh.',
    elements: [
      { symbol: 'C', count: 1, atomicMass: 12 },
      { symbol: 'O', count: 2, atomicMass: 16 }
    ],
    totalMass: 44,
    percentages: [
      { symbol: 'C', percentage: 27.27 },
      { symbol: 'O', percentage: 72.73 }
    ]
  },
  {
    id: 'h2s',
    nameVi: 'Hydrogen sulfide',
    formula: 'H₂S',
    description: 'Khí không màu có mùi trứng thối đặc trưng, liên kết cộng hóa trị giữa H và S.',
    elements: [
      { symbol: 'H', count: 2, atomicMass: 1 },
      { symbol: 'S', count: 1, atomicMass: 32 }
    ],
    totalMass: 34,
    percentages: [
      { symbol: 'H', percentage: 5.88 },
      { symbol: 'S', percentage: 94.12 }
    ]
  }
];
