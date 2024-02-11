import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { useGetAllCourseQuery, useGetAllSemesterQuery, useGetCourseFacultiesQuery } from "../../../redux/features/admin/courseManagement.Api";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.Api";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { useState } from "react";
import { weekDaysOptions } from "../../../constants/global";




const OfferedCourse = () => {

    const [courseId, setCourseId] = useState('');
    const { data: semesterRegistrationData } = useGetAllSemesterQuery([ { name: 'sort', value: 'year' },
    { name: 'status', value: 'UPCOMMING' }]);
    const { data: academicFacultyData } = useGetAllAcademicFacultyQuery(undefined);
    const { data: academicDepartmentData } =useGetAllAcademicDepartmentQuery(undefined);
    const { data: coursesData } = useGetAllCourseQuery(undefined);
    const {data: facultiesData, isFetching: fetchingFaculties }=useGetCourseFacultiesQuery(courseId, { skip: !courseId })
    const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
        (item) => ({
          value: item._id,
          label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        })
      );
    
      const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      }));
    
      const academicDepartmentOptions = academicDepartmentData?.data?.map(
        (item) => ({
          value: item._id,
          label: item.name,
        })
      );
    
      const courseOptions = coursesData?.data?.map((item) => ({
        value: item._id,
        label: item.title,
      }));
    
      const facultiesOptions = facultiesData?.data?.faculty?.map((item:any) => ({
        value: item._id,
        label: `${item?.name?.firstName}- ${item?.name?.middleName}- ${item?.name?.lastName}`,
      }));

      

    //   console.log(semesterRegistrationData);
    //   console.log(academicFacultyData);
    //   console.log(academicDepartmentData);
    //   console.log(coursesData);
    
    const onSubmit:SubmitHandler<FieldValues>=(OfferedCourseInfo)=>{

        console.log(OfferedCourseInfo);


    }
    return (
        <>
             <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrom onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            lable="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            lable="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            lable="Academic Department"
            options={ academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            lable="Course"
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            lable="Faculty"
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            lable="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHFrom>
      </Col>
    </Flex>
        </>
    );
};

export default OfferedCourse;