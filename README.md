# 🧪 KHTN 7 - Ôn Tập & Luyện Đề Hóa Học (Trợ Lý AI & Phòng Thí Nghiệm Số)

Nền tảng giáo dục tương tác thông minh hỗ trợ học sinh Lớp 7 ôn tập và luyện thi môn **Khoa học tự nhiên (Phần Hóa học / Nguyên tố & Liên kết hóa học)** theo chuẩn chương trình GDPT 2018 (Kết nối tri thức, Chân trời sáng tạo, Cánh diều).

Tích hợp **Trợ lý Gia sư AI (Gemini 3.8 Flash)**, ngân hàng **3 Bộ đề kiểm tra mẫu chuẩn 4 phần**, **Bảng tuần hoàn tra cứu tương tác**, **Mô phỏng nguyên tử Bohr**, và **Máy tính khối lượng phân tử (KLPT) & % khối lượng**.

---

## ✨ Tính Năng Nổi Bật

### 1. 📝 Ngân Hàng 3 Bộ Đề Mẫu Chuẩn KHTN 7 (Đề 1, Đề 2, Đề 3)
* **Phần I: Trắc nghiệm khách quan (4 lựa chọn)** - 6 câu trắc nghiệm bám sát đề thi, chấm điểm tức thì kèm giải thích chi tiết.
* **Phần II: Trắc nghiệm Đúng / Sai** - Đánh giá 4 nhận định $a, b, c, d$ kèm giải thích bản chất hóa học.
* **Phần III: Trắc nghiệm trả lời ngắn** - Tính toán số hạt ($p, n, e$), khối lượng nguyên tử (amu) và xác định hóa trị chuẩn.
* **Phần IV: Tự luận & Chấm điểm bằng AI** - Nhập lời giải với thanh công cụ gõ ký hiệu nhanh ($H_2O, CaCO_3, Al^{3+}, Cl^-$), nhận xét và chấm điểm chi tiết bằng Gemini AI theo thang điểm chuẩn.
* **2 Chế độ linh hoạt**: *Luyện tập tự do* (xem đáp án ngay) hoặc *Thi thử 45 phút* (đếm giờ thi thật và xếp hạng điểm).

### 2. 🤖 Gia Sư AI KHTN 7 (Hỏi Đáp & Giảng Bài 24/7)
* Sử dụng mô hình **Gemini 3.8 Flash** trên máy chủ bảo mật.
* Đóng vai thầy/cô giáo dạy Hóa tận tình, kiên nhẫn, giải thích từng bước, chuẩn chỉ số dưới hóa học.
* Tích hợp sẵn cơ chế **Dự phòng tri thức giáo trình KHTN 7** (Curriculum Fallback Engine) đảm bảo hoạt động 100% ổn định kể cả khi mất kết nối mạng hay thiếu API key.

### 3. ⚛️ Bảng Tuần Hoàn Tra Cứu Tương Tác (20 Nguyên Tố Đầu)
* Trực quan hóa 20 nguyên tố đầu ($Z = 1 \to 20$) theo 4 Chu kỳ và các Nhóm IA đến VIIIA.
* Phân loại màu sắc rõ ràng: Kim loại kiềm (IA), Kim loại khác, Phi kim, Halogen (VIIA), Khí hiếm (VIIIA).
* Hiệu ứng rê chuột (Hover) giao điểm Chu kỳ - Nhóm (Crosshair Highlighting), hiệu ứng nhấp chọn âm thanh click nhẹ nhàng.
* Bảng tra cứu hiển thị đầy đủ: Số hiệu nguyên tử $Z$, Cấu hình electron từng lớp (Bohr model), số electron ngoài cùng, hóa trị, ion tạo thành.

### 4. 🔬 Mô Phỏng Phòng Thí Nghiệm Nguyên Tử (Bohr Atom Simulator)
* Quan sát mô hình hành tinh nguyên tử với các electron chuyển động theo quỹ đạo xung quanh hạt nhân.
* Trải nghiệm cơ chế **Tạo Ion**: quan sát nguyên tử kim loại nhường electron thành cation ($Na \to Na^+$, $Mg \to Mg^{2+}$) và phi kim nhận electron thành anion ($F \to F^-$, $Cl \to Cl^-$).

### 5. ⚗️ Máy Tính Khối Lượng Phân Tử (KLPT) & % Khối Lượng
* Phân tích các hợp chất trọng tâm: Đá vôi ($CaCO_3$), phân bón Urê ($CO(NH_2)_2$), khí Biogas ($CH_4$), muối ăn ($NaCl$), gỉ sắt ($Fe_2O_3$), $P_2O_5$, $AlCl_3$...
* Biểu đồ phần trăm trực quan và từng bước giải toán chi tiết theo chuẩn đề thi.

### 6. 📖 Sổ Tay Kiến Thức Cốt Lõi (4 Chuyên Đề)
* 4 Trọng tâm ôn tập giữa kỳ: Phương pháp & 4 kĩ năng tìm hiểu tự nhiên; Cấu tạo nguyên tử & Bảng tuần hoàn; Đơn chất - Hợp chất - Liên kết hóa học; Quy tắc hóa trị & Tính toán hóa học.
* Kèm câu hỏi kiểm tra nhanh có đáp án mở đóng linh hoạt.

---

## 🛠️ Công Nghệ Sử Dụng

* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Canvas Confetti
* **Build Tool**: Vite 8
* **Backend**: Node.js, Express, tsx
* **AI Engine**: Google GenAI SDK (`@google/genai`) với `gemini-3.8-flash`

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trên Máy Cục Bộ

