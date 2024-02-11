import { Button, Col, Row, Spin } from "antd";
import { useEnrolledCoursesMutation, useGetAllOfferedCoursesQuery } from "../../redux/features/student/studemtCourseManagement.api";
import { toast } from "sonner";
import { useEffect } from "react";


const OfferedCourse = () => {

    const {data:OfferedCourseData,isLoading}=useGetAllOfferedCoursesQuery(undefined);
    const [enrolledCourse,{data,isSuccess,error}]=useEnrolledCoursesMutation();


   const toastId=toast.loading('loading');
    const handelEnrolledCourse=async(couseId:string)=>{

         const enrolledCourseData={
            offeredCourse:couseId
         }
         try{
            await enrolledCourse(enrolledCourseData);

         }
         catch(error)
         {
            toast.error('Something went wrong',{id: toastId})
         }

    }
    useEffect(()=>{
        if(isSuccess && data?.success)
        {
            toast.success(data?.message,{id:toastId});
        }
        else{
            toast.error(error?.toString(),{id:toastId});
        }

    },[isSuccess,error,toastId,data]);
    const singleObject=OfferedCourseData?.data?.reduce((acc:any,item)=>{
       const key=item?.course?.title
        acc[key]=acc[key] || {courseTitle:key,sections:[]};
        acc[key].sections.push({section:item?.section,_id:item?._id,days:item?.days,startTime:item?.startTime,endTime:item?.endTime});

        return acc;

    },{});
const modefiedData=Object.values(singleObject?singleObject:{});
//console.log(modefiedData);
if(isLoading)
{
    return <Spin/>
}

    return (
        <>
         <Row gutter={[0,10]}>
         {
            modefiedData?.map((item:any,index)=>{
                return <Col span={24} style={{border:'solid #d4d4d4 2px'}} key={index}>
                    <h2>{item?.courseTitle }</h2>
                    <div style={{padding:"10px"}}>
                        {
                            item?.sections?.map((section:any,index:string)=>{
                                return <Row  justify="space-between" align="middle" style={{borderTop:"solid #d4d4d4 2px",padding:'10px'}} key={index}>
                                 <Col span={5}>Section :{section?.section}</Col>
                                 <Col span={5}>Days:{section?.days?.map((day:string,index:string)=><span key={index}> {day} </span>)}</Col>
                                 <Col span={5}>Start Time :{section?.startTime}</Col>
                                 <Col span={5}>End Time :{section?.endTime}</Col>
                                 <Button onClick={()=>handelEnrolledCourse(section?._id)}>Enrolled</Button>
                                </Row>
                            })
                        }
                    </div>
                 
                    </Col>
            })
          }
         </Row>
        </>
    );
};

export default OfferedCourse;