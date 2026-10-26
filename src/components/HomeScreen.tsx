import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  CheckCircle2,
  Search,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Split,
  HelpCircle,
  Award,
  Layers,
  FileCheck2,
  HeartHandshake,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onTrySampleText?: (sampleText: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onTrySampleText }) => {
  const [activeTabExample, setActiveTabExample] = useState<'hoc_tap' | 'cong_viec' | 'mang_xa_hoi'>('hoc_tap');

  const comparisonExamples = {
    hoc_tap: {
      category: 'Bài tập học sinh - sinh viên',
      original:
        'Em rất mong sau khi tốt nghiệp sẽ có một tương lai sáng lạng. Dù đề tài nghiên cứu còn một số yếu điểm, nhóm em sẽ cố gắng bổ xung số liệu và chuẩn đoán các nguyên nhân sai số.',
      corrected:
        'Em rất mong sau khi tốt nghiệp sẽ có một tương lai xán lạn. Dù đề tài nghiên cứu còn một số điểm yếu, nhóm em sẽ cố gắng bổ sung số liệu và chẩn đoán các nguyên nhân sai số.',
      changes: [
        { from: 'sáng lạng', to: 'xán lạn', type: 'Chính tả Hán-Việt', note: 'Từ gốc Hán là 燦爛 (xán: rực rỡ, lạn: sáng tỏ)' },
        { from: 'yếu điểm', to: 'điểm yếu', type: 'Dùng từ sai nghĩa', note: 'Yếu điểm là điểm trọng yếu; điểm khiếm khuyết phải dùng điểm yếu/nhược điểm' },
        { from: 'bổ xung', to: 'bổ sung', type: 'Chính tả s/x', note: 'Bổ sung (thêm vào cho đủ); xung trong xung phong, xung đột' },
        { from: 'chuẩn đoán', to: 'chẩn đoán', type: 'Dùng từ sai nghĩa', note: 'Chẩn là khám xét, xem xét (chẩn đoán, chẩn bệnh)' },
      ],
    },
    cong_viec: {
      category: 'Hành chính & công sở',
      original:
        'Ban Giám đốc đã thống nhất phương án sát nhập hai phòng ban. Việc ký kết hợp đồng diễn ra rất suông sẻ, rốt cục công ty cũng đạt được thỏa thuận cọ sát với đối tác quốc tế.',
      corrected:
        'Ban Giám đốc đã thống nhất phương án sáp nhập hai phòng ban. Việc ký kết hợp đồng diễn ra rất suôn sẻ, rốt cuộc công ty cũng đạt được thỏa thuận cọ xát với đối tác quốc tế.',
      changes: [
        { from: 'sát nhập', to: 'sáp nhập', type: 'Chính tả văn bản', note: 'Sáp (揷) là cài ghép, lồng vào nhau thành một thể thống nhất' },
        { from: 'suông sẻ', to: 'suôn sẻ', type: 'Chính tả vần', note: 'Suôn trong suôn mượt, trôi chảy; suông là trống rỗng, nói suông' },
        { from: 'rốt cục', to: 'rốt cuộc', type: 'Chính tả từ', note: 'Rốt cuộc là từ chuẩn mực trong từ điển và văn bản học thuật' },
        { from: 'cọ sát', to: 'cọ xát', type: 'Chính tả s/x', note: 'Cọ xát là cọ qua lại tạo ma sát, rèn luyện thực tế' },
      ],
    },
    mang_xa_hoi: {
      category: 'Bài đăng mạng xã hội & giao tiếp',
      original:
        'Những phát ngôn bốc đồng vô hình chung đã gây hiểu lầm nghiêm trọng. Nhiều người chỉ chăm chăm dành giật sự chú ý mà bàng quang trước những giá trị nhân văn cốt lõi.',
      corrected:
        'Những phát ngôn bốc đồng vô hình trung đã gây hiểu lầm nghiêm trọng. Nhiều người chỉ chăm chăm giành giật sự chú ý mà bàng quan trước những giá trị nhân văn cốt lõi.',
      changes: [
        { from: 'vô hình chung', to: 'vô hình trung', type: 'Quán ngữ', note: 'Trung (中) là ở trong lòng sự việc; vô hình trung là ngẫu nhiên sinh ra' },
        { from: 'dành giật', to: 'giành giật', type: 'Phân biệt d/gi', note: 'Tranh chấp, đoạt lấy dùng "giành"; cất giữ, tích lũy dùng "dành"' },
        { from: 'bàng quang', to: 'bàng quan', type: 'Sai từ nghiêm trọng', note: 'Bàng quan (旁觀) là đứng ngoài ngắm nhìn thờ ơ; bàng quang là bọng đái' },
      ],
    },
  };

  const handleTestExample = (text: string) => {
    if (onTrySampleText) {
      onTrySampleText(text);
    }
    onNavigate('checker');
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Sản phẩm học thuật phi lợi nhuận phục vụ cộng đồng</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            VietChuan <span className="text-teal-400">AI</span>
          </h1>

          {/* Slogan */}
          <p className="text-lg sm:text-2xl font-serif italic text-teal-200/90 font-medium">
            “Viết đúng chính tả, diễn đạt rõ ràng, gìn giữ tiếng Việt”
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Trợ lý thông minh giúp phát hiện lỗi chính tả, nhận diện cách dùng từ chưa phù hợp và đề xuất
            diễn đạt trong sáng. Không tự ý đổi giọng văn, giải thích cặn kẽ từng lỗi dựa trên căn cứ khoa học từ điển học tiếng Việt.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('checker')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition hover:scale-[1.02] text-sm sm:text-base cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Kiểm tra văn bản ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('dictionary')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition text-sm sm:text-base cursor-pointer"
            >
              <Search className="w-5 h-5 text-teal-400" />
              <span>Tra cứu từ ngữ</span>
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition text-sm sm:text-base cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-teal-400" />
              <span>Luyện tập trắc nghiệm</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              100% Miễn phí & Không quảng cáo
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-400" />
              Dựa trên Từ điển Viện Ngôn ngữ học
            </span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-teal-400" />
              Không thu thập dữ liệu cá nhân
            </span>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Điểm khác biệt của VietChuan AI
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Không đơn thuần là sửa lỗi tự động, chúng tôi đồng hành giúp bạn hiểu sâu bản chất ngữ nghĩa và quy tắc tiếng Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <span className="text-xl">1</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Lỗi chính tả khả năng cao</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nhận diện chính xác nhầm lẫn phụ âm đầu (s/x, tr/ch, d/r/gi), vần (ươc/ươt, ui/uôi) và dấu thanh hỏi/ngã theo phương ngữ.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <span className="text-xl">2</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Dùng từ & Ngữ pháp</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Phát hiện các từ Hán-Việt dùng sai nghĩa (yếu điểm, chẩn đoán, sáp nhập, xán lạn), sai thành ngữ, quán ngữ và câu què cụt.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <span className="text-xl">3</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Đề xuất diễn đạt tự nhiên</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Gợi ý cách viết mạch lạc, gãy gọn, tinh tế hơn cho từng văn cảnh mà vẫn giữ trọn vẹn hồn cốt và giọng điệu của tác giả.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <span className="text-xl">4</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Trường hợp cần tự xác minh</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Không tự ý kết luận sai đối với tên riêng, từ địa phương mang tính văn nghệ hay thuật ngữ chuyên ngành khi chưa đủ cơ sở.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Before & After Showcase */}
      <section className="bg-slate-100/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-2">
              <Split className="w-3.5 h-3.5" />
              Minh họa đối chiếu
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Ví dụ thực tế trước và sau khi rà soát
            </h2>
            <p className="text-sm text-slate-600">
              Quan sát cách VietChuan AI phân tích và đề xuất sửa đổi có căn cứ khoa học.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTabExample('hoc_tap')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTabExample === 'hoc_tap'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Học sinh - Sinh viên
            </button>
            <button
              onClick={() => setActiveTabExample('cong_viec')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTabExample === 'cong_viec'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hành chính - Công việc
            </button>
            <button
              onClick={() => setActiveTabExample('mang_xa_hoi')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeTabExample === 'mang_xa_hoi'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mạng xã hội
            </button>
          </div>
        </div>

        {/* Comparison card */}
        {(() => {
          const ex = comparisonExamples[activeTabExample];
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Original Box */}
                <div className="bg-white rounded-2xl p-5 border border-red-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-red-100 pb-2">
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Văn bản gốc (Chưa kiểm tra)
                    </span>
                    <span className="text-xs text-slate-400 font-medium">4 lỗi phổ biến</span>
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100 font-serif">
                    {ex.original}
                  </p>
                </div>

                {/* Corrected Box */}
                <div className="bg-white rounded-2xl p-5 border border-teal-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      Văn bản sau khi chuẩn hóa
                    </span>
                    <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md">
                      Chuẩn xác 100%
                    </span>
                  </div>
                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-teal-50/50 p-4 rounded-xl border border-teal-100 font-serif font-medium">
                    {ex.corrected}
                  </p>
                </div>
              </div>

              {/* Changes Explanation Details */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-teal-600" />
                    Bảng phân tích chi tiết từng lỗi sửa
                  </h4>
                  <button
                    onClick={() => handleTestExample(ex.original)}
                    className="text-xs text-teal-700 hover:text-teal-900 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    Nạp đoạn văn này vào bộ kiểm tra AI
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {ex.changes.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-red-600 line-through">{c.from}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-teal-700 font-bold">{c.to}</span>
                      </div>
                      <span className="inline-block text-[10px] font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {c.type}
                      </span>
                      <p className="text-slate-600 leading-normal text-[11px]">{c.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4-Step User Guide */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Hướng dẫn sử dụng 4 bước đơn giản
          </h2>
          <p className="text-slate-600 text-sm">
            Dễ dàng cho học sinh, giáo viên, nhân viên văn phòng và người viết nội dung.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center mb-4">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Dán hoặc nhập văn bản</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sao chép đoạn văn từ Word, báo cáo, bài luận hoặc mạng xã hội vào khung nhập liệu thông minh.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center mb-4">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base">Nhấn "Kiểm tra"</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mô hình Gemini đọc ngữ cảnh tổng thể và rà soát lỗi chính tả, dùng từ và mạch lạc câu.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center mb-4">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Duyệt & chọn sửa</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Xem giải thích căn cứ ngôn ngữ. Bạn toàn quyền chấp nhận hoặc từ chối từng đề xuất sửa.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center mb-4">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-base">Sao chép văn bản chuẩn</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              So sánh văn bản trước/sau trực quan và bấm 1 nút để sao chép kết quả đã hoàn thiện để sử dụng.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <section className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-extrabold">
          Sẵn sàng trải nghiệm văn phong tiếng Việt chuẩn mực?
        </h3>
        <p className="text-teal-200/90 text-sm sm:text-base max-w-xl mx-auto">
          Hoàn toàn miễn phí, không cần đăng ký tài khoản, tôn trọng quyền riêng tư của bạn.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('checker')}
            className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition hover:scale-105 text-sm sm:text-base cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mở công cụ kiểm tra ngay</span>
          </button>
        </div>
      </section>
    </div>
  );
};
