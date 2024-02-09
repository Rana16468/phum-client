import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/student/About";
import Contract from "../pages/student/Contract";
import Login from "../pages/student/Login";
import Register from "../pages/student/Register";
import { adminPaths } from "./Admin.routes";
import {routerGenerator} from "../utils/routerGenerator";
import { facultyPath } from "./Faculty.routes";

//https://reactrouter.com/en/main/routers/create-browser-router
//https://ant.design/components/layout#component-overview



const router =createBrowserRouter([
    {path:"/",element:<App/>,
    children:[
    {path:"about",element:<About/>},
    {path:"contract",element:<Contract/>}
   ]},

   {path:"/admin",element:  <App/>,
    children:routerGenerator(adminPaths)},
    {path:"/faculty",element:<App/>,
    children:routerGenerator(facultyPath)},
    {path:"/student",element:<App/>,
    children:routerGenerator(adminPaths)},

   {path:"/login", element:<Login/>},
   {path:"/register",element:<Register/>}
]);

export default router