import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { TUser, logout } from "../../redux/features/Auth/AuthSlice";
import { varifyToken } from "../../utils/varifyToken";

type TProtectedRoute={
    children:ReactNode;
    role:string | undefined;
}
const ProtectedRoute = ({children,role}:TProtectedRoute) => {


   
    const dispatch=useAppDispatch();
    const {token}=useAppSelector((state)=>state.auth);
    let user;
    if(token)
    {
        user=varifyToken(token) as TUser;
    }
   
    if(role!==undefined && user?.role!==role)
    {
        dispatch(logout());
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(!token)
    {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children
};

export default ProtectedRoute;