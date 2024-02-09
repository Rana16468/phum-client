import { Button, Layout,} from "antd";
import {  Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/Auth/AuthSlice";

// import { Content, Footer, Header } from "antd/es/layout/layout";
//https://ant.design/components/layout#component-overview
 //import Slider from 'antd/es/layout/Sider'
const { Header, Content } = Layout;
/*const items:MenuProps["items"] = [
    {key:"Dashboard",label:<NavLink to="/admin/dashboard">Dashboard</NavLink>},
    {key:"User Management",label:"User Management",
    children:[
    {key:"Create Admin",label:<NavLink to="/admin/create-admin">Create Admin</NavLink>},
    {key:"Create Faculty",label:<NavLink to="/admin/create-faculty">Create Faculty</NavLink>},
    {key:"Create Student",label:<NavLink to="/admin/create-student">Create Student</NavLink>}
    ]},
    
]*/






const MainLayout = () => {


  const dispatch=useAppDispatch();

  const handelLogOut=()=>{

    dispatch(logout());


  }
    return (
        <>

<Layout style={{height:"100%"}}>
      <Sidebar/>
      <Layout>
        <Header  style={{ padding: 0 }}>
          <Button   onClick={handelLogOut}>LogOut</Button>
          
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360
            
            }}
          >
          <Outlet/>
          </div>
        </Content>
       
      </Layout>
    </Layout>
            
        </>
    );
};

export default MainLayout;