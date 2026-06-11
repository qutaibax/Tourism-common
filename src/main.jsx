import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // استيراد الموفر الجديد
import "./index.css";
import router from "./routes"; // استيراد الخريطة التي أنشأناها في مجلد routes

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* RouterProvider هو الذي سيعرض التطبيق بناءً على خريطة المسارات */}
    <RouterProvider router={router} />
  </StrictMode>
);