import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  FileText,
  Search,
  GraduationCap,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: <BookOpen className="w-4 h-4" /> },
    {
      id: 'checker',
      label: 'Kiểm tra văn bản',
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: 'AI',
    },
    { id: 'dictionary', label: 'Tra cứu từ ngữ', icon: <Search className="w-4 h-4" /> },
    { id: 'practice', label: 'Luyện tập chính tả', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'about', label: 'Giới thiệu', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'references', label: 'Nguồn tham khảo', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-teal-500 via-teal-400 to-emerald-400 p-0.5 shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-black text-xl text-teal-400 select-none">V</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  VietChuan <span className="text-teal-400 font-bold">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-teal-950/80 text-teal-300 border border-teal-800/80 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  Phi lợi nhuận
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 font-medium">
                Trợ lý chuẩn chính tả tiếng Việt
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('checker')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-sm shadow-teal-500/25 transition hover:shadow-teal-500/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>Kiểm tra ngay</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn">
          <div className="py-2 px-3 bg-slate-800/60 rounded-lg mb-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Dự án cộng đồng vì sự trong sáng tiếng Việt</span>
            <span className="text-teal-400 font-semibold">Miễn phí 100%</span>
          </div>
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-teal-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs font-bold bg-teal-500 text-slate-950 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
