import { Layout, Menu} from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/Admin.routes";
import { facultyPath } from "../../routes/Faculty.routes";
import { useAppSelector } from "../../redux/hooks";
import { studentPath } from "../../routes/Student.routes";
import { varifyToken } from "../../utils/varifyToken";
import { TUser } from "../../redux/features/Auth/AuthSlice";

const { Sider } = Layout;

const Sidebar = () => {

    const userrole={
        ADMIN:"admin",
        FACULTY:"faculty",
        STUDENT:"user"
    }

    const {token}=useAppSelector((state)=>state.auth);
    let user;
    if(token)
    {
        user=varifyToken(token) as TUser;
    }
    let sidebaritems;
   
    switch (user?.role) {
        case userrole.ADMIN:
            sidebaritems=sidebarItemGenerator(adminPaths,userrole.ADMIN)
            break;
        case userrole.FACULTY:
            sidebaritems= sidebaritems=sidebarItemGenerator(facultyPath,userrole.FACULTY);
            break;
        case userrole.STUDENT:
            sidebaritems= sidebaritems=sidebarItemGenerator(studentPath,userrole.STUDENT);
            break;
    
        default:
            break;
    }
    return (
        <>
            <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{color:"white", textAlign:"center", height:"3rem",display:"flex",justifyContent:"center",alignItems:"center"}} >
            <h1>Ph-University</h1>
             </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebaritems} />
      </Sider>
        </>
    );
};

export default Sidebar;