### 1. Yêu cầu hệ thống
* Node.js version 18 trở lên (khuyên dùng Node.js 20 hoặc 22)
* Trình quản lý gói `npm` (đi kèm Node.js) hoặc `bun` / `pnpm`

### 2. Tải mã nguồn về máy
```bash
git clone https://github.com/<your-username>/khtn7-chemistry-studio.git
cd khtn7-chemistry-studio
```

### 3. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 4. Thiết lập biến môi trường
Sao chép file `.env.example` thành `.env`:
```bash
cp .env.example .env
```
*(Tùy chọn) Thêm `GEMINI_API_KEY` của bạn từ [Google AI Studio](https://aistudio.google.com/app/apikey). Nếu chưa có key, hệ thống vẫn tự động kích hoạt bộ tri thức dự phòng chuẩn sách giáo khoa để phục vụ người học.*

### 5. Khởi chạy máy chủ phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại địa chỉ: **[http://localhost:3000](http://localhost:3000)**

---

## 📦 Biên Dịch & Triển Khai Production

### Biên dịch ứng dụng:
```bash
npm run build
```

### Chạy ứng dụng production:
```bash
npm start
```

### Kiểm tra cú pháp TypeScript & Linting:
```bash
npm run lint
```

---

## 🌐 Hướng Dẫn Kích Hoạt GitHub Pages (2 Cách)

Ứng dụng đã được cấu hình đường dẫn tương đối (`base: './'`) và tích hợp sẵn bộ xử lý AI phía client, giúp trang web hoạt động mượt mà 100% trên GitHub Pages mà không bị lỗi 404 hay màn hình trắng!

### Cách 1: Tự động qua GitHub Actions (Khuyên Dùng - Đơn giản nhất)
1. Đẩy mã nguồn lên repository của bạn trên GitHub (nhánh `main`).
2. Trên trang GitHub của repository, vào **Settings** > **Pages** (ở thanh menu bên trái).
3. Tại phần **Build and deployment**:
   * Mục **Source**: Chọn **GitHub Actions** (thay vì "Deploy from a branch").
4. GitHub sẽ tự động phát hiện file cấu hình `.github/workflows/deploy.yml` đã tạo sẵn trong mã nguồn, tự động build và xuất bản trang web.
5. Sau khoảng 1-2 phút, bạn sẽ thấy đường link trang web trực tiếp xuất hiện (ví dụ: `https://<ten-tai-khoan>.github.io/<ten-repo>/`).

### Cách 2: Triển khai nhanh bằng dòng lệnh (`npm run deploy`)
1. Cài đặt và build đẩy lên nhánh `gh-pages`:
   ```bash
   npm run deploy
   ```
2. Trên GitHub, vào **Settings** > **Pages**:
   * Mục **Source**: Chọn **Deploy from a branch**.
   * Nhánh (Branch): Chọn `gh-pages` và thư mục `/(root)`, sau đó nhấn **Save**.
3. Trang web sẽ sẵn sàng sau 1 phút!

---

## ☁️ Triển Khai Full-Stack (Render, Railway, Fly.io, Vercel, Docker)
Nếu muốn chạy ở chế độ máy chủ backend Node.js / Express đầy đủ:
* Lệnh build: `npm run build`
* Lệnh start: `npm start` (chạy `NODE_ENV=production tsx server.ts`)
* Cổng: Tự động nhận biến môi trường `PORT` hoặc mặc định cổng 3000.


---

## 📂 Cấu Trúc Thư Mục Dự Án

```
├── .env.example            # Mẫu cấu hình biến môi trường
├── .gitignore              # Danh sách tệp bỏ qua khi commit Git
├── index.html              # HTML entry point với typography tối ưu
├── package.json            # Scripts và dependencies dự án
├── server.ts               # Express backend & tích hợp Google Gemini API
├── tsconfig.json           # Cấu hình TypeScript
├── vite.config.ts          # Cấu hình Vite & Tailwind CSS
├── src/
│   ├── main.tsx            # Điểm khởi chạy React app
│   ├── index.css           # Cấu hình Tailwind CSS và keyframe animation
│   ├── App.tsx             # Điều hướng tab chính và trạng thái điểm thi
│   ├── components/
│   │   ├── Navbar.tsx                   # Thanh điều hướng trên cùng
│   │   ├── ExamView.tsx                 # Giao diện luyện thi 3 bộ đề mẫu
│   │   ├── AIAssistantView.tsx          # Giao diện trò chuyện Gia sư AI
│   │   ├── KnowledgeHandbookView.tsx    # Sổ tay kiến thức 4 chuyên đề
│   │   ├── PeriodicTableReference.tsx   # Bảng tuần hoàn tra cứu tương tác
│   │   ├── AtomSimulatorView.tsx        # Mô phỏng nguyên tử Bohr & tạo ion
│   │   ├── MolecularMassCalcView.tsx    # Máy tính KLPT (amu) và % khối lượng
│   │   └── ChemToolbar.tsx              # Thanh gõ nhanh ký hiệu hóa học
│   └── data/
│       ├── elementsData.ts   # Dữ liệu chi tiết 20 nguyên tố đầu
│       ├── examData.ts       # Dữ liệu chuẩn 3 bộ đề kiểm tra (Phần I-IV)
│       ├── knowledgeData.ts  # Nội dung lý thuyết 4 chuyên đề & câu hỏi nhanh
│       └── compoundsData.ts  # Danh mục hợp chất hóa học phổ biến lớp 7
└── README.md               # Tài liệu hướng dẫn sử dụng và triển khai
```

---

## 📄 Bản Quyền
Dự án được xây dựng phục vụ mục đích giáo dục và ôn thi môn Khoa học tự nhiên Lớp 7. Giấy phép mã nguồn mở Apache-2.0.
