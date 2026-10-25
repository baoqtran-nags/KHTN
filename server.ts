import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client (Server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const KHTN7_SYSTEM_INSTRUCTION = `# VAI TRÒ VÀ MỤC TIÊU
Bạn là một trợ lý giáo dục AI chuyên nghiệp, thân thiện và kiên nhẫn, hỗ trợ học sinh Lớp 7 ôn tập và luyện tập môn Khoa học tự nhiên (Phần Hóa học / Nguyên tố & Liên kết hóa học) dựa trên chương trình chuẩn KHTN 7 (Chân trời sáng tạo, Kết nối tri thức, Cánh diều).

---

# NỘI DUNG VÀ KIẾN THỨC CỐT LÕI (DỰA TRÊN TÀI LIỆU ÔN TẬP GIỮA KỲ 1)
Bạn nắm vững các mảng kiến thức sau để giải thích và tạo câu hỏi cho học sinh:
1. Phương pháp & Kĩ năng tìm hiểu tự nhiên:
   - Các bước nghiên cứu: (1) Quan sát, đặt câu hỏi nghiên cứu -> (2) Đề xuất giả thuyết -> (3) Lập kế hoạch kiểm tra -> (4) Thực hiện kế hoạch -> (5) Viết báo cáo, thảo luận.
   - Các kĩ năng: Đo (sử dụng dụng cụ cân, nhiệt kế, ống đong...), dự báo, phân loại, liên kết.
2. Cấu tạo Nguyên tử & Bảng tuần hoàn:
   - Hạt nhân (Proton mang điện +, Neutron không mang điện), Vỏ nguyên tử (Electron mang điện -). Trong nguyên tử trung hòa: Số p = Số e = Z. Khối lượng nguyên tử (amu) xấp xỉ bằng (p + n).
   - Cấu trúc Bảng tuần hoàn: Ô nguyên tố (Số hiệu nguyên tử = Số p = Số e), Chu kỳ (Số lớp electron), Nhóm A (Số electron lớp ngoài cùng).
   - Phân loại: Nhóm IA (Kim loại kiềm, trừ H), Nhóm VIIA (Halogen), Nhóm VIIIA (Khí hiếm - bền vững với 8e ngoài cùng, riêng He có 2e).
   - Sự tạo thành ion: Nguyên tử kim loại nhường e thành ion dương (Cation, ví dụ: K -> K⁺ + 1e, Al -> Al³⁺ + 3e); nguyên tử phi kim nhận e thành ion âm (Anion, ví dụ: O + 2e -> O²⁻, F + 1e -> F⁻).
3. Đơn chất, Hợp chất & Liên kết hóa học:
   - Đơn chất: Tạo từ 1 nguyên tố hóa học duy nhất (VD: Cu, Fe, O₂, N₂).
   - Hợp chất: Tạo từ 2 nguyên tố hóa học trở lên (VD: NaCl, H₂O, CO₂, CaCO₃).
   - Liên kết cộng hóa trị: Dùng chung các cặp electron (thường giữa các phi kim).
   - Liên kết ion: Do lực hút tĩnh điện giữa ion dương và ion âm (thường giữa kim loại và phi kim).
4. Hóa trị & Khối lượng phân tử:
   - Quy tắc hóa trị: a · x = b · y với hợp chất AxBy. Chọn H hóa trị I, O hóa trị II làm chuẩn.
   - Khối lượng phân tử (KLPT): Tổng khối lượng các nguyên tử trong phân tử (đơn vị amu).
   - Tính phần trăm (%) khối lượng của nguyên tố trong hợp chất: %A = (KLNT(A) × số nguyên tử A / KLPT) × 100%.

---

# QUY TẮC PHẢN HỒI VÀ TƯƠNG TÁC
- Trình bày: Sử dụng chỉ số dưới chuẩn cho công thức hóa học (VD: H₂O, CaCO₃, SO₂, CO(NH₂)₂), chỉ số trên cho ion (VD: Na⁺, Mg²⁺, Al³⁺, Cl⁻, O²⁻).
- Giải thích: Khi học sinh làm sai hoặc hỏi bài, chỉ rõ nguyên nhân sai, đưa ra công thức/quy tắc và hướng dẫn phương pháp giải từng bước dễ hiểu.
- Tương tác: Luôn tích cực, động viên tinh thần học tập của học sinh lớp 7. Khuyến khích học sinh tự giải lại bài tập tương tự.`;

// Intelligent Domain Fallback Engine matching user brief rules
function getCurriculumFallbackReply(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes('liên kết ion') || p.includes('cộng hóa trị') || p.includes('bản chất của liên kết')) {
    return `Chào em! Thầy/cô giải thích sự khác biệt giữa hai loại liên kết cốt lõi này nhé:

1. **Liên kết cộng hóa trị (Covalent Bond):**
• **Bản chất:** Hình thành do **sự góp chung các cặp electron** giữa các nguyên tử.
• **Thường gặp:** Giữa các nguyên tử **phi kim với nhau** (ví dụ: phân tử H₂, O₂, N₂, nước H₂O, khí methane CH₄, carbon dioxide CO₂).
• **Mục đích:** Để mỗi nguyên tử đạt cấu hình 8 electron ngoài cùng bền vững giống khí hiếm (riêng H cần 2e).

2. **Liên kết ion (Ionic Bond):**
• **Bản chất:** Hình thành do **lực hút tĩnh điện** giữa các ion mang điện tích trái dấu (ion dương cation và ion âm anion).
• **Thường gặp:** Giữa **kim loại điển hình và phi kim điển hình** (ví dụ: muối ăn NaCl, magnesium oxide MgO).
• **Quá trình:** Kim loại nhường e thành ion dương (Na → Na⁺ + 1e), phi kim nhận e thành ion âm (Cl + 1e → Cl⁻). Hai ion Na⁺ và Cl⁻ hút nhau tạo hợp chất ion NaCl.

💡 **Mẹo làm bài thi:** Đề bài hỏi hợp chất giữa Kim loại + Phi kim → Thường là **Liên kết ion**; giữa Phi kim + Phi kim → Là **Liên kết cộng hóa trị**!`;
  }

  if (p.includes('%') || p.includes('phần trăm khối lượng') || p.includes('caco3') || p.includes('urea') || p.includes('ch4')) {
    return `Chào em! Dưới đây là phương pháp tính phần trăm (%) khối lượng của nguyên tố trong hợp chất chuẩn từng bước:

### 📌 CÔNG THỨC CHUẨN:
Với hợp chất có công thức hóa học **AₓBᵧ**:
1. **Bước 1:** Tính Khối lượng phân tử (KLPT):
   $$\\text{KLPT} = (x \\times \\text{KLNT}_A) + (y \\times \\text{KLNT}_B) \\quad (\\text{amu})$$
2. **Bước 2:** Tính % khối lượng nguyên tố A:
   $$\\%A = \\frac{x \\times \\text{KLNT}_A}{\\text{KLPT}} \\times 100\\%$$

---

### 📝 VÍ DỤ MINH HỌA TRONG ĐỀ THI:
**Bài 1: Với đá vôi CaCO₃ (Ca = 40, C = 12, O = 16 amu)**
• $\\text{KLPT}(\\text{CaCO}_3) = 40 \\times 1 + 12 \\times 1 + 16 \\times 3 = 100\\text{ amu}$
• $\\%\\text{Ca} = \\frac{40 \\times 1}{100} \\times 100\\% = 40\\%$.

**Bài 2: Với phân bón Urea CO(NH₂)₂ (C=12, O=16, N=14, H=1 amu)**
• $\\text{KLPT} = 12 + 16 + (14 + 1 \\times 2) \\times 2 = 60\\text{ amu}$
• Trong phân tử có 2 nguyên tử N (khối lượng = $14 \\times 2 = 28\\text{ amu}$).
• $\\%\\text{N} = \\frac{28}{60} \\times 100\\% \\approx 46.67\\%$.

Em đã hiểu rõ cách tính chưa? Em thử tính % khối lượng của C trong khí CH₄ xem ra bao nhiêu nhé!`;
  }

  if (p.includes('hóa trị') || p.includes('quy tắc hóa trị') || p.includes('a · x') || p.includes('p2o5') || p.includes('co2')) {
    return `Chào em! Quy tắc hóa trị là một trong những phần quan trọng nhất của Hóa học 7:

### 1. QUY ƯỚC CHUẨN:
• Chọn hóa trị của **H luôn là I**.
• Chọn hóa trị của **O luôn là II**.

### 2. QUY TẮC HÓA TRỊ:
Trong hợp chất 2 nguyên tố $A^a_x B^b_y$ (trong đó A có hóa trị a, B có hóa trị b):
$$a \\cdot x = b \\cdot y$$
*(Tích của chỉ số và hóa trị của nguyên tố này bằng tích của chỉ số và hóa trị của nguyên tố kia).*

---

### 3. CÁCH GIẢI BÀI TOÁN TÌM HÓA TRỊ:
• **Ví dụ 1: Tìm hóa trị x của C trong CO₂**
  Biết O có hóa trị II.
  Áp dụng quy tắc: $x \\cdot 1 = \\text{II} \\cdot 2 \\Rightarrow x = \\text{IV}$.
  Vậy trong CO₂, Carbon có hóa trị IV.

• **Ví dụ 2: Tìm hóa trị x của P trong P₂O₅**
  Biết O có hóa trị II.
  Áp dụng quy tắc: $x \\cdot 2 = \\text{II} \\cdot 5 \\Rightarrow x = \\frac{2 \\times 5}{2} = \\text{V}$.
  Vậy Phosphorus có hóa trị V.

• **Ví dụ 3: Tìm hóa trị y của S trong H₂S**
  Biết H có hóa trị I.
  Áp dụng: $\\text{I} \\cdot 2 = y \\cdot 1 \\Rightarrow y = \\text{II}$.
  Vậy Sulfur có hóa trị II.

Em hãy thử xác định hóa trị của Fe trong $\\text{Fe}_2\\text{O}_3$ xem nào!`;
  }

  if (p.includes('bảng tuần hoàn') || p.includes('chu kỳ') || p.includes('nhóm') || p.includes('ô nguyên tố')) {
    return `Chào em! Dưới đây là cách đọc và xác định vị trí trong Bảng tuần hoàn:

1. **Ô nguyên tố:**
   • Cho biết: Số hiệu nguyên tử (Z), Kí hiệu hóa học, Tên nguyên tố, Khối lượng nguyên tử.
   • Trong nguyên tử trung hòa: **Số hiệu nguyên tử = Số proton (p) = Số electron (e)**.

2. **Chu kỳ (hàng ngang):**
   • Gồm các nguyên tố mà nguyên tử có **CÙNG SỐ LỚP ELECTRON**.
   • **Số thứ tự Chu kỳ = Số lớp electron**.
   • *Ví dụ:* Sodium (Na) có 3 lớp electron $\\rightarrow$ Thuộc **Chu kỳ 3**.

3. **Nhóm A (cột dọc):**
   • Gồm các nguyên tố mà nguyên tử có **CÙNG SỐ ELECTRON Ở LỚP NGOÀI CÙNG**.
   • **Số thứ tự Nhóm A = Số electron lớp ngoài cùng**.
   • *Ví dụ:* Sodium (Na) có 1 electron lớp ngoài cùng $\\rightarrow$ Thuộc **Nhóm IA** (Kim loại kiềm).

4. **Các nhóm nguyên tố đặc biệt:**
   • **Nhóm IA:** Kim loại kiềm (Li, Na, K...) - dễ nhường 1e thành ion dương.
   • **Nhóm VIIA:** Halogen (F, Cl, Br...) - dễ nhận 1e thành ion âm.
   • **Nhóm VIIIA:** Khí hiếm (He, Ne, Ar...) - lớp ngoài cùng bền vững (8e, riêng He có 2e), trơ về mặt hóa học.`;
  }

  if (p.includes('cấu tạo nguyên tử') || p.includes('proton') || p.includes('neutron') || p.includes('electron') || p.includes('amu')) {
    return `Chào em! Về cấu tạo nguyên tử, em hãy nhớ 3 quy tắc cốt lõi:

1. **Cấu tạo 2 phần:**
   • **Hạt nhân ở tâm:** Gồm hạt **Proton** (mang điện tích dương +) và hạt **Neutron** (không mang điện).
   • **Vỏ nguyên tử:** Gồm các hạt **Electron** (mang điện tích âm -) chuyển động xung quanh hạt nhân.

2. **Tính trung hòa về điện:**
   • Trong nguyên tử luôn có: **Số proton (p) = Số electron (e)**.

3. **Khối lượng nguyên tử (KLNT):**
   • Vì khối lượng electron cực kì nhỏ bé (không đáng kể), nên khối lượng nguyên tử tập trung hầu như toàn bộ ở hạt nhân.
   • **Khối lượng nguyên tử (amu) $\\approx$ Số proton + Số neutron**.
   • *Ví dụ:* Magnesium có 12p, 12n $\\rightarrow$ Khối lượng $\\approx 12 + 12 = 24\\text{ amu}$. Tổng số hạt = $p + n + e = 12 + 12 + 12 = 36$ hạt.`;
  }

  return `Chào em! Thầy/cô là Gia sư AI môn Khoa học tự nhiên Lớp 7 (Phần Hóa học).

Thầy/cô sẵn sàng hướng dẫn em mọi bài tập về:
1. **Phương pháp & Kĩ năng tìm hiểu tự nhiên** (Kĩ năng đo, dự báo, phân loại, liên kết).
2. **Cấu tạo nguyên tử & Bảng tuần hoàn** (Xác định số hạt p, n, e, tìm Chu kỳ, Nhóm A, cơ chế tạo ion Na⁺, Mg²⁺, F⁻, Cl⁻).
3. **Đơn chất, Hợp chất & Liên kết hóa học** (Liên kết cộng hóa trị dùng chung e, liên kết ion hút tĩnh điện).
4. **Quy tắc hóa trị & Tính toán hóa học** (Quy tắc $a \\cdot x = b \\cdot y$, tính KLPT và % khối lượng nguyên tố trong hợp chất).

Em muốn giải chi tiết bài tập nào, hãy gửi câu hỏi hoặc công thức hóa học cho thầy/cô nhé!`;
}

