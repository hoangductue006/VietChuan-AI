import React from 'react';
import { ScreenType } from '../types';
import { Heart, Shield, BookMarked, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-serif font-bold text-lg">
                V
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                VietChuan <span className="text-teal-400 font-bold">AI</span>
              </span>
            </div>
            <p className="text-teal-300/90 font-medium italic text-sm">
              “Viết đúng chính tả, diễn đạt rõ ràng, gìn giữ tiếng Việt”
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Sản phẩm học thuật phi lợi nhuận phục vụ cộng đồng, học sinh, sinh viên và người Việt khắp nơi.
              Hỗ trợ phân tích, sửa chữa chính tả và cải thiện ngữ văn dựa trên nền tảng ngôn ngữ học chính thống
              kết hợp mô hình trí tuệ nhân tạo Gemini.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-teal-300 px-3 py-1 rounded-full">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                Phi lợi nhuận • 100% Miễn phí
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Không quảng cáo • Bảo mật dữ liệu
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Chức năng chính
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('checker')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Kiểm tra văn bản bằng AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dictionary')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Tra cứu từ điển & cặp từ dễ nhầm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('practice')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Luyện tập trắc nghiệm chính tả
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('references')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Nguồn căn cứ & Từ điển tham khảo
                </button>
              </li>
            </ul>
          </div>

          {/* Project info */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Thông tin dự án
            </h4>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-xs space-y-1.5 leading-relaxed">
              <p className="text-slate-300 font-semibold">
                Thực hiện: <span className="text-white font-bold">Hoàng Đức Tuệ</span>
              </p>
              <p className="text-slate-400">
                Mã sinh viên: <span className="text-teal-300 font-mono">PH60473</span>
              </p>
              <p className="text-slate-400">
                Nhóm thực hiện: <span className="text-slate-200">Nhóm 1</span>
              </p>
              <p className="text-slate-400 pt-1 border-t border-slate-800/80">
                Chương trình: Thực tập sinh Đợt 15,{' '}
                <span className="text-slate-300">FPT Polytechnic</span> và{' '}
                <span className="text-slate-300">IMTA TECH</span>
              </p>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 hover:underline pt-1"
            >
              <BookMarked className="w-3.5 h-3.5" />
              Xem chi tiết trang Giới thiệu & Sứ mệnh
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} VietChuan AI. Phát triển vì tình yêu với sự trong sáng của tiếng Việt.</p>
          <p className="flex items-center gap-1">
            Ứng dụng mở cho mọi trình duyệt máy tính và điện thoại.
          </p>
        </div>
      </div>
    </footer>
  );
};
