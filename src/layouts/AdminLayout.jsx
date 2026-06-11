import React from "react";
import { Outlet } from "react-router-dom"; // 1. استيراد الـ Outlet لحقن الصفحات ديناميكياً
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AdminProvider } from "../context/AdminContext";

export default function AdminLayout() {
  return (
    <AdminProvider>
       {/* قفل الشاشة بالكامل ومنع التمرير الخارجي */}
      <div className="flex h-screen w-screen bg-slate-50 font-sans antialiased text-slate-900 overflow-hidden">
        {/* السايدبار ثابت ويأخذ كامل ارتفاع الشاشة المقفلة h-full */}
        <aside className="w-64 h-full flex-shrink-0 bg-[#0b0f19] border-r border-slate-800 hidden md:block">
          <Sidebar />
        </aside>

        {/* الجزء الأيمن (الهيدر العلوي + منطقة الصفحات المتغيرة) */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* شريط التنقل العلوي الثابت */}
          <Navbar />

          {/* حصر التمرير (Scroll) داخل هذا الصندوق فقط لكي لا يتحرك السايدبار */}
          <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              {/* 2. هنا السحر! الـ Outlet يخبر الراوتر بحقن الصفحات (مثل AddHotel) في هذه المساحة بالضبط */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