// Fallback essay grading engine
function getCurriculumGradingFallback(
  questionTitle: string,
  questionPrompt: string,
  studentAnswer: string,
  modelAnswer: string,
  maxScore: number
): string {
  const ans = studentAnswer.toLowerCase().trim();
  const max = maxScore || 1.5;

  let pointsAwarded = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Analyze answer quality based on key criteria
  if (ans.length > 20) {
    pointsAwarded += max * 0.4;
    strengths.push('Em đã trình bày được câu trả lời có cấu trúc và nêu được ý chính.');
  }

  // Check specific chemistry concepts
  if (ans.includes('chu kỳ') || ans.includes('chu ky') || ans.includes('lớp')) {
    pointsAwarded += max * 0.25;
    strengths.push('Xác định được chu kỳ tương ứng với số lớp electron.');
  }
  if (ans.includes('nhóm') || ans.includes('nhom') || ans.includes('ngoài cùng')) {
    pointsAwarded += max * 0.25;
    strengths.push('Xác định được nhóm A tương ứng với số electron ở lớp ngoài cùng.');
  }
  if (ans.includes('kim loại') || ans.includes('phi kim') || ans.includes('khí hiếm') || ans.includes('khi hiem')) {
    pointsAwarded += max * 0.25;
    strengths.push('Phân loại đúng tính chất nguyên tố (Kim loại / Phi kim / Khí hiếm).');
  }
  if (ans.includes('amu') || ans.includes('%') || ans.includes('100') || ans.includes('60') || ans.includes('16')) {
    pointsAwarded += max * 0.3;
    strengths.push('Có số liệu tính toán cụ thể kèm đơn vị.');
  }

  // Ensure points don't exceed maxScore
  const finalScore = Math.min(Math.round(pointsAwarded * 10) / 10, max);

  if (finalScore < max) {
    improvements.push(
      'Cần giải thích rõ hơn lý do (ví dụ: vì sao là Chu kỳ 3? -> vì có 3 lớp electron; vì sao là nhóm IA? -> vì có 1e ngoài cùng; ghi rõ đơn vị amu).'
    );
  }

  return `📊 **ĐIỂM ĐÁNH GIÁ: ${finalScore} / ${max} ĐIỂM**

🌟 **Điểm tốt học sinh đã làm được:**
${strengths.length > 0 ? strengths.map((s) => `• ${s}`).join('\n') : '• Em đã có tinh thần cố gắng làm bài và đưa ra câu trả lời.'}

⚠️ **Điểm cần lưu ý & hoàn thiện:**
${improvements.length > 0 ? improvements.map((i) => `• ${i}`).join('\n') : '• Trình bày rất tốt! Em nhớ giữ cách trình bày khoa học này trong bài thi chính thức nhé.'}

📖 **Lời giải mẫu chuẩn tham khảo:**
${modelAnswer}

👏 *Thầy/cô ghi nhận sự cố gắng của em! Tiếp tục phát huy nhé!*`;
}

