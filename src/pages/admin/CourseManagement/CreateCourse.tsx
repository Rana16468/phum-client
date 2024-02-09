
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { useAddCoursesMutation, useGetAllCourseQuery } from "../../../redux/features/admin/courseManagement.Api";
import { TCourse } from "../../../types/courseManagement.type";
import { toast } from "sonner";
import { useEffect } from "react";


const CreateCourse = () => {

    const {data:courses}=useGetAllCourseQuery(undefined,{refetchOnMountOrArgChange:true});
    const [addCourse,{data,isSuccess,error}]=useAddCoursesMutation();
    const preRequisiteCoursesOptions=courses?.data?.map((item:TCourse)=>({value:item?._id,label:item?.title})) ;
    const toastId=toast.loading('loading');
   
    const onSubmit:SubmitHandler<FieldValues>=async(courseFormData)=>{

        courseFormData.code=Number(courseFormData?.code);
        courseFormData.credits= Number(courseFormData?.credits)
       

      const courseData={
        ...courseFormData,
        isDeleted:false,
        preRequisiteCourses:courseFormData?.preRequisiteCourses?courseFormData.preRequisiteCourses?.map((item:TCourse)=>({course:item,isDeleted:false})):[]

      }
      try{
        await addCourse(courseData);
      }
      catch(error)
      {
         toast.error('Something went Wrong',{id:toastId})
      }
    }

   useEffect(()=>{

    if(isSuccess && data?.success)
    {
        toast.success(data?.message,{id:toastId})    

    }
    else{
        toast.error(error?.toString());
    }
   },[isSuccess,data,error,toastId]);



    return (
        <>

      <Flex justify="center" align="center">
      <Col span={6}>
       <PHFrom onSubmit={onSubmit}   >
        
        
          <PHInput type="text" name="title" label="Course Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Course Credits" />
          <PHSelect mode="multiple" name="preRequisiteCourses" lable="preRequisiteCourses"  options={preRequisiteCoursesOptions}/>
        < Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
            
        </>
    );
};

export default CreateCourse;