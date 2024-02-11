import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import { weeklyStatusOptions } from "../../../constants/semester";
import PHTimePicker from "../../../components/form/PHTimePicker";



const OfferedCourse = () => {
    // academic faculty
    const [offeredCourseTrack,setOfferCourseTrack]=useState('')
    const {data:AcademicFacultys}=useGetAllAcademicFacultyQuery([]);
    const academicFacultyOptions=AcademicFacultys?.data?.map(item=>({value:item._id,label:item.name}));
    const weeklySelectOptions=weeklyStatusOptions?.map((item)=>({value:item.value,label:item.label}))
   

    console.log(offeredCourseTrack);
    const onSubmit:SubmitHandler<FieldValues>=(OfferedCourseInfo)=>{

        console.log(OfferedCourseInfo);


    }
    return (
        <>
            <Flex justify="center" align="center">
      <Col span={6}>
       <PHFrom onSubmit={onSubmit}   >


         <PHSelect lable="Semester Registration" name="semesterRegistration" options={[]}/>
         <PHSelectWithWatch lable="Academic Faculty" name="academicFaculty" options={academicFacultyOptions} onValueChange={setOfferCourseTrack}/>
         <PHSelect lable="Academic Department" name="academicDepartment" options={[]}/>
         <PHSelectWithWatch lable="Course" name="course" options={[]} onValueChange={setOfferCourseTrack}/>
         <PHSelect lable="Faculty" name="faculty" options={[]}/>
         <PHInput type="text" name="section" label="Sections"/>
         <PHInput type="text" name="maxCapacity" label="Max Capacity"/>
         <PHInput type="text" name="text" label="Text" disabled={!offeredCourseTrack}/>
         <PHSelect mode="multiple" name="days" lable="Days" options={weeklySelectOptions}/>
         <PHTimePicker name="startTime" label="Start Time"/>
         <PHTimePicker name="endTime" label="End Time"/>
         <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
        </>
    );
};

export default OfferedCourse;