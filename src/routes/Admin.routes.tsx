
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/admin/UserManagement/CreateStudent";

import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import StudentData from "../pages/admin/UserManagement/StudentData";
import StudentDetails from "../pages/admin/UserManagement/StudentDetails";
import StudentUpdate from "../pages/admin/UserManagement/StudentUpdate";
import RegisteredSemester from "../pages/admin/CourseManagement/RegisteredSemester";
import Course from "../pages/admin/CourseManagement/Course";
import CreateCourse from "../pages/admin/CourseManagement/CreateCourse";
import OfferedCourse from "../pages/admin/CourseManagement/OfferedCourse";
import SemesterRegistration from "../pages/admin/CourseManagement/SemesterRegistration";



export const adminPaths=[
   { name:"Dashboard",path:"dashboard",element:<AdminDashboard/>},
   {
    name:"Academic Management",
    children:[
        { name:"Create A.Semester",path:"create-academic-semester",element:<CreateAcademicSemester/>},
        { name:"Academic Semester",path:"academic-semester",element:<AcademicSemester/>},
        { name:"Create A.Faculty",path:"create-academic-faculty",element:<CreateAcademicFaculty/>},
        { name:"Academic Faculty",path:"academic-faculty",element:<AcademicFaculty/>},
        { name:"Create A.Department",path:"create-academic-department",element:<CreateAcademicDepartment/>},
        { name:"AcademicDepartment",path:"academic-department",element:<AcademicDepartment/>},
        
    ]


   },

   {
    name:"User Management",
    children:[
        { name:"Create Admin",path:"create-admin",element:<CreateAdmin/>},
        { name:"Create Faculty",path:"create-faculty",element:<CreateFaculty/>},
        { name:"Create Student",path:"create-student",element:<CreateStudent/>},
        { name:"Students",path:"student-data",element:<StudentData/>},
        { path:"student-details/:studentId",element:<StudentDetails/>},
        {path:"student-update/:studentId",element:<StudentUpdate/>},
        { name:"Create Member",path:"create-member",element:<CreateStudent/>},
    ]
    
   },
   {
    name:"Course Management",
    children:[
        {name:"Semester Registration",path:"semester-registration",element:<SemesterRegistration/>},
        { name:"Registered Semester",path:"registered-semester",element:<RegisteredSemester/>},
        { name:"Create Course",path:"create-course",element:<CreateCourse/>},
        { name:"Course",path:"course",element:<Course/>},
        { name:"Offer Course",path:"offer-course",element:<OfferedCourse/>}
       
    ]
    
   }
]

//admin side bar item 
/*export const adminSidebarItems=adminPaths.reduce((acc:TSidebarItem[],item)=>{
    
    if(item.name && item.path)
    {
        acc.push({key:item.name,label:<NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>})
    }
    
    if(item.children)
    {
        acc.push({
            key:item.name,
            label:item.name,
            children:item?.children?.map((child)=>({
                key:child.name,
                label:<NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
            }))

        })
    }
    return acc


},[]);




export const adminRoutes = adminPaths.reduce((acc:TRoute[], item) => {
    if (item.children) {
      // If there are children, recursively flatten them
      const childrenPaths = item.children.map(child => ({
        path: child.path,
        element: child.element,
      }));
      
      acc.push(...childrenPaths);
    } else {
      // If no children, add the current item to the result
      acc.push({ path: item.path , element: item.element });
    }
    return acc;
  }, []);*/


