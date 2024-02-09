// RegisteredSemester
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {  semesterStatusOptions } from "../../../constants/semester";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterMutation } from "../../../redux/features/admin/courseManagement.Api";
import { toast } from "sonner";

const SemesterRegistration = () => {
    const {data:AcademicSemester}=useGetAllAcademicSemesterQuery([],{refetchOnMountOrArgChange:true})
    const [addSemester,{data:ServerRespone,error}]=useAddSemesterMutation()
    const academicSemesterOptions = AcademicSemester?.data?.map((item) => ({ value: item._id, label: `${item.name} ${item.year}`}));
    const toastId=toast.loading('loading');
    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
       

         data.minCredite=Number(data?.minCredite);
         data.maxCredite=Number(data?.maxCredite);

        const semesterData={ ...data };
        try{

           await addSemester(semesterData);
        }
        catch(error)
        {

            toast.error('Something went wrong',{id:toastId})
        }
        
    }

    console.log(ServerRespone);
    console.log(error);



    return (
        <>

      <Flex justify="center" align="center">
      <Col span={6}>
       <PHFrom onSubmit={onSubmit}   >
        
        <PHSelect lable="Academic Semester" name="academicSemester" options={academicSemesterOptions}/>
     
        <PHSelect
            name="status"
            lable="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredite" label="Min Credite" />
          <PHInput type="text" name="maxCredite" label="Max Credite" />
        <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
            
        </>
    );
};

export default SemesterRegistration;