import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicSemesterSchema } from "../../../schema/AcademicSemester.Schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.Api";
import { toast } from "sonner";
import { TResponse } from "../../../types/globalErrorHandelar";



/*validation--->
npm i @hookform/resolvers
npm i zod
*/
const currentYear=new Date().getFullYear();
const yearOption=[0,1,2,3,4,5].map((number)=>{
    return {
        value:String(currentYear + number),
        label:String(currentYear + number)
    }
});




const CreateAcademicSemester = () => {

    const [addAcademicSemester]=useAddAcademicSemesterMutation();


    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        const toastId=toast.loading("loading")

        const name=nameOptions[Number(data?.name)-1].label

        const semesterData={
           name,
            code:nameOptions[Number(data?.name)-1].value,
            year:data?.year,
            startMonth:data?.startMonth,
            endMonth:data?.endMonth

        }

        try{

            const res=(await addAcademicSemester(semesterData)) as TResponse<any>;
            if(res.error)
            {
                toast.error(res?.error?.data?.message)
            }
            else{
                toast.success("Successfully Created Semester",{id:toastId});
            }
            
        }
        catch(error)
        {
            toast.error('Some Thing went Wrong')
        }
        
    }



    return (
        <>

      <Flex justify="center" align="center">
      <Col span={6}>
       <PHFrom onSubmit={onSubmit}  resolver={zodResolver(AcademicSemesterSchema)} >
        
        <PHSelect lable="Name" name="name" options={nameOptions}/>
        <PHSelect lable="Year" name="year" options={yearOption}/>
        <PHSelect lable="Start Month" name="startMonth" options={monthOptions}/>
        <PHSelect lable="End Month" name="endMonth" options={monthOptions}/>
        <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
            
        </>
    );
};

export default CreateAcademicSemester;