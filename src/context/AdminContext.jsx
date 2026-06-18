import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1. استيراد useLocation لمراقبة الرابط الحالي
import { LayoutDashboard, Hotel, Utensils, Plus } from "lucide-react";

const AdminContext = createContext();

const hotelNavigation = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/hotels", label: "All Hotels", icon: Hotel, end: true },
  { path: "/hotels/add", label: "Add Hotel", icon: Plus, end: false },
];

const restaurantNavigation = [
  { path: "/restaurants/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/restaurants/details", label: "Details", icon: LayoutDashboard, end: true },
  { path: "/restaurants", label: "All Restaurants", icon: Utensils, end: true },
  { path: "/restaurants/add", label: "Add Restaurant", icon: Plus, end: false },
];

export function AdminProvider({ children }) {
  const [adminType, setAdminType] = useState("hotel");
  const [currentTitle, setCurrentTitle] = useState("Welcome back");

  const location = useLocation(); // 2. تفعيل مراقب مسار شريط العناوين

  // 3. هذا التاثير الذكي يعيد ضبط نوع الأدمن تلقائياً فور تغير الرابط في المتصفح
  useEffect(() => {
    if (location.pathname.startsWith("/restaurants")) {
      setAdminType("restaurant");
    } else if (
      location.pathname.startsWith("/hotels") ||
      location.pathname === "/dashboard"
    ) {
      setAdminType("hotel");
    }
  }, [location.pathname]); // يعمل التاثير في كل مرة يتغير فيها الـ URL

  const navigation =
    adminType === "hotel" ? hotelNavigation : restaurantNavigation;

  return (
    <AdminContext.Provider
      value={{
        adminType,
        setAdminType,
        navigation,
        currentTitle,
        setCurrentTitle,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
