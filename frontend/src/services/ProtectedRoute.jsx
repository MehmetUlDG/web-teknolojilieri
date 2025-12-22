import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute=({children,adminOnly=false})=>{
    const{isAuthenticated, user}=useSelector(state=>state);
    if(!isAuthenticated){
        return <Navigate to ="/login"/>;
    }
    if (isAuthenticated&&user?.role!=="admin"){
       return <Navigate to ="/admin"/>;
    }
    return children;
}

export default ProtectedRoute;