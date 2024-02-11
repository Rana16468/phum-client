import { undefined } from "zod";
import { useMyCourseScheduleQuery } from "../../redux/features/student/studemtCourseManagement.api";


const MySchedule = () => {

    const {data}=useMyCourseScheduleQuery(undefined);
   
   
    return (
        <div>
           {
            data?.data?.map((item,index)=><div key={index}>

                <div>{item?.course?.title}</div>
                <div>{item?.offeredCourse?.section} </div>
                <div>{item?.offeredCourse?.days?.map((item,index)=><span key={index}> {item} </span>)} </div>

            </div>)
           }
        </div>
    );
};

export default MySchedule;