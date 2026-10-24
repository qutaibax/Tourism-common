import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AddHotelForm from "../features/hotels/pages/AddHotel";
import AddRoomForm from "../features/hotels/pages/AddRoom";
import AddRestaurant from "../features/restaurants/pages/AddResturant";
import RestaurantDetailsAdmin from "../features/restaurants/pages/RestaurantDetailsAdmin";
import AdminRegister from "../features/Auth/pages/AdminRegister";
import AdminLogin from "../features/Auth/pages/AdminLogin";
import AddTrip from "../features/superadmin/pages/AddTrip";

const Placeholder = ({ title }) => (
  <div style={{ padding: "20px" }}>
    <h1>{title}</h1>
  </div>
);

const router = createBrowserRouter([
  // 1. المسار الرئيسي للموقع نخليه يوجه تلقائياً للـ login إذا لم يكن مسجلاً
  {
    path: "/",
    element: localStorage.getItem("token") ? (
      <Navigate to="/hotels" replace />
    ) : (
      <Navigate to="/register" replace />
    ),
  },

  // 2. تجميع كل مسارات الأدمن المحمية تحت مظلة حماية واحدة والـ Layout الخاص بها
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "places", element: <Placeholder title="Places Admin" /> },

      // مسارات الفنادق (محمية لآدمن الفنادق فقط)
      {
        path: "hotels",
        element: (
          <ProtectedRoute allowedRole="super" fallbackPath="/hotels">
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Placeholder title="جدول الفنادق الرئيسي" />,
          },
          { path: "add", element: <AddHotelForm /> },
          { path: "add-room", element: <AddRoomForm /> },
        ],
      },

      { path: "flights", element: <Placeholder title="Flights Admin" /> },
      { path: "cars", element: <Placeholder title="Cars Admin" /> },

      // مسارات المطاعم (محمية لآدمن المطاعم فقط)
      {
        path: "restaurants",
        element:(
          <ProtectedRoute allowedRole="resturant">
            <Outlet/>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element:  <RestaurantDetailsAdmin />  },
          { path: "add", element: <AddRestaurant /> },
          { path: "details", element: <RestaurantDetailsAdmin /> },
          {path: "dashboard", element: <Placeholder title="Restaurant Dashboard" />},
        
        ],
      },
      { path: "superadmin", element:<AddTrip/> },
    ],
  },

  // 3. مسارات الحسابات (مفتوحة تماماً خارج الحماية)
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/register",
    element: <AdminRegister />,
  },
]);

export default router;
