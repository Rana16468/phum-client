import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";


const OfferedCourse = () => {
    // academic faculty
    const [offeredCourseTrack,setOfferCourseTrack]=useState('')
    const {data:AcademicFacultys}=useGetAllAcademicFacultyQuery([]);
    const academicFacultyOptions=AcademicFacultys?.data?.map(item=>({value:item._id,label:item.name}))


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
     
        <PHSelect
            name="status"
            lable="Status"
            options={[]}
          />

          <PHInput type="text" name="text" label="Text" disabled={!offeredCourseTrack}/>
         
        <Button htmlType="submit">Submit</Button>

       </PHFrom>
       </Col>
      </Flex>
        </>
    );
};

export default OfferedCourse;