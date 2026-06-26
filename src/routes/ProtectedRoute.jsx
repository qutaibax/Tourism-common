import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("AdminRole"); 


  if (!token) {
    console.log("تم الطرد بسبب عدم وجود توكن");
    return <Navigate to="/login" replace />;
  }

  
  if (allowedRole && userRole !== allowedRole) {
    console.log("تم الطرد بسبب عدم تطابق الصلاحية!");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
