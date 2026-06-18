import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    
    const isAuthenticated = true; 

    if (!isAuthenticated) {
        return <Navigate to="/register" replace />;
    }

    // إذا كان مسجلاً، اترك البوابة مفتوحة ليمر "الأبناء" (Children)
    return <Outlet />;
};

export default ProtectedRoute;