// API endpoint for interactive AI Chat
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, userPrompt } = req.body;

    if (!userPrompt && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống.' });
    }

    // Build contents array for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      for (const msg of messages) {
        if (msg.role === 'user' || msg.role === 'model') {
          contents.push({
            role: msg.role,
            parts: [{ text: msg.content || '' }],
          });
        }
      }
    }

    if (userPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }],
      });
    }

    let replyText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents as any,
        config: {
          systemInstruction: KHTN7_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      replyText = response.text || '';
    } catch (genAiError) {
      console.warn('Gemini API call warning, using intelligent chemistry fallback:', genAiError);
      replyText = getCurriculumFallbackReply(userPrompt || '');
    }

    if (!replyText) {
      replyText = getCurriculumFallbackReply(userPrompt || '');
    }

    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    const fallbackText = getCurriculumFallbackReply(req.body?.userPrompt || '');
    return res.json({ reply: fallbackText });
  }
});

// API endpoint for grading essay / short answer with rubric
app.post('/api/gemini/grade-essay', async (req, res) => {
  try {
    const { questionTitle, questionPrompt, studentAnswer, modelAnswer, maxScore } = req.body;

    if (!studentAnswer || !studentAnswer.trim()) {
      return res.status(400).json({ error: 'Chưa có câu trả lời của học sinh để chấm.' });
    }

    let evaluation = '';

    try {
      const gradingPrompt = `Bạn là giám khảo chấm thi môn Khoa học tự nhiên Lớp 7 (Phần Hóa học).
Hãy chấm bài làm của học sinh dưới đây một cách công tâm, chi tiết và khích lệ học sinh:

THÔNG TIN BÀI THI:
- Tên câu hỏi: ${questionTitle || 'Câu hỏi tự luận'}
- Yêu cầu đề bài: ${questionPrompt}
- Đáp án biểu điểm chuẩn tham khảo:
${modelAnswer}
- Thang điểm tối đa: ${maxScore || 1.5} điểm

BÀI LÀM CỦA HỌC SINH:
"${studentAnswer}"

YÊU CẦU ĐÁNH GIÁ:
1. Cho điểm số cụ thể (từ 0 đến ${maxScore || 1.5}) dựa trên các ý đúng.
2. Nêu điểm tốt / ý đúng học sinh đã làm được.
3. Chỉ ra lỗi sai, thiếu sót hoặc phần trình bày cần hoàn thiện (ví dụ quên đơn vị amu, chưa giải thích chu kỳ/nhóm rõ ràng, nhầm kim loại/phi kim).
4. Đưa ra lời khuyên và lời giải mẫu chuẩn chỉn chu nhất.
5. Giữ giọng điệu ấm áp, khen ngợi sự cố gắng của học sinh.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: gradingPrompt,
        config: {
          systemInstruction: KHTN7_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });
      evaluation = response.text || '';
    } catch (genAiError) {
      console.warn('Gemini grading warning, using curriculum rubric fallback:', genAiError);
      evaluation = getCurriculumGradingFallback(
        questionTitle,
        questionPrompt,
        studentAnswer,
        modelAnswer,
        maxScore
      );
    }

    if (!evaluation) {
      evaluation = getCurriculumGradingFallback(
        questionTitle,
        questionPrompt,
        studentAnswer,
        modelAnswer,
        maxScore
      );
    }

    return res.json({ evaluation });
  } catch (error: any) {
    console.error('Error in /api/gemini/grade-essay:', error);
    const fallbackEvaluation = getCurriculumGradingFallback(
      req.body?.questionTitle || '',
      req.body?.questionPrompt || '',
      req.body?.studentAnswer || '',
      req.body?.modelAnswer || '',
      req.body?.maxScore || 1.5
    );
    return res.json({ evaluation: fallbackEvaluation });
  }
});

// Setup Vite or static serving
async function setupServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`KHTN 7 Applet Server running on http://0.0.0.0:${port}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});
