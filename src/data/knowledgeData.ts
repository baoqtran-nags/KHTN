export interface KnowledgeSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  color: string;
  summary: string;
  keyPoints: {
    title: string;
    content: string;
    formulaOrExample?: string;
    highlight?: string;
  }[];
  quickQuiz: {
    question: string;
    answer: string;
    explanation: string;
  }[];
}

export const KNOWLEDGE_TOPICS: KnowledgeSection[] = [
  {
    id: 'method-skills',
    title: '1. Phương Pháp & Kĩ Năng Tìm Hiểu Tự Nhiên',
    subtitle: 'Quy trình nghiên cứu khoa học và các kĩ năng thực nghiệm cốt lõi',
    icon: 'FlaskConical',
    badge: 'KHTN Cơ Bản',
    color: 'emerald',
    summary: 'Phương pháp tìm hiểu tự nhiên là cách thức tìm hiểu các sự vật, hiện tượng trong thế giới tự nhiên và đời sống qua các bước có hệ thống.',
    keyPoints: [
      {
        title: 'Các bước trong phương pháp tìm hiểu tự nhiên (5 bước)',
        content: '1. Quan sát và đặt câu hỏi nghiên cứu\n2. Đề xuất giả thuyết\n3. Lập kế hoạch kiểm tra giả thuyết\n4. Thực hiện kế hoạch (làm thí nghiệm, thu thập số liệu)\n5. Viết báo cáo, thảo luận và kết luận.',
        highlight: 'Ghi nhớ thứ tự: Quan sát → Đặt câu hỏi → Giả thuyết → Lập kế hoạch → Thực hiện → Báo cáo'
      },
      {
        title: '4 Kĩ năng tiến trình khoa học quan trọng',
        content: '• Kĩ năng Quan sát: Thu nhận thông tin bằng các giác quan hoặc dụng cụ.\n• Kĩ năng Đo: Sử dụng dụng cụ đo (cân điện tử, nhiệt kế, ống đong, thước...) để xác định kích thước, khối lượng, thể tích, nhiệt độ chính xác.\n• Kĩ năng Dự báo: Đưa ra phán đoán về kết quả hoặc hiện tượng dựa trên dữ liệu/quan sát ban đầu.\n• Kĩ năng Phân loại: Sắp xếp các sự vật hiện tượng vào nhóm theo tiêu chí nhất định.\n• Kĩ năng Liên kết: Kết nối các thông tin, kiến thức để tìm ra quy luật.',
        formulaOrExample: 'Ví dụ: Đo khối lượng bằng cân điện tử → Kĩ năng đo; Dự đoán kết quả thí nghiệm → Kĩ năng dự báo.'
      }
    ],
    quickQuiz: [
      {
        question: 'Dùng ống đong để xác định 50 mL nước cất thuộc kĩ năng nào?',
        answer: 'Kĩ năng đo',
        explanation: 'Thao tác dùng dụng cụ đo để xác định thể tích chất lỏng là kĩ năng đo.'
      },
      {
        question: 'Bước "Bán sản phẩm ra thị trường" có thuộc phương pháp tìm hiểu tự nhiên không?',
        answer: 'Không',
        explanation: 'Bán sản phẩm thuộc hoạt động kinh doanh thương mại, không thuộc phương pháp nghiên cứu khoa học.'
      }
    ]
  },
  {
    id: 'atom-periodic-table',
    title: '2. Cấu Tạo Nguyên Tử & Bảng Tuần Hoàn',
    subtitle: 'Hạt nhân (p, n), vỏ electron, chu kỳ, nhóm và sự tạo thành ion',
    icon: 'Atom',
    badge: 'Trọng Tâm',
    color: 'indigo',
    summary: 'Nguyên tử là hạt vô cùng nhỏ bé và trung hòa về điện. Bảng tuần hoàn sắp xếp các nguyên tố theo chiều tăng dần của điện tích hạt nhân.',
    keyPoints: [
      {
        title: 'Cấu tạo hạt trong nguyên tử',
        content: '• Hạt nhân (ở tâm): gồm hạt Proton (p, mang điện tích dương +1) và hạt Neutron (n, không mang điện).\n• Vỏ nguyên tử: gồm các hạt Electron (e, mang điện tích âm -1) chuyển động xung quanh hạt nhân.\n• Trong nguyên tử trung hòa về điện: Số p = Số e = Số hiệu nguyên tử (Z).\n• Khối lượng nguyên tử (amu) xấp xỉ bằng (Số p + Số n) vì khối lượng electron rất nhỏ không đáng kể.',
        highlight: 'Số p = Số e = Z | Khối lượng ≈ p + n'
      },
      {
        title: 'Cấu trúc Bảng tuần hoàn các nguyên tố hóa học',
        content: '• Ô nguyên tố: Số hiệu nguyên tử (= Số p = Số e), Kí hiệu hóa học, Tên nguyên tố, Khối lượng nguyên tử.\n• Chu kỳ: Dãy các nguyên tố mà nguyên tử có CÙNG SỐ LỚP ELECTRON (Số thứ tự Chu kỳ = Số lớp e).\n• Nhóm A: Các nguyên tố có CÙNG SỐ ELECTRON LỚP NGOÀI CÙNG (Số thứ tự Nhóm A = Số e lớp ngoài cùng). Do đó có tính chất hóa học tương tự nhau.',
        formulaOrExample: 'Na (Z=11): Cấu hình [2, 8, 1] → 3 lớp e (Chu kỳ 3), 1e ngoài cùng (Nhóm IA - Kim loại kiềm).'
      },
      {
        title: 'Các nhóm nguyên tố đặc biệt & Sự tạo thành ion',
        content: '• Nhóm IA (trừ H): Kim loại kiềm (Li, Na, K...) - có 1e ngoài cùng, dễ nhường 1e thành ion dương (M → M⁺ + 1e).\n• Nhóm VIIA: Halogen (F, Cl, Br, I...) - có 7e ngoài cùng, dễ nhận 1e thành ion âm (X + 1e → X⁻).\n• Nhóm VIIIA: Khí hiếm (He, Ne, Ar...) - có lớp ngoài cùng bền vững (8e, riêng He có 2e), khó tham gia phản ứng hóa học.',
        highlight: 'Kim loại nhường e tạo Cation (+) | Phi kim nhận e tạo Anion (-)'
      }
    ],
    quickQuiz: [
      {
        question: 'Nguyên tử Magnesium (Mg, Z=12) có cấu hình e [2, 8, 2]. Khi tạo ion, Mg sẽ tạo thành ion nào?',
        answer: 'Mg²⁺',
        explanation: 'Mg là kim loại có 2e ngoài cùng, nhường 2e để đạt cấu hình bền vững 8e giống Ne, tạo ion dương Mg²⁺.'
      },
      {
        question: 'Vì sao các nguyên tố cùng nhóm A lại có tính chất hóa học tương tự nhau?',
        answer: 'Vì có cùng số electron ở lớp ngoài cùng',
        explanation: 'Số electron lớp ngoài cùng quyết định tính chất hóa học của nguyên tố.'
      }
    ]
  },
  {
    id: 'bonds-compounds',
    title: '3. Đơn Chất, Hợp Chất & Liên Kết Hóa Học',
    subtitle: 'Phân loại chất theo nguyên tố cấu tạo và 2 dạng liên kết hóa học cốt lõi',
    icon: 'Network',
    badge: 'Bản Chất',
    color: 'sky',
    summary: 'Chất được chia thành Đơn chất và Hợp chất. Các nguyên tử liên kết với nhau bằng cách góp chung electron hoặc hút tĩnh điện giữa các ion để đạt lớp vỏ bền vững.',
    keyPoints: [
      {
        title: 'Phân biệt Đơn chất và Hợp chất',
        content: '• Đơn chất: Chất được tạo nên từ DUY NHẤT 1 NGUYÊN TỐ hóa học.\n  - Đơn chất kim loại: Cu, Fe, Al, Na, Au, Ag...\n  - Đơn chất phi kim: O₂, N₂, H₂, Cl₂, C, S, P...\n• Hợp chất: Chất được tạo nên từ 2 HAY NHIỀU NGUYÊN TỐ hóa học khác nhau.\n  - Ví dụ: Nước (H₂O), Muối ăn (NaCl), Khí carbon dioxide (CO₂), Đá vôi (CaCO₃), Urea CO(NH₂)₂.',
        highlight: '1 nguyên tố = Đơn chất | Từ 2 nguyên tố trở lên = Hợp chất'
      },
      {
        title: 'Liên kết cộng hóa trị (Covalent Bond)',
        content: '• Bản chất: Hình thành do SỰ DÙNG CHUNG CÁC CẶP ELECTRON giữa các nguyên tử.\n• Thường gặp: Giữa các nguyên tử phi kim với nhau (H₂, O₂, N₂, H₂O, CO₂, CH₄, NH₃, HCl).\n• Khi hình thành liên kết cộng hóa trị, mỗi nguyên tử đạt cấu hình electron ngoài cùng bền vững của khí hiếm (8e hoặc 2e với H).',
        formulaOrExample: 'Phân tử N₂: 2 nguyên tử N góp chung 3 cặp electron (liên kết ba N≡N).'
      },
      {
        title: 'Liên kết ion (Ionic Bond)',
        content: '• Bản chất: Hình thành do LỰC HÚT TĨNH ĐIỆN giữa ion mang điện tích dương (cation kim loại) và ion mang điện tích âm (anion phi kim).\n• Thường gặp: Giữa kim loại điển hình và phi kim điển hình (NaCl, MgO, CaCl₂, K₂O).\n• Quá trình: Kim loại nhường e cho phi kim → Cả 2 thành ion trái dấu → Hút nhau bằng lực tĩnh điện.',
        formulaOrExample: 'Na nhường 1e cho Cl → Na⁺ và Cl⁻ hút nhau tạo mạng tinh thể muối ăn NaCl.'
      }
    ],
    quickQuiz: [
      {
        question: 'Chất nào trong các chất sau là hợp chất ion: O₂, H₂O, NaCl, N₂?',
        answer: 'NaCl (Muối ăn)',
        explanation: 'NaCl được tạo thành từ kim loại Na (tạo Na⁺) và phi kim Cl (tạo Cl⁻) nhờ liên kết ion.'
      },
      {
        question: 'Liên kết trong phân tử khí methane CH₄ là liên kết gì?',
        answer: 'Liên kết cộng hóa trị',
        explanation: 'C và H đều là phi kim, liên kết với nhau bằng cách góp chung các cặp electron.'
      }
    ]
  },
  {
    id: 'valency-mass',
    title: '4. Hóa Trị, Khối Lượng Phân Tử & Phần Trăm Khối Lượng',
    subtitle: 'Công thức toán hóa học: Quy tắc hóa trị, tính KLPT (amu) và % nguyên tố',
    icon: 'Calculator',
    badge: 'Tính Toán',
    color: 'amber',
    summary: 'Hóa trị là con số biểu thị khả năng liên kết của nguyên tử. Từ công thức hóa học có thể tính được khối lượng phân tử và tỉ lệ phần trăm các nguyên tố.',
    keyPoints: [
      {
        title: 'Quy tắc hóa trị trong hợp chất AxBy',
        content: 'Quy ước chuẩn: H luôn có hóa trị I, O luôn có hóa trị II.\n\nTrong hợp chất 2 nguyên tố AxBy (với A có hóa trị a, B có hóa trị b):\n→ Quy tắc hóa trị: a · x = b · y\n\nTừ đó suy ra hóa trị chưa biết hoặc lập công thức hóa học:\n• Tìm hóa trị a của A: a = (b · y) / x\n• Lập tỉ lệ chỉ số: x / y = b / a (rút gọn thành phân số tối giản).',
        formulaOrExample: 'Hợp chất P₂O₅: a · 2 = II · 5 ⇒ a = (2 × 5) / 2 = V (Phosphorus có hóa trị V).'
      },
      {
        title: 'Cách tính Khối lượng phân tử (KLPT - amu)',
        content: 'Khối lượng phân tử bằng TỔNG khối lượng của tất cả các nguyên tử có trong phân tử chất đó.\n\nCông thức với AxByCz:\nKLPT = (x × KLNT_A) + (y × KLNT_B) + (z × KLNT_C) (amu)',
        formulaOrExample: 'CaCO₃: KLPT = 40 × 1 + 12 × 1 + 16 × 3 = 40 + 12 + 48 = 100 amu.\nUrea CO(NH₂)₂: KLPT = 12 + 16 + (14 + 2) × 2 = 60 amu.'
      },
      {
        title: 'Tính phần trăm (%) khối lượng nguyên tố trong hợp chất',
        content: 'Công thức tính % khối lượng của nguyên tố A trong hợp chất AxBy:\n\n%A = [ (x × KLNT_A) / KLPT ] × 100%\n\nLưu ý: Tổng phần trăm tất cả các nguyên tố trong hợp chất luôn bằng 100%.',
        highlight: '%A = (Số ntử A × KLNT A / KLPT) × 100%'
      }
    ],
    quickQuiz: [
      {
        question: 'Tính % khối lượng của O trong phân tử nước H₂O (H=1, O=16)?',
        answer: '88.89%',
        explanation: 'KLPT H₂O = 1×2 + 16 = 18 amu. %O = (16 / 18) × 100% ≈ 88.89%.'
      },
      {
        question: 'Hóa trị của Fe trong hợp chất Fe₂O₃ là bao nhiêu?',
        answer: 'III',
        explanation: 'Theo quy tắc: a · 2 = II · 3 ⇒ a = (2 × 3) / 2 = III.'
      }
    ]
  }
];
