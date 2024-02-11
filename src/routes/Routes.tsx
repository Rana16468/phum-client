import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/student/About";
import Contract from "../pages/student/Contract";
import Login from "../pages/student/Login";
import Register from "../pages/student/Register";
import { adminPaths } from "./Admin.routes";
import {routerGenerator} from "../utils/routerGenerator";
import { facultyPath } from "./Faculty.routes";
import { studentPath } from "./Student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/student/ChangePassword";

//https://reactrouter.com/en/main/routers/create-browser-router
//https://ant.design/components/layout#component-overview



const router =createBrowserRouter([
    {path:"/",element:<App/>,
    children:[
    {path:"about",element:<About/>},
    {path:"contract",element:<Contract/>}
   ]},

   {path:"/admin",element:  <ProtectedRoute role="admin"><App/></ProtectedRoute>,
    children:routerGenerator(adminPaths)},
    {path:"/faculty",element:<ProtectedRoute role="faculty"><App/></ProtectedRoute>,
    children:routerGenerator(facultyPath)},
    {path:"/user",element:<ProtectedRoute role="user"><App/></ProtectedRoute>,
    children:routerGenerator(studentPath)},
    {path:"/change-password",element:<ChangePassword/>},

   {path:"/login", element:<Login/>},
   {path:"/register",element:<Register/>}
]);

export default router