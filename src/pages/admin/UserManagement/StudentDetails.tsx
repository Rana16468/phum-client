
import { useParams } from "react-router-dom";
import { Descriptions, Card, Typography, Avatar, Spin } from 'antd';
import { useGetStudentByIdQuery } from "../../../redux/features/admin/userManagement.Api";
import { useEffect } from "react";
import { toast } from "sonner";

const { Title } = Typography;

const StudentDetails = () => {

    const {studentId}=useParams();
    const {data,isLoading,isSuccess,error}=useGetStudentByIdQuery(studentId,{refetchOnMountOrArgChange:true});
    const { name, gender, dateOfBirth, email, contactNo, emergencyContactNo, presentAddress, permanentAddress, guardian, localGuardian, profileImg, admissionSemester, academicDepartment } = data?.data || {};
    const toastId=toast.loading('loading');

  
   useEffect(()=>{
    if(isSuccess && data?.success)
    {
        toast.success(data?.message,{id:toastId});
    }
    else{
        toast.error(error?.toString(),{id:toastId})
    }


   },[isSuccess,data, toastId,error]);
    return (
        <>
        {
            isLoading && <Spin />
        }
           
           <Card>
      <Avatar src={profileImg} size={64} />
      <Title level={3}>{name?.firstName} {name?.middleName} {name?.lastName}</Title>
      
      <Descriptions title="Student Information" bordered>
        <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{dateOfBirth}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{contactNo}</Descriptions.Item>
        <Descriptions.Item label="Emergency Contact No">{emergencyContactNo}</Descriptions.Item>
        <Descriptions.Item label="Present Address">{presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{permanentAddress}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Guardian Information" bordered>
        <Descriptions.Item label="Father's Name">{guardian?.fatherName}</Descriptions.Item>
        <Descriptions.Item label="Father's Occupation">{guardian?.fatherOccupation}</Descriptions.Item>
        <Descriptions.Item label="Father's Contact No">{guardian?.fatherContactNo}</Descriptions.Item>
        <Descriptions.Item label="Mother's Name">{guardian?.motherName}</Descriptions.Item>
        <Descriptions.Item label="Mother's Occupation">{guardian?.motherOccupation}</Descriptions.Item>
        <Descriptions.Item label="Mother's Contact No">{guardian?.motherContactNo}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Local Guardian Information" bordered>
        <Descriptions.Item label="Name">{localGuardian?.name}</Descriptions.Item>
        <Descriptions.Item label="Occupation">{localGuardian?.occupation}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{localGuardian?.contactNo}</Descriptions.Item>
        <Descriptions.Item label="Address">{localGuardian?.address}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Academic Department" bordered>
      <Descriptions.Item label="Admission Semester">{admissionSemester?.name} {admissionSemester?.year}</Descriptions.Item>
        <Descriptions.Item label="Academic Department">{academicDepartment?.name}</Descriptions.Item>
        <Descriptions.Item label="Faculty">{academicDepartment?.academicFaculty?.name}</Descriptions.Item>
        <Descriptions.Item label="Starting Time">{admissionSemester?.startMonth}</Descriptions.Item>
        <Descriptions.Item label="Ending Time">{admissionSemester?.endMonth}</Descriptions.Item>
      </Descriptions>
    </Card>
        </>
    );
};

export default StudentDetails;