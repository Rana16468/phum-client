
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudents";
import OfferedCourse from "../pages/faculty/OfferedCourse";



export const facultyPath=[

    {
        name:"Dashboard",
        path:"dashboard",
        element:<FacultyDashboard/>
    },
    {
        name:"Offered Course",
        path:"offered-course",
        element:<OfferedCourse/>
    },
    {
        name:"My-Courses",
        path:"my-courses",
        element:<MyCourses/>
    },
    
    {
    
        path:"courses/:registeredSemesterId/:courseId",
        element:<MyStudents/>
    }
    
]