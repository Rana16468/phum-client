import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicFacultySchema } from "../../../schema/AcademicFaculty.Schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.Api";
import { toast } from "sonner";
import { useEffect } from "react";


const CreateAcademicFaculty = () => {


    const [addAcademicFaculty,{data,isSuccess,error}]=useAddAcademicFacultyMutation();
    const toastId=toast.loading("loading");
    const onSubmit:SubmitHandler<FieldValues>= async(AcademicFacultyData)=>{

          try{
            await addAcademicFaculty(AcademicFacultyData);
          }
          catch(error){
            toast.error('Something went Wrong',{id:toastId})

          }
    }

    useEffect(()=>{

        if(isSuccess && data?.success)
        {
            toast.success(data?.message,{id:toastId,duration:2000})
        }
        else{
            toast.error(error?.toString());
        }

    },[isSuccess,error,toastId,data]);

    return (
        <>
            <Flex justify="center" align="center">
      < Col span={6}>
       <PHFrom onSubmit={onSubmit} resolver={zodResolver(AcademicFacultySchema)}>
        
        <PHInput type="text" name="name" label="Academic Faculty" ></PHInput>
        <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
        </>
    );
};

export default CreateAcademicFaculty;