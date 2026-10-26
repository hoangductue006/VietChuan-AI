import React, { useState, useMemo } from 'react';
import { DictionaryEntry, ScreenType } from '../types';
import { VERIFIED_DICTIONARY } from '../data/dictionary';
import {
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Split,
} from 'lucide-react';

interface DictionaryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSendToChecker: (text: string) => void;
}

export const DictionaryScreen: React.FC<DictionaryScreenProps> = ({
  onNavigate,
  onSendToChecker,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [aiLookupResult, setAiLookupResult] = useState<any | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLookupError, setAiLookupError] = useState<string | null>(null);

  // Filter local dictionary entries
  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return VERIFIED_DICTIONARY.filter((entry) => {
      const matchCategory =
        selectedCategory === 'all' || entry.categoryTag === selectedCategory;

      if (!matchCategory) return false;

      if (!q) return true;

      const inWord = entry.word.toLowerCase().includes(q);
      const inRecommended = entry.recommendedSpelling.toLowerCase().includes(q);
      const inMistakes = entry.commonMistakes.some((m) => m.toLowerCase().includes(q));
      const inDef = entry.definition.toLowerCase().includes(q);

      return inWord || inRecommended || inMistakes || inDef;
    });
  }, [searchQuery, selectedCategory]);

  // Request Gemini dynamic lookup if user specifically clicks "Tra cứu mở rộng qua Gemini AI"
  const handleAiLookup = async () => {
    const term = searchQuery.trim();
    if (!term) return;

    setIsAiLoading(true);
    setAiLookupError(null);
    setAiLookupResult(null);

    try {
      const response = await fetch('/api/lookup-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: term }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Lỗi tra cứu từ điển');
      }

      const data = await response.json();
      setAiLookupResult(data);
    } catch (err: any) {
      console.error(err);
      setAiLookupError(err?.message || 'Không thể tra cứu từ vào lúc này.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSendWordToChecker = (word: string, exampleSentence?: string) => {
    const textToTest = exampleSentence || `Tôi muốn kiểm tra cách viết và ngữ cảnh của từ: ${word}`;
    onSendToChecker(textToTest);
    onNavigate('checker');
  };

  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              Tra cứu chuẩn hóa & Cặp từ dễ nhầm
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Từ điển chuẩn chính tả tiếng Việt
            </h1>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Nguồn chính: Từ điển tiếng Việt – GS. Hoàng Phê (Viện Ngôn ngữ học)</span>
          </div>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Tra cứu cách viết chuẩn, giải nghĩa từ tố Hán-Việt, phân biệt các cặp từ đồng âm hoặc dễ nhầm lẫn trong giao tiếp và văn bản hành chính.
        </p>
      </div>

      {/* Search Bar & Quick Category Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập từ hoặc cặp từ cần tra (ví dụ: 'xán lạn', 'chẩn đoán', 'vô hình trung', 'sáp nhập', 'yếu điểm', 'suôn sẻ')..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm sm:text-base focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-md transition"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Chủ đề:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Tất cả ({VERIFIED_DICTIONARY.length})
          </button>
          <button
            onClick={() => setSelectedCategory('han_viet')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              selectedCategory === 'han_viet'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Từ Hán-Việt dễ nhầm
          </button>
          <button
            onClick={() => setSelectedCategory('phu_am')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              selectedCategory === 'phu_am'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Phụ âm đầu (s/x, d/gi)
          </button>
          <button
            onClick={() => setSelectedCategory('thanh_dieu')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              selectedCategory === 'thanh_dieu'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Thanh điệu & Vần
          </button>
          <button
            onClick={() => setSelectedCategory('quan_ngu')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              selectedCategory === 'quan_ngu'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Quán ngữ & Thành ngữ
          </button>
        </div>
      </div>

      {/* Verified List from Database */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>Mục từ đã xác minh chính thống ({filteredEntries.length})</span>
          </h2>
          <span className="text-xs text-slate-500">
            Trích từ Từ điển tiếng Việt – GS. Hoàng Phê
          </span>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-bold text-slate-800 text-base">
                Không tìm thấy trong bộ từ ngữ cơ bản
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Từ khoá <strong className="text-slate-700">"{searchQuery}"</strong> chưa có sẵn trong danh sách đối chiếu nhanh.
                Bạn có thể yêu cầu Gemini tra cứu mở rộng bên dưới (kết quả do AI tạo ra có đánh dấu tham khảo).
              </p>
            </div>

            {searchQuery.trim() && (
              <button
                onClick={handleAiLookup}
                disabled={isAiLoading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
              >
                {isAiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang tra cứu cơ sở dữ liệu tiếng Việt...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Tra cứu mở rộng từ "{searchQuery.trim()}" bằng Gemini AI</span>
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:border-teal-200 transition space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-teal-800 tracking-tight">
                      {entry.word}
                    </h3>
                    <span className="text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      Chuẩn chính tả
                    </span>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {entry.categoryLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSendWordToChecker(entry.word, entry.examples[0])}
                    className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-semibold hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    <span>Kiểm tra trong văn bản</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Common mistakes vs Recommended */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3 text-xs sm:text-sm space-y-1">
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                      Cách viết khuyến nghị:
                    </span>
                    <p className="font-bold text-teal-900 text-base font-serif">
                      {entry.recommendedSpelling}
                    </p>
                    {entry.etymology && (
                      <p className="text-xs text-teal-700 pt-0.5 italic">{entry.etymology}</p>
                    )}
                  </div>

                  <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs sm:text-sm space-y-1">
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                      Các cách viết thường sai:
                    </span>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {entry.commonMistakes.map((m, idx) => (
                        <span
                          key={idx}
                          className="font-semibold text-red-600 line-through bg-white/80 px-2 py-0.5 rounded border border-red-100 font-serif"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meaning & Explanation */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div>
                    <strong className="text-slate-900 font-semibold">Định nghĩa: </strong>
                    <span>{entry.definition}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                    <strong className="text-slate-900 font-semibold block mb-1">
                      Giải thích sự khác nhau & căn cứ:
                    </strong>
                    <p className="text-slate-600">{entry.explanation}</p>
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <strong className="text-slate-800 font-semibold">Ví dụ câu chuẩn:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 font-serif">
                    {entry.examples.map((ex, idx) => (
                      <li key={idx} className="italic">
                        "{ex}"
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Source cite */}
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Căn cứ: {entry.source}</span>
                  <span className="text-teal-600 font-medium">Trạng thái: Đã kiểm chứng</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic AI Lookup Section if available */}
      {aiLookupResult && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-teal-500/40 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-lg text-white">
                Kết quả giải thích tham khảo từ Gemini AI
              </h3>
            </div>
            <span className="text-[11px] bg-amber-900/60 text-amber-300 border border-amber-700/80 px-2.5 py-0.5 rounded-full font-medium">
              Chưa đối chiếu từ điển viện
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
              <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
                Từ tra cứu & Cách viết khuyến nghị:
              </span>
              <p className="font-serif font-bold text-xl text-teal-300">
                {aiLookupResult.recommendedSpelling || aiLookupResult.word}
              </p>
              {aiLookupResult.partOfSpeech && (
                <span className="text-xs text-slate-400">({aiLookupResult.partOfSpeech})</span>
              )}
            </div>

            {aiLookupResult.confusedWith?.commonMistake && (
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <span className="text-xs text-red-400 font-semibold uppercase tracking-wider block">
                  Hay bị nhầm với:
                </span>
                <p className="font-serif font-bold text-red-400 line-through">
                  {aiLookupResult.confusedWith.commonMistake}
                </p>
                <p className="text-xs text-slate-300">
                  {aiLookupResult.confusedWith.comparisonExplanation}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <strong className="text-white block font-semibold">Giải nghĩa:</strong>
            <p>{aiLookupResult.definition}</p>
            {aiLookupResult.etymology && (
              <p className="text-xs text-slate-400 pt-1 italic">
                Nguồn gốc: {aiLookupResult.etymology}
              </p>
            )}
          </div>

          {aiLookupResult.examples && aiLookupResult.examples.length > 0 && (
            <div className="space-y-1 text-xs text-slate-300">
              <strong className="text-white">Ví dụ câu:</strong>
              <ul className="list-disc list-inside space-y-1 italic text-teal-200/90 font-serif">
                {aiLookupResult.examples.map((ex: string, idx: number) => (
                  <li key={idx}>"{ex}"</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-3 border-t border-slate-800">
            <p className="italic">
              * Lưu ý: Đây là phân tích do mô hình ngôn ngữ hỗ trợ. Người dùng nên đối chiếu thêm với Từ điển tiếng Việt chính thống.
            </p>
            <button
              onClick={() => handleSendWordToChecker(aiLookupResult.word, aiLookupResult.examples?.[0])}
              className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-bold self-start sm:self-auto cursor-pointer"
            >
              <span>Chuyển sang kiểm tra văn bản</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Error state */}
      {aiLookupError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs sm:text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span>{aiLookupError}</span>
        </div>
      )}
    </div>
  );
};
