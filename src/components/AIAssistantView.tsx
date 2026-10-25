import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Trash2, Copy, Check, Lightbulb, RefreshCw } from 'lucide-react';
import { ChemToolbar } from './ChemToolbar';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface AIAssistantViewProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'Xin chào em! Thầy/cô là **Trợ lý AI môn Khoa học tự nhiên Lớp 7** (chuyên đề Nguyên tố & Liên kết hóa học). Em đang cần hỗ trợ ôn tập phần nào (Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Quy tắc hóa trị hay cách tính % khối lượng)? Em cứ hỏi thoải mái nhé!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle external prompt passed from other tabs (e.g. from ExamView)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const quickQuestions = [
    'Phân biệt bản chất của liên kết ion và liên kết cộng hóa trị?',
    'Cách tính % khối lượng của nguyên tố trong hợp chất (cho ví dụ với CaCO₃)?',
    'Giải thích quy tắc hóa trị a · x = b · y và cách tìm hóa trị của P trong P₂O₅?',
    'Vì sao các nguyên tố nhóm VIIIA (khí hiếm) lại có cấu hình electron rất bền vững?',
    'Cho em một bài tập trắc nghiệm nhỏ để em tự kiểm tra kiến thức!',
    'Làm thế nào để xác định số p, số n, số e và khối lượng nguyên tử (amu)?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputValue;
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // Build conversation history for API
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          userPrompt: text.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Lỗi nhận diện phản hồi từ AI.');
      }
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `Thầy/cô đang gặp sự cố kết nối: ${err.message || 'Vui lòng thử lại'}. Em kiểm tra lại mạng hoặc hỏi lại nhé!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (confirm('Em có chắc muốn xóa lịch sử trò chuyện để bắt đầu buổi học mới?')) {
      setMessages([
        {
          id: 'welcome-new',
          role: 'model',
          content: 'Cuộc trò chuyện đã được làm mới. Em muốn hỏi bài tập hoặc chủ đề nào tiếp theo?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  // Helper formatting for bold and chemical formulas
  const renderFormattedText = (text: string) => {
    return (
      <div className="whitespace-pre-line leading-relaxed text-sm space-y-2">
        {text.split('\n\n').map((paragraph, pIdx) => {
          // Highlight markdown bullets and headers
          const isHeader = paragraph.startsWith('#');
          const isBullet = paragraph.startsWith('•') || paragraph.startsWith('-');

          return (
            <p
              key={pIdx}
              className={`${
                isHeader
                  ? 'font-bold text-base text-emerald-900 border-b border-emerald-200/60 pb-1 mt-2'
                  : ''
              } ${isBullet ? 'pl-2' : ''}`}
            >
              {paragraph}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-8rem)] min-h-[640px] flex flex-col">
      {/* Chat Header Card */}
      <div className="bg-white rounded-t-3xl border border-b-0 border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                Gia Sư AI KHTN 7 (Hóa Học)
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Sẵn sàng
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Kiên nhẫn, chuẩn sư phạm, bám sát sách KHTN 7
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Xóa đoạn chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-slate-50/70 border-x border-slate-200 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-xs ${
                  isUser
                    ? 'bg-slate-800'
                    : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-600'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-2xs relative group ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                }`}
              >
                {/* Message Content */}
                {isUser ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  renderFormattedText(msg.content)
                )}

                <div
                  className={`flex items-center justify-between gap-3 mt-2 text-[10px] ${
                    isUser ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-slate-700 rounded flex items-center gap-1"
                      title="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-2xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 font-medium ml-1">
                Gia sư AI đang suy nghĩ và soạn bài giải...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="bg-white border-x border-slate-200 px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 border-t border-slate-100">
        <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Gợi ý câu hỏi:</span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            disabled={loading}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1 rounded-full text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-slate-700 whitespace-nowrap transition-colors flex-shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="bg-white rounded-b-3xl border border-slate-200 p-4 shadow-sm space-y-2">
        {/* Fast chemical notation bar */}
        <ChemToolbar onInsert={(char) => setInputValue((prev) => prev + char)} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            placeholder="Hỏi thầy/cô về bài tập KHTN 7 (Ví dụ: Tính % Ca trong CaCO₃, giải thích liên kết ion...)..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl text-sm transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <span>Gửi</span>
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};
