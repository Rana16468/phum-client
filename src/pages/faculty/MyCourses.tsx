import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../components/form/PHFrom";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCoursesManagement.api";
import PHSelect from "../../components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";


const MyCourses = () => {
    const {data}=useGetAllFacultyCoursesQuery([]);

   
    const semesterOptions=data?.data?.map((item)=>({label:`${item?.academicSemester?.name} ${item?.academicSemester.year}`,value:item?.semesterRegistration?._id}))
    const courseOptions=data?.data?.map((item)=>({label:item?.course?.title,value:item?.course?._id}))
    const navigate=useNavigate();
    const onSubmit:SubmitHandler<FieldValues>=(facultyData)=>{

        navigate(`/faculty/courses/${facultyData?.semesterRegistration}/${facultyData?.course}`)

        
        


    }
    return (
        <>
               <Flex justify="center" align="center">
      < Col span={6}>
            <PHFrom onSubmit={onSubmit}>
                <PHSelect name="semesterRegistration" lable="Semester" options={semesterOptions}/>
                <PHSelect name="course" lable="Course" options={courseOptions}/>
                <Button htmlType="submit">Submit</Button>
            </PHFrom>
            
            </Col>
      </Flex>
        </>
    );
};

export default MyCourses;