import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // استيراد الموفر الجديد
import "./index.css";
import router from "./routes"; // استيراد الخريطة التي أنشأناها في مجلد routes
// import AdminLogin from "./features/Auth/pages/AdminLogin";
import AddTrip from "./features/superadmin/pages/AddTrip";
import AdminRegister from "./features/Auth/pages/AdminRegister";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <AdminLogin /> */}
    {/* <AdminRegister/> */}
    {/* <AddTrip /> */}
  </StrictMode>,
);
