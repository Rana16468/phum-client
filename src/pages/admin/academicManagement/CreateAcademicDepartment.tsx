import { Button, Col, Flex } from "antd";
import { useAddAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHFrom from "../../../components/form/PHFrom";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { useEffect } from "react";


const CreateAcademicDepartment = () => {
    const {data}=useGetAllAcademicFacultyQuery(undefined);
   
   const departmentOptions=data?.data?.map(v=>({value:v?._id,label:v?.name})) || [];
   const [addAcademicDepartment,{data:ResponeAD,isSuccess,error}]=useAddAcademicDepartmentMutation();
   const toastId=toast.loading('Loading');
   const onSubmit:SubmitHandler<FieldValues>=async(AcademicDepartment)=>{
    

        try{
            await addAcademicDepartment(AcademicDepartment);
        }
        catch(error)
        {
            toast.error('Some thing Went Wrong',{id:toastId});
        }
   }

   useEffect(()=>{

    if(isSuccess && ResponeAD?.success)
    {
        toast.success(ResponeAD?.message,{id:toastId,duration:2000})
    }
    else{
        toast.error(error?.toString());
    }
},[isSuccess,error,toastId,ResponeAD]);


    return (
        <>

<Flex justify="center" align="center">
      < Col span={6}>
       <PHFrom onSubmit={onSubmit}>
        
        <PHInput type="text" name="name" label="Academic Department" ></PHInput>
        <PHSelect lable="Academic Faculty" name="academicFaculty" options={departmentOptions}/>
        <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
     
        </>
    );
};

export default CreateAcademicDepartment;