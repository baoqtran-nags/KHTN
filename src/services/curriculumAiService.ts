/**
 * Client-side AI service for KHTN 7
 * Automatically calls server endpoints if available (in full-stack mode),
 * and seamlessly falls back to the embedded curriculum intelligence engine
 * on static hosts like GitHub Pages or when offline.
 */

export function getCurriculumFallbackReply(prompt: string): string {
  const p = prompt.toLowerCase();

  if (
    p.includes('liên kết ion') ||
    p.includes('cộng hóa trị') ||
    p.includes('bản chất của liên kết')
  ) {
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

  if (
    p.includes('%') ||
    p.includes('phần trăm khối lượng') ||
    p.includes('caco3') ||
    p.includes('urea') ||
    p.includes('ch4')
  ) {
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

  if (
    p.includes('hóa trị') ||
    p.includes('quy tắc hóa trị') ||
    p.includes('a · x') ||
    p.includes('p2o5') ||
    p.includes('co2')
  ) {
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

  if (
    p.includes('bảng tuần hoàn') ||
    p.includes('chu kỳ') ||
    p.includes('nhóm') ||
    p.includes('ô nguyên tố')
  ) {
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

  if (
    p.includes('cấu tạo nguyên tử') ||
    p.includes('proton') ||
    p.includes('neutron') ||
    p.includes('electron') ||
    p.includes('amu')
  ) {
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

export function getCurriculumGradingFallback(
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

  if (ans.length > 20) {
    pointsAwarded += max * 0.4;
    strengths.push('Em đã trình bày được câu trả lời có cấu trúc và nêu được ý chính.');
  }

  if (ans.includes('chu kỳ') || ans.includes('chu ky') || ans.includes('lớp')) {
    pointsAwarded += max * 0.25;
    strengths.push('Xác định được chu kỳ tương ứng với số lớp electron.');
  }
  if (ans.includes('nhóm') || ans.includes('nhom') || ans.includes('ngoài cùng')) {
    pointsAwarded += max * 0.25;
    strengths.push('Xác định được nhóm A tương ứng với số electron ở lớp ngoài cùng.');
  }
  if (
    ans.includes('kim loại') ||
    ans.includes('phi kim') ||
    ans.includes('khí hiếm') ||
    ans.includes('khi hiem')
  ) {
    pointsAwarded += max * 0.25;
    strengths.push('Phân loại đúng tính chất nguyên tố (Kim loại / Phi kim / Khí hiếm).');
  }
  if (
    ans.includes('amu') ||
    ans.includes('%') ||
    ans.includes('100') ||
    ans.includes('60') ||
    ans.includes('16')
  ) {
    pointsAwarded += max * 0.3;
    strengths.push('Có số liệu tính toán cụ thể kèm đơn vị.');
  }

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

export async function askTutorAI(
  prompt: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history,
        userPrompt: prompt,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch {
    // If on GitHub Pages (static) or server unreachable, fallback smoothly
  }

  return getCurriculumFallbackReply(prompt);
}

export async function gradeEssayAI(
  questionTitle: string,
  questionPrompt: string,
  studentAnswer: string,
  modelAnswer: string,
  maxScore: number
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/grade-essay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionTitle,
        questionPrompt,
        studentAnswer,
        modelAnswer,
        maxScore,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.evaluation) return data.evaluation;
    }
  } catch {
    // If on GitHub Pages (static) or server unreachable, fallback smoothly
  }

  return getCurriculumGradingFallback(
    questionTitle,
    questionPrompt,
    studentAnswer,
    modelAnswer,
    maxScore
  );
}
