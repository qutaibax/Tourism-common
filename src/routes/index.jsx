import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AddHotelForm from "../features/hotels/pages/AddHotel";
import AddRoomForm from "../features/hotels/pages/AddRoom";
import AddRestaurant from "../features/restaurants/pages/AddResturant";
// مكون مؤقت للعرض فقط
const Placeholder = ({ title }) => (
  <div style={{ padding: "20px" }}>
    <h1>{title}</h1>
  </div>
);

const router = createBrowserRouter([
  {
    
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        // نجعل الـ Layout هو "الأب" الفعلي للمسارات
        element: <AdminLayout />,

        children: [
          // الآن، كل هؤلاء سيظهرون داخل الـ Outlet في AdminLayout
          { path: "places", element: <Placeholder title="Places Admin" /> },

          {
            path: "hotels",
            children: [
              // هذا سيظهر عند الدخول على /hotels
              {
                index: true,
                element: <Placeholder title="جدول الفنادق الرئيسي" />,
              },
              // هذا سيظهر عند الدخول على /hotels/add
              { path: "add", element: <AddHotelForm /> },
              { path: "add-room", element: <AddRoomForm /> },
            ],
          },

          { path: "flights", element: <Placeholder title="Flights Admin" /> },
          { path: "cars", element: <Placeholder title="Cars Admin" /> },
          {
        path: "restaurants",
        children: [
          { index: true,element: <Placeholder title="Restaurants Admin" /> }, // يفتح عند /restaurants
          { path: "add", element: <AddRestaurant/> },           // يفتح عند /restaurants/add
        ],
      },
          { path: "superadmin", element: <Placeholder title="Super Admin" /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
]);

export default router;
