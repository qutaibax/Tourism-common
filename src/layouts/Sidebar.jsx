import React from "react";
import { NavLink } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { Hotel, Utensils, ShieldAlert } from "lucide-react";

export default function Sidebar() {
  const { navigation, adminType, setAdminType } = useAdmin();

  const linkStyle = ({ isActive }) => {
    const baseClasses =
      "flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all group";
    return isActive
      ? `${baseClasses} bg-red-600 text-white shadow-lg shadow-red-600/10`
      : `${baseClasses} text-slate-400 hover:bg-slate-900/50 hover:text-white`;
  };

  return (
    <div className="w-64 h-full bg-[#0b0f19] text-white flex flex-col justify-between">
      <div>
        {/* الشعار واسم النظام الديناميكي */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-red-600 text-white p-2 rounded-lg shadow-lg/30">
            {adminType === "hotel" ? (
              <Hotel size={20} />
            ) : (
              <Utensils size={20} />
            )}
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none tracking-wide text-white">
              {adminType === "hotel" ? "Hotel Horizon" : "Resto Horizon"}
            </h1>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1 block">
              {adminType === "hotel" ? "HOTEL ADMIN" : "RESTO ADMIN"}
            </span>
          </div>
        </div>

        {/* توليد الروابط ديناميكياً بناءً على نوع الأدمن */}
        <nav className="p-4 space-y-1.5">
          {navigation.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={linkStyle}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className="group-[.text-slate-400]:group-hover:text-red-500 transition-colors"
                  />
                  <span className="text-sm">{link.label}</span>
                </div>
                <span className="text-xs opacity-70">›</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* أداة سحرية أسفل السايدبار للتبديل بين الأدمنز واختبار الكود بنجاح */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/30">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2">
          <ShieldAlert size={14} className="text-red-500" />
          <span>Switch Role (Testing)</span>
        </div>
        <select
          value={adminType}
          onChange={(e) => setAdminType(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg p-2 text-xs outline-none focus:border-red-500 transition"
        >
          <option value="hotel">🏨 Hotel Manager</option>
          <option value="restaurant">🍔 Restaurant Manager</option>
        </select>
      </div>
    </div>
  );
}
