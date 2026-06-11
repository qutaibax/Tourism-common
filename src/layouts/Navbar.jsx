import React from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function Navbar() {
  // قراءة العنوان الحالي ديناميكياً
  const { currentTitle, adminType } = useAdmin();

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 block">
          {adminType === "hotel" ? "Hotel Property" : "Food & Beverage"}
        </span>
        {/* تحديث محتوى العنوان تلقائياً بناءً على حالة الصفحة النشطة */}
        <h2 className="text-xl font-bold text-slate-900 mt-0.5">
          {currentTitle}
        </h2>
      </div>

      {/* جهة الأدوات والبحث والبروفايل */}
      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-4 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search panels..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-xs focus:outline-none focus:border-red-400 focus:bg-white transition-all"
          />
        </div>
        <button className="relative p-2.5 bg-slate-950 text-white rounded-full hover:bg-slate-900 transition-colors shadow-sm">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}
