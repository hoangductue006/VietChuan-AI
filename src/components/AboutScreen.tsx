import React from 'react';
import { ScreenType } from '../types';
import {
  User,
  GraduationCap,
  Sparkles,
  Heart,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Building,
} from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-4 sm:py-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          Hồ sơ dự án & Đội ngũ thực hiện
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Giới thiệu về VietChuan AI
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Trợ lý chuẩn chính tả và trau dồi tiếng Việt – Một sáng kiến phi lợi nhuận vì cộng đồng.
        </p>
      </div>

      {/* Author & Academic Info Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                Người thực hiện dự án
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Hoàng Đức Tuệ</h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-teal-300">
              MSSV: PH60473
            </span>
            <span className="px-3 py-1 bg-teal-950 border border-teal-800 rounded-lg text-xs font-semibold text-teal-300">
              Nhóm: Nhóm 1
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              Cơ sở đào tạo & Doanh nghiệp hợp tác
            </span>
            <p className="font-semibold text-white">Trường Cao đẳng FPT Polytechnic</p>
            <p className="text-slate-300 text-xs flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-teal-400" />
              Doanh nghiệp đồng hành: <strong>IMTA TECH</strong>
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-teal-400" />
              Chương trình thực hiện
            </span>
            <p className="font-semibold text-white">Thực tập sinh Doanh nghiệp – Đợt 15</p>
            <p className="text-slate-300 text-xs">
              Sản phẩm ứng dụng công nghệ AI vào giải quyết vấn đề văn hóa - ngôn ngữ thực tiễn.
            </p>
          </div>
        </div>
      </div>

      {/* Purpose & Community Mission */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          <span>Mục tiêu và Ý nghĩa cộng đồng của sản phẩm</span>
        </div>
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            Tiếng Việt là tài sản văn hóa vô giá của dân tộc. Tuy nhiên, trong thời đại bùng nổ của mạng xã hội,
            các lỗi chính tả (nhầm lẫn s/x, tr/ch, d/gi, hỏi/ngã) và hiện tượng dùng sai các từ Hán-Việt hay quán ngữ
            (như “sáng lạng”, “chuẩn đoán”, “yếu điểm”, “vô hình chung”) đang ngày càng xuất hiện phổ biến trong bài luận,
            báo cáo và văn bản truyền thông.
          </p>
          <p>
            <strong>VietChuan AI</strong> ra đời với tôn chỉ là một công cụ <strong>phi lợi nhuận, hoàn toàn miễn phí và không quảng cáo</strong>:
          </p>
          <ul className="space-y-2 pt-1 text-sm list-disc list-inside text-slate-800">
            <li>
              <strong>Hỗ trợ học sinh, sinh viên:</strong> Tự rà soát các bài tập, đồ án, luận văn để tránh những lỗi chính tả cơ bản, nâng cao chất lượng văn phong học thuật.
            </li>
            <li>
              <strong>Hỗ trợ cán bộ, giáo viên, người soạn thảo văn bản:</strong> Có một kênh đối chiếu chuẩn xác, tiết kiệm thời gian soát lỗi trước khi ban hành thông báo hoặc xuất bản bài viết.
            </li>
            <li>
              <strong>Giáo dục nhận thức:</strong> Không chỉ sửa từ sai, mà còn phân tích cặn kẽ “vì sao sai” và “căn cứ từ điển ở đâu”, giúp người dùng nâng cao năng lực ngôn ngữ một cách tự nhiên.
            </li>
            <li>
              <strong>Gìn giữ sự trong sáng của tiếng Việt:</strong> Góp phần tôn vinh nét đẹp, sự phong phú và chuẩn mực của ngôn ngữ dân tộc trong không gian số hóa.
            </li>
          </ul>
        </div>
      </div>

      {/* Role of Gemini AI */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>Vai trò của Mô hình Gemini trong VietChuan AI</span>
        </div>
        <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
          <p>
            Khác với các bộ gõ hay công cụ kiểm tra chính tả truyền thống dựa trên danh sách từ đơn lẻ (thường dễ bị báo sai khi gặp từ ghép mới hoặc từ địa phương),
            <strong> mô hình Gemini (phiên bản Gemini 3.8 Flash)</strong> đóng vai trò là một bộ máy xử lý ngôn ngữ tự nhiên hiểu sâu ngữ cảnh:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">Hiểu ngữ cảnh câu hoàn chỉnh</h4>
              <p className="text-xs text-slate-600">
                Phân biệt được “giành giật” (tranh đấu) với “dành dụm” (cất giữ), phân biệt “chẩn đoán” (khám bệnh) với “chuẩn xác”.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">Phân loại 4 nhóm khoa học</h4>
              <p className="text-xs text-slate-600">
                Tự động bóc tách giữa lỗi chính tả thực sự, lỗi dùng từ Hán-Việt, đề xuất phong cách câu và các trường hợp chưa đủ căn cứ cần người dùng tự kiểm tra.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">Tôn trọng phong cách tác giả</h4>
              <p className="text-xs text-slate-600">
                Được chỉ định nguyên tắc nghiêm ngặt: không tự ý thay đổi giọng văn, đại từ xưng hô hay tư tưởng của người viết.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">Bảo mật trên máy chủ</h4>
              <p className="text-xs text-slate-600">
                Mọi lệnh gọi mô hình đều thực hiện qua cổng API máy chủ bảo mật, không để lộ thông tin xác thực lên trình duyệt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ethical Commitment */}
      <div className="bg-teal-50 border border-teal-200 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-teal-900 font-bold text-base">
          <Shield className="w-5 h-5 text-teal-700" />
          <span>Cam kết đạo đức & Giới hạn công nghệ</span>
        </div>
        <p className="text-xs sm:text-sm text-teal-800 leading-relaxed">
          VietChuan AI là một công cụ hỗ trợ và khuyến nghị học thuật, không thay thế hoàn toàn vai trò của các nhà ngôn ngữ học,
          hội đồng biên tập hay từ điển chuyên ngành quốc gia. Chúng tôi luôn khuyến khích người dùng đối chiếu lại với các nguồn
          tài liệu tham khảo chính thống khi cần thẩm định các văn bản mang tính pháp lý cao.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('checker')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl shadow-md transition cursor-pointer text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Thử nghiệm công cụ kiểm tra</span>
        </button>
        <button
          onClick={() => onNavigate('references')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition cursor-pointer text-sm"
        >
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>Xem các nguồn tham khảo chính thống</span>
        </button>
      </div>
    </div>
  );
};
