import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/courseManagement.Api";
import PHSelect from "../../../components/form/PHSelect";


const OfferedCourse = () => {
    // academic faculty
    const [offeredCourseTrack,setOfferCourseTrack]=useState('')
    const {data:AcademicFacultys,isLoading:AFLoading}=useGetAllAcademicFacultyQuery([]);
    const academicFacultyOptions=AcademicFacultys?.data?.map(item=>({value:item._id,label:item.name}));
    const {data:SemesterRegistration}=useGetAllSemesterQuery([],{skip:AFLoading,refetchOnMountOrArgChange:true});
    const semesterRegistrationOptions=SemesterRegistration?.data?.map((item)=>({value:item?._id,label:item?.status}))


    console.log(offeredCourseTrack);
    const onSubmit:SubmitHandler<FieldValues>=(OfferedCourseInfo)=>{

        console.log(OfferedCourseInfo);


    }
    return (
        <>
            <Flex justify="center" align="center">
      <Col span={6}>
       <PHFrom onSubmit={onSubmit}   >
        
        <PHSelectWithWatch lable="Academic Faculty" name="academicFaculty" options={academicFacultyOptions} onValueChange={setOfferCourseTrack}/>
         <PHSelect lable="Semester Registration" name="semesterRegistration" options={semesterRegistrationOptions}/>
        <PHInput type="text" name="text" label="Text" disabled={!offeredCourseTrack}/>
         
        <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
        </>
    );
};

export default OfferedCourse;