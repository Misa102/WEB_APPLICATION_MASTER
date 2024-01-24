import { Navigate, useLocation } from "react-router-dom";
import authUtils from "../../utils/auth.util";

const PrivateRoute = ({ children }) => {
    let location = useLocation();

    const isAdmin = authUtils.isAdmin();
    const isLogin = authUtils.isLogin();

    if (!isAdmin) {
        if(isLogin) {
            return <Navigate to="/" state={{ from: location }} />;
        } 
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;
