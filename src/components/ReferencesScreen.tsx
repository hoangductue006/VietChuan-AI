import React from 'react';
import { ScreenType } from '../types';
import { VERIFIED_REFERENCES } from '../data/references';
import {
  FileText,
  ShieldCheck,
  ExternalLink,
  BookMarked,
  CheckCircle2,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface ReferencesScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ReferencesScreen: React.FC<ReferencesScreenProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-1">
              <BookMarked className="w-3.5 h-3.5" />
              Tài liệu & Căn cứ khoa học
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Danh mục nguồn tham khảo chính thống
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              5 nguồn đã xác minh thực tế
            </span>
          </div>
        </div>
        <p className="text-slate-600 text-sm mt-1">
          Toàn bộ quy tắc chính tả, phân biệt từ Hán-Việt và ngân hàng câu hỏi trên VietChuan AI đều được đối chiếu cẩn trọng
          dựa trên các công trình từ điển, văn bản quy phạm pháp luật và giáo trình học thuật uy tín của Việt Nam.
        </p>
      </div>

      {/* List of 5+ Authentic Sources */}
      <div className="space-y-6">
        {VERIFIED_REFERENCES.map((ref, idx) => (
          <div
            key={ref.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:border-teal-200 transition space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                    {ref.category}
                  </span>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Đã xác minh
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-1 font-serif">
                  {ref.title}
                </h3>
                <p className="text-xs sm:text-sm text-teal-800 font-medium">
                  {ref.authorOrOrg} • <span className="text-slate-500 font-normal">{ref.yearOrEdition}</span>
                </p>
              </div>

              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl font-semibold transition shrink-0 self-start sm:self-auto"
                >
                  <span>Truy cập trang nguồn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Mô tả giá trị học thuật:</strong>
              <p>{ref.description}</p>
            </div>

            {/* Applied Aspects in VietChuan AI */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
              <strong className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Nội dung và phạm vi áp dụng trong ứng dụng:
              </strong>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {ref.appliedAspects.map((aspect, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-0.5">✓</span>
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Note about transparency */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 border border-slate-800">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-base">
          <ShieldCheck className="w-5 h-5" />
          <span>Nguyên tắc minh bạch & Kiểm chứng nguồn</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          VietChuan AI kiên quyết <strong>không tạo dữ liệu tham khảo giả</strong>, không bịa đặt tên tài liệu hoặc đường dẫn mạng.
          Mỗi đề xuất sửa hay câu hỏi trắc nghiệm đều được liên kết trực tiếp với các tài liệu chính thống nêu trên.
          Người dùng và các nhà nghiên cứu có thể độc lập tra cứu để đối chiếu tính xác thực.
        </p>
      </div>

      {/* Back to Home & Checker */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('checker')}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl shadow-md transition cursor-pointer text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Trở lại kiểm tra văn bản</span>
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition cursor-pointer text-sm"
        >
          <span>Về trang chủ</span>
        </button>
      </div>
    </div>
  );
};
