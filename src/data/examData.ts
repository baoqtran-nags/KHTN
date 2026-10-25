export interface MultipleChoiceQuestion {
  id: string;
  number: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  topic: string;
}

export interface TrueFalseStatement {
  subId: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  number: number;
  title: string;
  statements: TrueFalseStatement[];
  topic: string;
}

export interface ShortAnswerSubQuestion {
  subId: string;
  prompt: string;
  correctAnswers: string[]; // Variations of acceptable answers
  unit?: string;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  number: number;
  title: string;
  context?: string;
  subQuestions: ShortAnswerSubQuestion[];
  topic: string;
}

export interface EssaySubQuestion {
  subId: string;
  prompt: string;
  modelAnswer: string;
  maxScore: number;
  keywords: string[];
}

export interface EssayQuestion {
  id: string;
  number: number;
  title: string;
  context?: string;
  subQuestions: EssaySubQuestion[];
  totalScore: number;
  topic: string;
}

export interface ExamSet {
  id: string;
  code: string;
  title: string;
  description: string;
  durationMinutes: number;
  part1: MultipleChoiceQuestion[];
  part2: TrueFalseQuestion;
  part3: ShortAnswerQuestion[];
  part4: EssayQuestion[];
}

export const EXAM_SETS: ExamSet[] = [
  // ==========================================
  // ĐỀ 1
  // ==========================================
  {
    id: 'de-1',
    code: 'ĐỀ 01',
    title: 'Bộ Đề Kiểm Tra Ôn Tập Số 1',
    description: 'Bao quát Phương pháp nghiên cứu, Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học & CaCO₃',
    durationMinutes: 45,
    part1: [
      {
        id: 'd1-c1',
        number: 1,
        question: 'Kĩ năng nào sau đây giúp đưa ra dự đoán về kết quả nghiên cứu dựa trên các quan sát ban đầu?',
        options: [
          { key: 'A', text: 'Kĩ năng đo.' },
          { key: 'B', text: 'Kĩ năng dự báo.' },
          { key: 'C', text: 'Kĩ năng phân loại.' },
          { key: 'D', text: 'Kĩ năng liên kết.' },
        ],
        correctAnswer: 'B',
        explanation: 'Kĩ năng dự báo là kĩ năng đưa ra các nhận định, dự đoán sơ bộ về bản chất hoặc kết quả hiện tượng dựa trên những quan sát, dữ liệu ban đầu.',
        topic: 'Phương pháp & kĩ năng tìm hiểu tự nhiên'
      },
      {
        id: 'd1-c2',
        number: 2,
        question: 'Trong hạt nhân nguyên tử, những loại hạt nào mang điện tích dương?',
        options: [
          { key: 'A', text: 'Proton.' },
          { key: 'B', text: 'Neutron.' },
          { key: 'C', text: 'Electron.' },
          { key: 'D', text: 'Proton và neutron.' },
        ],
        correctAnswer: 'A',
        explanation: 'Hạt nhân gồm Proton (mang điện tích dương +) và Neutron (không mang điện). Lớp vỏ chứa Electron (mang điện tích âm -).',
        topic: 'Cấu tạo nguyên tử'
      },
      {
        id: 'd1-c3',
        number: 3,
        question: 'Các nguyên tố trong cùng một Chu kỳ của Bảng tuần hoàn có đặc điểm nào chung?',
        options: [
          { key: 'A', text: 'Có cùng số electron ở lớp ngoài cùng.' },
          { key: 'B', text: 'Có cùng số lớp electron.' },
          { key: 'C', text: 'Có cùng tính chất hóa học.' },
          { key: 'D', text: 'Có cùng khối lượng nguyên tử.' },
        ],
        correctAnswer: 'B',
        explanation: 'Số thứ tự Chu kỳ = Số lớp electron trong vỏ nguyên tử. Do đó các nguyên tố cùng chu kỳ có cùng số lớp electron.',
        topic: 'Bảng tuần hoàn'
      },
      {
        id: 'd1-c4',
        number: 4,
        question: 'Tên gọi của các nguyên tố thuộc Nhóm VIIA trong Bảng tuần hoàn là gì?',
        options: [
          { key: 'A', text: 'Nhóm kim loại kiềm.' },
          { key: 'B', text: 'Nhóm kim loại kiềm thổ.' },
          { key: 'C', text: 'Nhóm halogen.' },
          { key: 'D', text: 'Nhóm khí hiếm.' },
        ],
        correctAnswer: 'C',
        explanation: 'Nhóm IA: Kim loại kiềm; Nhóm IIA: Kim loại kiềm thổ; Nhóm VIIA: Halogen (F, Cl, Br, I); Nhóm VIIIA: Khí hiếm.',
        topic: 'Bảng tuần hoàn'
      },
      {
        id: 'd1-c5',
        number: 5,
        question: 'Chất nào sau đây là hợp chất?',
        options: [
          { key: 'A', text: 'Khí oxygen (O₂).' },
          { key: 'B', text: 'Kim loại Iron (Fe).' },
          { key: 'C', text: 'Water (H₂O).' },
          { key: 'D', text: 'Khí nitrogen (N₂).' },
        ],
        correctAnswer: 'C',
        explanation: 'Hợp chất được tạo từ 2 nguyên tố hóa học trở lên. Nước (H₂O) được tạo từ 2 nguyên tố là H và O. O₂, Fe, N₂ là các đơn chất.',
        topic: 'Đơn chất và Hợp chất'
      },
      {
        id: 'd1-c6',
        number: 6,
        question: 'Nguyên tử Fluorine (F) nhận thêm 1 electron sẽ tạo thành ion nào?',
        options: [
          { key: 'A', text: 'F⁺' },
          { key: 'B', text: 'F⁻' },
          { key: 'C', text: 'F²⁻' },
          { key: 'D', text: 'F²⁺' },
        ],
        correctAnswer: 'B',
        explanation: 'Electron mang điện tích âm (-). Khi nguyên tử phi kim F nhận thêm 1 electron thì số hạt âm nhiều hơn số hạt dương 1 đơn vị, tạo ion âm F⁻ (anion fluorua).',
        topic: 'Sự hình thành ion'
      }
    ],
    part2: {
      id: 'd1-c7',
      number: 7,
      title: 'Xét các phát biểu về liên kết hóa học và bảng tuần hoàn:',
      topic: 'Liên kết hóa học & Bảng tuần hoàn',
      statements: [
        {
          subId: 'a',
          text: 'Khí hiếm (nhóm VIIIA) có lớp electron ngoài cùng bền vững (8 electron, trừ He có 2 electron).',
          isCorrect: true,
          explanation: 'Đúng. Khí hiếm nhóm VIIIA có lớp electron ngoài cùng bão hòa rất bền vững (8e, riêng Helium He có 2e ở lớp 1).'
        },
        {
          subId: 'b',
          text: 'Liên kết ion được hình thành do sự góp chung các cặp electron giữa các nguyên tố phi kim.',
          isCorrect: false,
          explanation: 'Sai. Đây là định nghĩa của liên kết cộng hóa trị. Liên kết ion được hình thành do lực hút tĩnh điện giữa ion dương và ion âm (thường giữa kim loại và phi kim).'
        },
        {
          subId: 'c',
          text: 'Đơn chất được tạo thành từ 2 nguyên tố hóa học trở lên.',
          isCorrect: false,
          explanation: 'Sai. Đơn chất được tạo nên từ 1 nguyên tố hóa học duy nhất (VD: Cu, O₂, N₂). Tạo từ 2 nguyên tố trở lên là hợp chất.'
        },
        {
          subId: 'd',
          text: 'Trong một chu kỳ, các nguyên tố được xếp theo chiều tăng dần của số hiệu nguyên tử.',
          isCorrect: true,
          explanation: 'Đúng. Toàn bộ bảng tuần hoàn được sắp xếp theo chiều tăng dần của điện tích hạt nhân (số hiệu nguyên tử Z).'
        }
      ]
    },
    part3: [
      {
        id: 'd1-c8',
        number: 8,
        title: 'Hoàn thành thông tin cho nguyên tử Magnesium (Mg):',
        context: 'Biết Magnesium (Mg) có số neutron = 12, số e = 12.',
        topic: 'Cấu tạo nguyên tử Mg',
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Số proton trong hạt nhân của Mg là bao nhiêu?',
            correctAnswers: ['12', '12 hạt'],
            explanation: 'Trong nguyên tử trung hòa về điện: Số proton (p) = Số electron (e) = 12.'
          },
          {
            subId: 'b',
            prompt: 'Tổng số hạt (p, n, e) trong nguyên tử Mg là bao nhiêu?',
            correctAnswers: ['36', '36 hạt'],
            explanation: 'Tổng số hạt = p + n + e = 12 + 12 + 12 = 36 hạt.'
          },
          {
            subId: 'c',
            prompt: 'Khối lượng nguyên tử của Mg (amu) xấp xỉ bằng bao nhiêu?',
            correctAnswers: ['24', '24 amu'],
            unit: 'amu',
            explanation: 'Khối lượng nguyên tử xấp xỉ tổng khối lượng (p + n) = 12 + 12 = 24 amu.'
          }
        ]
      },
      {
        id: 'd1-c9',
        number: 9,
        title: 'Xác định hóa trị của các nguyên tố sau (chọn O hóa trị II, H hóa trị I làm chuẩn):',
        topic: 'Quy tắc hóa trị',
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Hóa trị x của C trong CO₂?',
            correctAnswers: ['IV', '4', 'iv'],
            explanation: 'Theo quy tắc hóa trị: x · 1 = II · 2 ⇒ x = IV.'
          },
          {
            subId: 'b',
            prompt: 'Hóa trị x của P trong P₂O₅?',
            correctAnswers: ['V', '5', 'v'],
            explanation: 'Theo quy tắc hóa trị: x · 2 = II · 5 ⇒ x = (2 × 5) / 2 = V.'
          },
          {
            subId: 'c',
            prompt: 'Hóa trị y của S trong H₂S?',
            correctAnswers: ['II', '2', 'ii'],
            explanation: 'Theo quy tắc hóa trị: I · 2 = y · 1 ⇒ y = II.'
          }
        ]
      }
    ],
    part4: [
      {
        id: 'd1-c10',
        number: 10,
        title: 'Phân tích nguyên tử Sodium (Na):',
        context: 'Nguyên tử Sodium (Na) có điện tích hạt nhân +11. Cấu trúc electron: lớp 1 có 2e, lớp 2 có 8e, lớp 3 có 1e.',
        topic: 'Vị trí và tính chất nguyên tố Na',
        totalScore: 1.5,
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Xác định vị trí (Chu kỳ, Nhóm) của Na trong Bảng tuần hoàn và giải thích.',
            modelAnswer: '- Chu kỳ 3: vì nguyên tử Na có 3 lớp electron.\n- Nhóm IA: vì nguyên tử Na có 1 electron ở lớp ngoài cùng (nguyên tố nhóm A).',
            maxScore: 0.75,
            keywords: ['chu kỳ 3', '3 lớp', 'nhóm IA', '1 electron ngoài cùng']
          },
          {
            subId: 'b',
            prompt: 'Na là kim loại, phi kim hay khí hiếm? Giải thích vì sao.',
            modelAnswer: '- Na là kim loại.\n- Giải thích: Vì Na có 1 electron ở lớp ngoài cùng (thường các nguyên tử có 1, 2, 3 electron ở lớp ngoài cùng là nguyên tử kim loại, có xu hướng nhường 1e để tạo thành ion Na⁺).',
            maxScore: 0.75,
            keywords: ['kim loại', '1 electron', 'lớp ngoài cùng', 'nhường']
          }
        ]
      },
      {
        id: 'd1-c11',
        number: 11,
        title: 'Tính toán hợp chất Calcium carbonate (CaCO₃):',
        context: 'Cho hợp chất Calcium carbonate (CaCO₃). Biết Ca = 40 amu, C = 12 amu, O = 16 amu.',
        topic: 'Khối lượng phân tử & Phần trăm khối lượng',
        totalScore: 1.5,
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Tính khối lượng phân tử (KLPT) của CaCO₃.',
            modelAnswer: 'Khối lượng phân tử CaCO₃ = 40 × 1 + 12 × 1 + 16 × 3 = 40 + 12 + 48 = 100 (amu).',
            maxScore: 0.75,
            keywords: ['100', 'amu', '40 + 12 + 48']
          },
          {
            subId: 'b',
            prompt: 'Tính thành phần phần trăm (%) về khối lượng của nguyên tố Calcium (Ca) trong CaCO₃.',
            modelAnswer: 'Thành phần % về khối lượng của Ca:\n%Ca = (40 × 1 / 100) × 100% = 40%.',
            maxScore: 0.75,
            keywords: ['40%', '40']
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ 2
  // ==========================================
  {
    id: 'de-2',
    code: 'ĐỀ 02',
    title: 'Bộ Đề Kiểm Tra Ôn Tập Số 2',
    description: 'Bao quát Kĩ năng đo, Cấu tạo hạt nhân, Nhóm IA, Kí hiệu 3H₂O, Ion Mg²⁺, Phân bón Urea',
    durationMinutes: 45,
    part1: [
      {
        id: 'd2-c1',
        number: 1,
        question: 'Thao tác "Đo khối lượng vật bằng cân điện tử và ghi kết quả" thuộc kĩ năng nào?',
        options: [
          { key: 'A', text: 'Kĩ năng liên kết.' },
          { key: 'B', text: 'Kĩ năng phân loại.' },
          { key: 'C', text: 'Kĩ năng đo.' },
          { key: 'D', text: 'Kĩ năng lập kế hoạch.' },
        ],
        correctAnswer: 'C',
        explanation: 'Sử dụng dụng cụ đo (cân điện tử, nhiệt kế, ống đong, thước...) để xác định đại lượng vật lý là thao tác của kĩ năng đo.',
        topic: 'Kĩ năng tìm hiểu tự nhiên'
      },
      {
        id: 'd2-c2',
        number: 2,
        question: 'Khối lượng nguyên tử tập trung chủ yếu ở bộ phận nào?',
        options: [
          { key: 'A', text: 'Lớp vỏ electron.' },
          { key: 'B', text: 'Hạt nhân nguyên tử.' },
          { key: 'C', text: 'Electron lớp ngoài cùng.' },
          { key: 'D', text: 'Phân bố đều.' },
        ],
        correctAnswer: 'B',
        explanation: 'Khối lượng electron rất nhỏ bé không đáng kể so với proton và neutron (khoảng 1/1836 lần), do đó khối lượng nguyên tử tập trung hầu như toàn bộ ở hạt nhân.',
        topic: 'Cấu tạo nguyên tử'
      },
      {
        id: 'd2-c3',
        number: 3,
        question: 'Số thứ tự Nhóm A trong Bảng tuần hoàn cho biết thông tin gì?',
        options: [
          { key: 'A', text: 'Số lớp electron.' },
          { key: 'B', text: 'Số hiệu nguyên tử.' },
          { key: 'C', text: 'Số electron lớp ngoài cùng.' },
          { key: 'D', text: 'Tổng số hạt.' },
        ],
        correctAnswer: 'C',
        explanation: 'Với các nhóm A: Số thứ tự nhóm = Số electron ở lớp ngoài cùng của nguyên tử nguyên tố đó.',
        topic: 'Bảng tuần hoàn'
      },
      {
        id: 'd2-c4',
        number: 4,
        question: 'Nhóm IA trong Bảng tuần hoàn gồm các nguyên tố nào?',
        options: [
          { key: 'A', text: 'Kim loại kiềm.' },
          { key: 'B', text: 'Kim loại kiềm thổ.' },
          { key: 'C', text: 'Khí hiếm.' },
          { key: 'D', text: 'Phi kim Halogen.' },
        ],
        correctAnswer: 'A',
        explanation: 'Các nguyên tố thuộc nhóm IA (trừ H) là các kim loại kiềm (Li, Na, K,...). Nhóm IIA là kim loại kiềm thổ, VIIA là halogen, VIIIA là khí hiếm.',
        topic: 'Bảng tuần hoàn'
      },
      {
        id: 'd2-c5',
        number: 5,
        question: 'Cách biểu diễn 3H₂O có nghĩa là gì?',
        options: [
          { key: 'A', text: '3 nguyên tử H và 3 nguyên tử O.' },
          { key: 'B', text: '3 phân tử nước (H₂O).' },
          { key: 'C', text: '6 nguyên tử nước.' },
          { key: 'D', text: '3 đơn chất nước.' },
        ],
        correctAnswer: 'B',
        explanation: 'Chữ số đặt đằng trước công thức hóa học là hệ số biểu diễn số lượng phân tử. Do đó 3H₂O biểu diễn 3 phân tử nước.',
        topic: 'Công thức hóa học'
      },
      {
        id: 'd2-c6',
        number: 6,
        question: 'Nguyên tử Magnesium (Mg) nhường 2 electron sẽ tạo thành ion nào?',
        options: [
          { key: 'A', text: 'Mg²⁻' },
          { key: 'B', text: 'Mg⁺' },
          { key: 'C', text: 'Mg²⁺' },
          { key: 'D', text: 'Mg⁻' },
        ],
        correctAnswer: 'C',
        explanation: 'Khi nguyên tử kim loại nhường electron mang điện âm, số hạt proton (+) nhiều hơn số electron (-) đúng bằng số e đã nhường, tạo thành ion dương cation Mg²⁺.',
        topic: 'Sự tạo thành ion'
      }
    ],
    part2: {
      id: 'd2-c7',
      number: 7,
      title: 'Xét các phát biểu sau:',
      topic: 'Bảng tuần hoàn & Liên kết',
      statements: [
        {
          subId: 'a',
          text: 'Các nguyên tố cùng nhóm A có tính chất hóa học tương tự nhau.',
          isCorrect: true,
          explanation: 'Đúng. Do có cùng số electron ở lớp ngoài cùng nên các nguyên tố cùng nhóm A có tính chất hóa học tương tự nhau.'
        },
        {
          subId: 'b',
          text: 'Hợp chất Sodium chloride (NaCl) được tạo bởi liên kết cộng hóa trị.',
          isCorrect: false,
          explanation: 'Sai. NaCl được tạo bởi liên kết ion giữa ion Na⁺ (kim loại) và ion Cl⁻ (phi kim) nhờ lực hút tĩnh điện.'
        },
        {
          subId: 'c',
          text: 'Trong phân tử CH₄ (Methane), các nguyên tử C và H liên kết bằng cách góp chung electron.',
          isCorrect: true,
          explanation: 'Đúng. C và H đều là phi kim, liên kết với nhau bằng liên kết cộng hóa trị (góp chung các cặp electron).'
        },
        {
          subId: 'd',
          text: 'Kí hiệu hóa học của nguyên tố luôn gồm 2 chữ cái.',
          isCorrect: false,
          explanation: 'Sai. Có nhiều nguyên tố kí hiệu chỉ gồm 1 chữ cái in hoa (ví dụ: H, C, N, O, P, S, K, F).'
        }
      ]
    },
    part3: [
      {
        id: 'd2-c8',
        number: 8,
        title: 'Hoàn thành thông tin cho Chlorine (Cl):',
        context: 'Biết Chlorine có số proton = 17, số neutron = 18.',
        topic: 'Cấu tạo nguyên tử Chlorine',
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Số electron trong vỏ nguyên tử của Cl là bao nhiêu?',
            correctAnswers: ['17', '17 hạt'],
            explanation: 'Trong nguyên tử: Số e = Số p = 17.'
          },
          {
            subId: 'b',
            prompt: 'Tổng số hạt (p, n, e) trong nguyên tử Cl là bao nhiêu?',
            correctAnswers: ['52', '52 hạt'],
            explanation: 'Tổng số hạt = 17 (p) + 18 (n) + 17 (e) = 52 hạt.'
          },
          {
            subId: 'c',
            prompt: 'Khối lượng nguyên tử của Cl xấp xỉ bằng bao nhiêu amu (lấy theo p + n)?',
            correctAnswers: ['35', '35 amu', '35.5'],
            unit: 'amu',
            explanation: 'Khối lượng nguyên tử = p + n = 17 + 18 = 35 amu (thực tế trung bình đồng vị là 35.5 amu).'
          }
        ]
      },
      {
        id: 'd2-c9',
        number: 9,
        title: 'Xác định hóa trị trong các hợp chất:',
        context: 'Biết O có hóa trị II, Cl có hóa trị I.',
        topic: 'Quy tắc hóa trị Fe₂O₃ và AlCl₃',
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Hóa trị của Fe trong hợp chất Fe₂O₃ là bao nhiêu?',
            correctAnswers: ['III', '3', 'iii'],
            explanation: 'Gọi hóa trị của Fe là a: a · 2 = II · 3 ⇒ a = (2 × 3) / 2 = III.'
          },
          {
            subId: 'b',
            prompt: 'Hóa trị của Al trong hợp chất AlCl₃ là bao nhiêu?',
            correctAnswers: ['III', '3', 'iii'],
            explanation: 'Gọi hóa trị của Al là b: b · 1 = I · 3 ⇒ b = III.'
          }
        ]
      }
    ],
    part4: [
      {
        id: 'd2-c10',
        number: 10,
        title: 'Phân tích bản chất liên kết và phân loại chất:',
        topic: 'Đơn chất, Hợp chất & Kiểu liên kết',
        totalScore: 1.5,
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Khí Nitrogen (N₂) gồm 2 nguyên tử N liên kết bằng cách góp chung electron. N₂ là đơn chất hay hợp chất? Loại liên kết gì?',
            modelAnswer: '- N₂ là đơn chất vì chỉ được tạo thành từ 1 nguyên tố hóa học là Nitrogen.\n- Loại liên kết trong phân tử N₂ là liên kết cộng hóa trị vì được hình thành do sự góp chung các cặp electron giữa các nguyên tử phi kim.',
            maxScore: 0.75,
            keywords: ['đơn chất', '1 nguyên tố', 'liên kết cộng hóa trị', 'góp chung']
          },
          {
            subId: 'b',
            prompt: 'Phân tử Muối ăn (NaCl) gồm 1 nguyên tử Na và 1 nguyên tử Cl. NaCl là đơn chất hay hợp chất? Giải thích.',
            modelAnswer: '- NaCl là hợp chất.\n- Giải thích: Vì phân tử NaCl được tạo thành từ 2 nguyên tố hóa học khác nhau là Sodium (Na) và Chlorine (Cl).',
            maxScore: 0.75,
            keywords: ['hợp chất', '2 nguyên tố', 'Sodium', 'Chlorine']
          }
        ]
      },
      {
        id: 'd2-c11',
        number: 11,
        title: 'Tính toán thành phần phân bón Urea CO(NH₂)₂:',
        context: 'Cho C = 12 amu, O = 16 amu, N = 14 amu, H = 1 amu.',
        topic: 'Khối lượng phân tử & % khối lượng của Urea',
        totalScore: 1.5,
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Tính khối lượng phân tử Urea CO(NH₂)₂.',
            modelAnswer: 'Khối lượng phân tử CO(NH₂)₂ = 12 × 1 + 16 × 1 + (14 × 1 + 1 × 2) × 2 = 12 + 16 + 16 × 2 = 60 (amu).',
            maxScore: 0.75,
            keywords: ['60', 'amu', '12 + 16 + 32']
          },
          {
            subId: 'b',
            prompt: 'Tính % khối lượng của nguyên tố Nitrogen (N) trong phân tử Urea.',
            modelAnswer: 'Trong 1 phân tử Urea có 2 nguyên tử N (khối lượng = 14 × 2 = 28 amu).\n%N = (28 / 60) × 100% ≈ 46.67% (hoặc 46.7%).',
            maxScore: 0.75,
            keywords: ['46.67%', '46.7%', '28/60', '46.6']
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ 3
  // ==========================================
  {
    id: 'de-3',
    code: 'ĐỀ 03',
    title: 'Bộ Đề Kiểm Tra Ôn Tập Số 3',
    description: 'Bao quát Phương pháp KHTN, Vỏ nguyên tử, Quy tắc hóa trị, Cấu hình Argon & Khí Methane CH₄',
    durationMinutes: 45,
    part1: [
      {
        id: 'd3-c1',
        number: 1,
        question: 'Bước nào KHÔNG nằm trong phương pháp tìm hiểu tự nhiên?',
        options: [
          { key: 'A', text: 'Quan sát và đặt câu hỏi.' },
          { key: 'B', text: 'Bán sản phẩm ra thị trường.' },
          { key: 'C', text: 'Lập kế hoạch kiểm tra.' },
          { key: 'D', text: 'Thực hiện kế hoạch.' },
        ],
        correctAnswer: 'B',
        explanation: 'Phương pháp tìm hiểu tự nhiên gồm: 1. Quan sát và đặt câu hỏi; 2. Đề xuất giả thuyết; 3. Lập kế hoạch kiểm tra; 4. Thực hiện kế hoạch; 5. Viết báo cáo và thảo luận. "Bán sản phẩm ra thị trường" thuộc hoạt động thương mại.',
        topic: 'Phương pháp tìm hiểu tự nhiên'
      },
      {
        id: 'd3-c2',
        number: 2,
        question: 'Vỏ nguyên tử được cấu tạo bởi hạt nào?',
        options: [
          { key: 'A', text: 'Proton.' },
          { key: 'B', text: 'Neutron.' },
          { key: 'C', text: 'Electron.' },
          { key: 'D', text: 'Proton và electron.' },
        ],
        correctAnswer: 'C',
        explanation: 'Vỏ nguyên tử chỉ gồm các hạt electron chuyển động xung quanh hạt nhân mang điện âm (-).',
        topic: 'Cấu tạo nguyên tử'
      },
      {
        id: 'd3-c3',
        number: 3,
        question: 'Vị trí nguyên tố trong Bảng tuần hoàn KHÔNG cho biết trực tiếp thông tin nào?',
        options: [
          { key: 'A', text: 'Số hiệu nguyên tử.' },
          { key: 'B', text: 'Số lớp electron.' },
          { key: 'C', text: 'Trạng thái rắn/lỏng/khí ở điều kiện thường.' },
          { key: 'D', text: 'Số e lớp ngoài cùng.' },
        ],
        correctAnswer: 'C',
        explanation: 'Số ô = Số hiệu nguyên tử (Z); Chu kỳ = Số lớp e; Nhóm A = Số e lớp ngoài cùng. Trạng thái rắn/lỏng/khí không suy ra trực tiếp từ vị trí tọa độ ô, chu kỳ, nhóm.',
        topic: 'Bảng tuần hoàn'
      },
      {
        id: 'd3-c4',
        number: 4,
        question: 'Chất nào sau đây là đơn chất kim loại?',
        options: [
          { key: 'A', text: 'Copper (Cu).' },
          { key: 'B', text: 'Oxygen (O₂).' },
          { key: 'C', text: 'Carbon dioxide (CO₂).' },
          { key: 'D', text: 'Water (H₂O).' },
        ],
        correctAnswer: 'A',
        explanation: 'Copper (Cu - đồng) là đơn chất kim loại. O₂ là đơn chất phi kim. CO₂ và H₂O là các hợp chất.',
        topic: 'Đơn chất kim loại & phi kim'
      },
      {
        id: 'd3-c5',
        number: 5,
        question: 'Quy tắc hóa trị cho công thức AxBy (A hóa trị a, B hóa trị b) là:',
        options: [
          { key: 'A', text: 'x · y = a · b' },
          { key: 'B', text: 'x · a = y · b' },
          { key: 'C', text: 'x + a = y + b' },
          { key: 'D', text: 'a · b = x + y' },
        ],
        correctAnswer: 'B',
        explanation: 'Theo quy tắc hóa trị: Trong hợp chất 2 nguyên tố AxBy, tích của chỉ số và hóa trị của nguyên tố này bằng tích của chỉ số và hóa trị của nguyên tố kia (x · a = y · b).',
        topic: 'Quy tắc hóa trị'
      },
      {
        id: 'd3-c6',
        number: 6,
        question: 'Nguyên tử Oxygen (O, Z=8) có bao nhiêu electron ở lớp ngoài cùng?',
        options: [
          { key: 'A', text: '2' },
          { key: 'B', text: '4' },
          { key: 'C', text: '6' },
          { key: 'D', text: '8' },
        ],
        correctAnswer: 'C',
        explanation: 'Z = 8 nên có 8 electron, phân bố: lớp 1 có 2 electron, lớp 2 (ngoài cùng) có 8 - 2 = 6 electron (thuộc nhóm VIA).',
        topic: 'Cấu hình electron'
      }
    ],
    part2: {
      id: 'd3-c7',
      number: 7,
      title: 'Đánh giá tính đúng / sai của các phát biểu sau:',
      topic: 'Kiến thức tổng hợp',
      statements: [
        {
          subId: 'a',
          text: 'Khối lượng phân tử bằng tổng khối lượng của các nguyên tử trong phân tử.',
          isCorrect: true,
          explanation: 'Đúng. KLPT là tổng khối lượng của tất cả các nguyên tử tạo nên phân tử, tính theo đơn vị amu.'
        },
        {
          subId: 'b',
          text: 'Trong nguyên tử, số hạt Proton luôn bằng số hạt Electron.',
          isCorrect: true,
          explanation: 'Đúng. Nguyên tử luôn trung hòa về điện, do đó số hạt mang điện dương (p) luôn bằng số hạt mang điện âm (e).'
        },
        {
          subId: 'c',
          text: 'Hóa trị của H luôn được chọn làm 2 đơn vị.',
          isCorrect: false,
          explanation: 'Sai. Người ta quy ước chọn hóa trị của H là I (1 đơn vị), và hóa trị của O là II (2 đơn vị) làm chuẩn.'
        },
        {
          subId: 'd',
          text: 'Hợp chất được tạo thành từ duy nhất 1 loại nguyên tố hóa học.',
          isCorrect: false,
          explanation: 'Sai. Chất tạo từ duy nhất 1 loại nguyên tố là đơn chất. Hợp chất được tạo từ 2 hay nhiều nguyên tố hóa học.'
        }
      ]
    },
    part3: [
      {
        id: 'd3-c8',
        number: 8,
        title: 'Hoàn thành thông tin cho Aluminium (Nhôm - Al):',
        context: 'Biết Al có số proton = 13, số neutron = 14.',
        topic: 'Cấu tạo nguyên tử Aluminium',
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Số electron trong vỏ nguyên tử của Al là bao nhiêu?',
            correctAnswers: ['13', '13 hạt'],
            explanation: 'Số e = Số p = 13.'
          },
          {
            subId: 'b',
            prompt: 'Tổng số hạt (p, n, e) trong nguyên tử Al là bao nhiêu?',
            correctAnswers: ['40', '40 hạt'],
            explanation: 'Tổng số hạt = 13 (p) + 14 (n) + 13 (e) = 40 hạt.'
          },
          {
            subId: 'c',
            prompt: 'Khối lượng nguyên tử (KLNT) của Al xấp xỉ bao nhiêu amu?',
            correctAnswers: ['27', '27 amu'],
            unit: 'amu',
            explanation: 'KLNT ≈ p + n = 13 + 14 = 27 amu.'
          },
          {
            subId: 'd',
            prompt: 'Kí hiệu hóa học của nguyên tố Aluminium là gì?',
            correctAnswers: ['Al', 'al'],
            explanation: 'Kí hiệu hóa học của Aluminium là Al.'
          }
        ]
      },
      {
        id: 'd3-c9',
        number: 9,
        title: 'Xác định hóa trị của Carbon (C) trong các hợp chất sau:',
        topic: 'Hóa trị của Carbon',
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Hóa trị của C trong phân tử CO (biết O hóa trị II)?',
            correctAnswers: ['II', '2', 'ii'],
            explanation: 'Theo quy tắc: a · 1 = II · 1 ⇒ a = II.'
          },
          {
            subId: 'b',
            prompt: 'Hóa trị của C trong phân tử CH₄ (biết H hóa trị I)?',
            correctAnswers: ['IV', '4', 'iv'],
            explanation: 'Theo quy tắc: a · 1 = I · 4 ⇒ a = IV.'
          }
        ]
      }
    ],
    part4: [
      {
        id: 'd3-c10',
        number: 10,
        title: 'Phân tích nguyên tử Argon (Ar):',
        context: 'Nguyên tử Argon (Ar) có điện tích hạt nhân +18, các electron phân bố 3 lớp: lớp 1 (2e), lớp 2 (8e), lớp 3 (8e).',
        topic: 'Vị trí và tính chất của Argon',
        totalScore: 1.5,
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Xác định vị trí (Chu kỳ, Nhóm) của Argon trong Bảng tuần hoàn.',
            modelAnswer: '- Chu kỳ 3: vì nguyên tử Ar có 3 lớp electron.\n- Nhóm VIIIA: vì Ar có 8 electron ở lớp ngoài cùng.',
            maxScore: 0.75,
            keywords: ['chu kỳ 3', '3 lớp', 'nhóm VIIIA', '8 electron ngoài cùng']
          },
          {
            subId: 'b',
            prompt: 'Argon là Kim loại, Phi kim hay Khí hiếm? Giải thích vì sao.',
            modelAnswer: '- Argon là khí hiếm.\n- Giải thích: Vì nguyên tử Argon có 8 electron ở lớp ngoài cùng, đây là cấu hình electron bền vững đặc trưng của các nguyên tố khí hiếm (rất khó tham gia phản ứng hóa học).',
            maxScore: 0.75,
            keywords: ['khí hiếm', '8 electron', 'lớp ngoài cùng', 'bền vững']
          }
        ]
      },
      {
        id: 'd3-c11',
        number: 11,
        title: 'Tính toán hợp chất Khí Methane (CH₄):',
        context: 'Khí Methane có công thức hóa học là CH₄. (Cho C = 12 amu, H = 1 amu).',
        topic: 'Khối lượng phân tử & % khối lượng của CH₄',
        totalScore: 1.5,
        subQuestions: [
          {
            subId: 'a',
            prompt: 'Tính khối lượng phân tử (KLPT) của CH₄.',
            modelAnswer: 'Khối lượng phân tử CH₄ = 12 × 1 + 1 × 4 = 12 + 4 = 16 (amu).',
            maxScore: 0.75,
            keywords: ['16', 'amu', '12 + 4']
          },
          {
            subId: 'b',
            prompt: 'Tính thành phần phần trăm (%) về khối lượng của C và H trong phân tử CH₄.',
            modelAnswer: '- %C = (12 × 1 / 16) × 100% = 75%.\n- %H = (1 × 4 / 16) × 100% = 25% (hoặc %H = 100% - 75% = 25%).',
            maxScore: 0.75,
            keywords: ['75%', '25%']
          }
        ]
      }
    ]
  }
];
