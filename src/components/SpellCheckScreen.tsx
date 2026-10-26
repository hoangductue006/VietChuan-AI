import React, { useState, useEffect, useMemo } from 'react';
import {
  SuggestionItem,
  SuggestionCategory,
  AnalysisResult,
  ScreenType,
} from '../types';
import {
  Sparkles,
  ClipboardPaste,
  Trash2,
  Check,
  X,
  Copy,
  RotateCcw,
  CheckCheck,
  AlertTriangle,
  BookOpen,
  Split,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCheck,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface SpellCheckScreenProps {
  initialText?: string;
  onNavigate: (screen: ScreenType) => void;
}

const SAMPLE_TEXTS = [
  {
    label: 'Bài văn học sinh',
    text: 'Em rất mong muốn sau khi tốt nghiệp cấp 3 sẽ có một tương lai sáng lạng. Dù đề tài nghiên cứu còn nhiều yếu điểm, nhóm em sẽ cố gắng bổ xung số liệu khảo sát và chuẩn đoán các nguyên nhân sai số để đạt kết quả xuất sắc.',
  },
  {
    label: 'Email công sở',
    text: 'Kính gửi Ban Giám đốc, phương án sát nhập hai phòng ban đã được thảo luận kỹ lưỡng. Mọi việc diễn ra rất suông sẻ, rốt cục chúng ta cũng có cơ hội cọ sát với đối tác nước ngoài để trau dồi kinh nghiệm.',
  },
  {
    label: 'Bài đăng mạng xã hội',
    text: 'Những tin đồn thất thiệt vô hình chung đã gây hoang mang trong dư luận. Một số kẻ chỉ chăm chăm dành giật tương tác mà bàng quang trước những hậu quả khôn lường gây ra cho cộng đồng.',
  },
];

export const SpellCheckScreen: React.FC<SpellCheckScreenProps> = ({ initialText = '', onNavigate }) => {
  const [inputText, setInputText] = useState(initialText);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Per-item acceptance state: map item ID -> boolean (true = accepted, false = rejected)
  const [acceptedMap, setAcceptedMap] = useState<Record<string, boolean>>({});

  // Filter category in results: 'all' or specific category
  const [activeFilter, setActiveFilter] = useState<'all' | SuggestionCategory>('all');

  // Confirmation dialog for clearing text
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Copy success indicator
  const [copySuccess, setCopySuccess] = useState(false);

  // Update input text if prop changes
  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  // Text metrics
  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Handle Paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText((prev) => (prev ? prev + '\n' + text : text));
      }
    } catch {
      setErrorMsg('Không thể truy cập bộ nhớ tạm (clipboard). Vui lòng dán thủ công bằng phím Ctrl+V hoặc Cmd+V.');
    }
  };

  // Handle Clear
  const handleConfirmClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setAcceptedMap({});
    setErrorMsg(null);
    setShowClearConfirm(false);
  };

  // Call Server-side Gemini analyze API
  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setErrorMsg('Vui lòng nhập hoặc dán đoạn văn bản cần kiểm tra.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Lỗi máy chủ (${response.status})`);
      }

      const data = await response.json();

      // Normalize items & init acceptedMap (by default, accept high-probability errors and grammar)
      const initialAccepted: Record<string, boolean> = {};
      const items: SuggestionItem[] = (data.items || []).map((item: any, idx: number) => {
        const id = item.id || `sugg-${idx}-${Date.now()}`;
        // Automatically pre-accept high-confidence spelling and grammar, leave uncertain unaccepted for user decision
        initialAccepted[id] = item.category === 'spelling' || item.category === 'grammar_usage';
        return {
          ...item,
          id,
        };
      });

      setAnalysisResult({
        items,
        summary: data.summary || {
          spellingCount: items.filter((i) => i.category === 'spelling').length,
          grammarCount: items.filter((i) => i.category === 'grammar_usage').length,
          expressionCount: items.filter((i) => i.category === 'expression').length,
          uncertainCount: items.filter((i) => i.category === 'uncertain').length,
          overallAssessment: 'Phân tích văn bản hoàn tất.',
        },
        originalText: inputText,
      });

      setAcceptedMap(initialAccepted);
    } catch (err: any) {
      console.error('Lỗi khi phân tích:', err);
      setErrorMsg(err?.message || 'Không thể kết nối đến hệ thống phân tích. Vui lòng thử lại sau giây lát.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle single item acceptance
  const toggleItemAcceptance = (id: string) => {
    setAcceptedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Bulk Accept All
  const handleAcceptAll = () => {
    if (!analysisResult) return;
    const all: Record<string, boolean> = {};
    analysisResult.items.forEach((item) => {
      all[item.id] = true;
    });
    setAcceptedMap(all);
  };

  // Bulk Reject All
  const handleRejectAll = () => {
    if (!analysisResult) return;
    const all: Record<string, boolean> = {};
    analysisResult.items.forEach((item) => {
      all[item.id] = false;
    });
    setAcceptedMap(all);
  };

  // Compute the revised text based on accepted suggestions
  const revisedText = useMemo(() => {
    if (!analysisResult) return inputText;

    let text = analysisResult.originalText;
    // Apply accepted suggestions (replace targetWord in originalSnippet where possible)
    // To avoid overlapping issues, sort replacements or do smart replace
    const acceptedItems = analysisResult.items.filter((i) => acceptedMap[i.id]);

    for (const item of acceptedItems) {
      if (!item.targetWord || !item.suggestedReplacement) continue;
      // Replace targetWord within original text
      // Use boundary-safe or global string replace for targetWord
      try {
        const regex = new RegExp(`\\b${escapeRegExp(item.targetWord)}\\b`, 'gi');
        if (regex.test(text)) {
          text = text.replace(regex, item.suggestedReplacement);
        } else {
          // fallback plain replace
          text = text.replace(item.targetWord, item.suggestedReplacement);
        }
      } catch {
        text = text.replace(item.targetWord, item.suggestedReplacement);
      }
    }

    return text;
  }, [analysisResult, acceptedMap, inputText]);

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Copy revised text to clipboard
  const handleCopyRevised = async () => {
    try {
      await navigator.clipboard.writeText(revisedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      setErrorMsg('Không thể sao chép văn bản tự động. Vui lòng chọn và nhấn Ctrl+C.');
    }
  };

  // Re-check revised text
  const handleRecheckWithRevised = () => {
    setInputText(revisedText);
    setAnalysisResult(null);
    setAcceptedMap({});
    // Trigger analyze on next frame
    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 50);
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    if (!analysisResult) return [];
    if (activeFilter === 'all') return analysisResult.items;
    return analysisResult.items.filter((i) => i.category === activeFilter);
  }, [analysisResult, activeFilter]);

  // Category metadata helper
  const getCategoryInfo = (category: SuggestionCategory) => {
    switch (category) {
      case 'spelling':
        return {
          label: 'Lỗi chính tả',
          badgeClass: 'bg-red-100 text-red-800 border-red-200',
          dotClass: 'bg-red-500',
          desc: 'Có khả năng cao là viết sai chuẩn chính tả tiếng Việt',
        };
      case 'grammar_usage':
        return {
          label: 'Dùng từ & Ngữ pháp',
          badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
          dotClass: 'bg-purple-500',
          desc: 'Sai nghĩa Hán-Việt, sai quán ngữ hoặc lỗi kết hợp từ',
        };
      case 'expression':
        return {
          label: 'Đề xuất diễn đạt',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
          dotClass: 'bg-blue-500',
          desc: 'Gợi ý cách viết mạch lạc, tự nhiên và gãy gọn hơn',
        };
      case 'uncertain':
        return {
          label: 'Cần tự xác minh',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
          dotClass: 'bg-amber-500',
          desc: 'Chưa đủ cứ liệu để khẳng định đúng/sai, người dùng nên lưu ý',
        };
    }
  };

  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-6xl mx-auto">
      {/* Title & Introduction */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Công nghệ Gemini kết hợp Từ điển tiếng Việt
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kiểm tra & Chuẩn hóa chính tả tiếng Việt
            </h1>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start sm:self-auto">
            <Info className="w-4 h-4 text-slate-400" />
            <span>Không lưu trữ văn bản • Giữ nguyên phong cách của bạn</span>
          </div>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Dán đoạn văn bản cần rà soát vào ô bên dưới. Hệ thống sẽ phân loại chi tiết lỗi chính tả, cách dùng từ,
          và đưa ra đề xuất sửa có giải thích khoa học.
        </p>
      </div>

      {/* Sample presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-600">Mẫu thử nhanh:</span>
        {SAMPLE_TEXTS.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputText(sample.text);
              setAnalysisResult(null);
              setErrorMsg(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
          >
            {sample.label}
          </button>
        ))}
      </div>

      {/* Main Input Box Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition">
        {/* Toolbar Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">Khung soạn thảo văn bản</span>
            <span className="text-slate-400">•</span>
            <span>
              <strong className="text-slate-800">{wordCount}</strong> từ
            </span>
            <span className="text-slate-400">•</span>
            <span>
              <strong className="text-slate-800">{charCount}</strong> ký tự
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePaste}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition cursor-pointer"
              title="Dán văn bản từ bộ nhớ tạm"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-teal-600" />
              <span>Dán văn bản</span>
            </button>

            {inputText && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-red-50 hover:text-red-700 border border-slate-200 text-slate-600 font-medium transition cursor-pointer"
                title="Xóa nội dung nhập"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            )}
          </div>
        </div>

        {/* Textarea */}
        <div className="p-4 sm:p-5">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Nhập hoặc dán đoạn văn bản tiếng Việt của bạn vào đây (tối đa 8.000 ký tự)... Ví dụ: 'Em rất mong muốn có một tương lai sáng lạng sau khi tốt nghiệp...'"
            rows={7}
            className="w-full text-slate-800 placeholder-slate-400 text-sm sm:text-base leading-relaxed border-0 focus:outline-none focus:ring-0 resize-y font-sans"
          />
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {charCount > 7500 ? (
              <span className="text-amber-600 font-medium">
                Gần đạt giới hạn 8.000 ký tự. Vui lòng chia nhỏ văn bản dài.
              </span>
            ) : (
              <span>Khuyến nghị kiểm tra theo từng đoạn văn (100 - 1.000 từ) để có độ chi tiết cao nhất.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition ${
                isAnalyzing || !inputText.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20 hover:scale-[1.01] cursor-pointer'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang rà soát đối chiếu...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Kiểm tra chính tả</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error message alert */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Đã xảy ra sự cố</p>
            <p className="text-xs sm:text-sm text-red-600">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="font-bold text-slate-900 text-lg">Xác nhận xóa nội dung?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thao tác này sẽ xóa toàn bộ nội dung trong khung soạn thảo và kết quả phân tích hiện tại.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmClear}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition shadow-md shadow-red-600/20 cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="space-y-8 animate-fadeIn pt-4">
          {/* Summary Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-600" />
                  Báo cáo phân tích văn bản
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  Tổng kết: Phát hiện {analysisResult.items.length} điểm cần chú ý
                </h3>
              </div>

              {/* Bulk actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200 transition cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Áp dụng tất cả</span>
                </button>
                <button
                  onClick={handleRejectAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Bỏ chọn tất cả</span>
                </button>
              </div>
            </div>

            {/* Overall Assessment */}
            {analysisResult.summary.overallAssessment && (
              <div className="bg-slate-50 rounded-xl p-3.5 text-xs sm:text-sm text-slate-700 border border-slate-200/80 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Nhận xét tổng thể: </strong>
                  <span>{analysisResult.summary.overallAssessment}</span>
                </div>
              </div>
            )}

            {/* 4 Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <button
                onClick={() => setActiveFilter(activeFilter === 'spelling' ? 'all' : 'spelling')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activeFilter === 'spelling'
                    ? 'bg-red-50 border-red-300 ring-2 ring-red-400/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs text-slate-500 font-medium">Lỗi chính tả</div>
                <div className="text-2xl font-black text-red-600 mt-0.5">
                  {analysisResult.summary.spellingCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Khả năng cao</div>
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'grammar_usage' ? 'all' : 'grammar_usage')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activeFilter === 'grammar_usage'
                    ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs text-slate-500 font-medium">Dùng từ & Ngữ pháp</div>
                <div className="text-2xl font-black text-purple-600 mt-0.5">
                  {analysisResult.summary.grammarCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Từ Hán-Việt, quán ngữ</div>
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'expression' ? 'all' : 'expression')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activeFilter === 'expression'
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-400/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs text-slate-500 font-medium">Đề xuất diễn đạt</div>
                <div className="text-2xl font-black text-blue-600 mt-0.5">
                  {analysisResult.summary.expressionCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Mạch lạc, trong sáng</div>
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'uncertain' ? 'all' : 'uncertain')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activeFilter === 'uncertain'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs text-slate-500 font-medium">Cần tự xác minh</div>
                <div className="text-2xl font-black text-amber-700 mt-0.5">
                  {analysisResult.summary.uncertainCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Từ hiếm, phương ngữ</div>
              </button>
            </div>
          </div>

          {/* List of Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-600" />
                <span>Chi tiết các đề xuất chỉnh sửa</span>
                <span className="text-xs font-normal text-slate-500">
                  (Hiển thị {filteredItems.length} mục)
                </span>
              </h3>

              {/* Filter tabs */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
                  }`}
                >
                  Tất cả ({analysisResult.items.length})
                </button>
                <button
                  onClick={() => setActiveFilter('spelling')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeFilter === 'spelling' ? 'bg-white text-red-700 shadow-sm font-semibold' : 'text-slate-600'
                  }`}
                >
                  Chính tả ({analysisResult.summary.spellingCount})
                </button>
                <button
                  onClick={() => setActiveFilter('grammar_usage')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeFilter === 'grammar_usage' ? 'bg-white text-purple-700 shadow-sm font-semibold' : 'text-slate-600'
                  }`}
                >
                  Dùng từ ({analysisResult.summary.grammarCount})
                </button>
                <button
                  onClick={() => setActiveFilter('expression')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeFilter === 'expression' ? 'bg-white text-blue-700 shadow-sm font-semibold' : 'text-slate-600'
                  }`}
                >
                  Diễn đạt ({analysisResult.summary.expressionCount})
                </button>
                <button
                  onClick={() => setActiveFilter('uncertain')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeFilter === 'uncertain' ? 'bg-white text-amber-700 shadow-sm font-semibold' : 'text-slate-600'
                  }`}
                >
                  Lưu ý ({analysisResult.summary.uncertainCount})
                </button>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
                <Check className="w-10 h-10 text-teal-500 mx-auto" />
                <h4 className="font-bold text-slate-800">Không có mục nào trong danh mục này</h4>
                <p className="text-xs text-slate-500">
                  {analysisResult.items.length === 0
                    ? 'Chúc mừng! Văn bản của bạn được đánh giá chuẩn xác, không phát hiện lỗi chính tả đáng chú ý.'
                    : 'Hãy chuyển bộ lọc để xem các lỗi trong nhóm khác.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  const isAccepted = !!acceptedMap[item.id];
                  const catInfo = getCategoryInfo(item.category);

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 shadow-sm space-y-3 ${
                        isAccepted
                          ? 'border-teal-200 ring-1 ring-teal-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${catInfo.badgeClass}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${catInfo.dotClass}`} />
                            {catInfo.label}
                          </span>

                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Độ chắc chắn:{' '}
                            <strong className="text-slate-700">
                              {item.confidence === 'cao'
                                ? 'Cao'
                                : item.confidence === 'trung_binh'
                                ? 'Trung bình'
                                : 'Cần kiểm tra'}
                            </strong>
                          </span>
                        </div>

                        {/* Accept / Reject Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => toggleItemAcceptance(item.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              isAccepted
                                ? 'bg-teal-600 text-white shadow-sm hover:bg-teal-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isAccepted ? 'Đã áp dụng' : 'Áp dụng sửa'}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (isAccepted) toggleItemAcceptance(item.id);
                            }}
                            className={`p-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                              !isAccepted
                                ? 'bg-slate-200 text-slate-800'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                            }`}
                            title="Giữ nguyên từ gốc"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Snippet & Suggestion Pair */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        {/* Original context */}
                        <div className="bg-red-50/60 border border-red-100 rounded-xl p-3 text-xs sm:text-sm space-y-1">
                          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                            Từ gốc trong văn cảnh:
                          </span>
                          <p className="text-slate-800 font-serif">
                            "{item.originalSnippet || item.targetWord}"
                          </p>
                          <div className="pt-1 text-xs">
                            Từ cần lưu ý: <span className="font-bold text-red-600 line-through">{item.targetWord}</span>
                          </div>
                        </div>

                        {/* Suggested replacement */}
                        <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-3 text-xs sm:text-sm space-y-1">
                          <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                            Cách sửa khuyến nghị:
                          </span>
                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="text-slate-400">→</span>
                            <span className="font-bold text-teal-800 text-sm sm:text-base font-serif">
                              {item.suggestedReplacement}
                            </span>
                          </div>
                          <p className="text-[11px] text-teal-700 pt-1">
                            {isAccepted ? '✓ Sẽ thay thế vào văn bản cuối' : '○ Bấm "Áp dụng sửa" để thay đổi'}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Linguistic Explanation */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 space-y-1 leading-relaxed">
                        <strong className="text-slate-900 font-semibold flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                          Căn cứ & Giải thích:
                        </strong>
                        <p>{item.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Side-by-side / Before vs After Comparison */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Split className="w-4 h-4 text-teal-600" />
                  Đối chiếu văn bản trước và sau khi sửa
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Văn bản sau khi áp dụng các đề xuất đã chọn
                </h3>
              </div>

              {/* Action Buttons for Revised Text */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyRevised}
                  className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copySuccess ? 'Đã sao chép!' : 'Sao chép văn bản sau sửa'}</span>
                </button>

                <button
                  onClick={handleRecheckWithRevised}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 transition cursor-pointer"
                  title="Đưa văn bản sau khi sửa vào kiểm tra lại một lượt nữa"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Kiểm tra lại</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Văn bản gốc ban đầu
                  </span>
                  <span className="text-xs text-slate-400">
                    {analysisResult.originalText.length} ký tự
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-wrap min-h-[160px]">
                  {analysisResult.originalText}
                </div>
              </div>

              {/* Revised */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5 text-teal-600" />
                    Văn bản đã chuẩn hóa
                  </span>
                  <span className="text-xs text-teal-700 font-medium">
                    {revisedText.length} ký tự
                  </span>
                </div>
                <div className="p-4 bg-teal-50/40 rounded-2xl border border-teal-200 text-slate-900 text-sm sm:text-base leading-relaxed font-serif font-medium whitespace-pre-wrap min-h-[160px]">
                  {revisedText}
                </div>
              </div>
            </div>

            {/* Note on ethics */}
            <div className="bg-slate-50 rounded-xl p-3.5 text-xs text-slate-500 border border-slate-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                <strong>Cam kết nguyên tắc:</strong> VietChuan AI chỉ thay thế các từ ngữ mà bạn chủ động bấm chấp nhận.
                Nếu văn bản có tên người, địa danh riêng hoặc từ cổ mang sắc thái sáng tác, bạn có quyền từ chối sửa để bảo lưu phong cách cá nhân.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
