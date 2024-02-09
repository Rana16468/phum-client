import { Button, Col, Divider,Typography, Form, Input, Row, Spin } from "antd";
const { Title } = Typography;
import { useParams } from "react-router-dom";
import PHFrom from "../../../components/form/PHFrom";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../redux/features/admin/userManagement.Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStudentSchema } from "../../../schema/UpdateStudent.Schema";
import { useEffect } from "react";
import { toast } from "sonner";




const StudentUpdate = () => {
    const {studentId}=useParams();
    const {data:sData,isLoading:sLoading}=useGetAllAcademicSemesterQuery([]);
    const {data:dData,isLoading:dLoading}=useGetAllAcademicDepartmentQuery(undefined,{skip:sLoading});
    const semesterOptions=sData?.data?.map(item=>({value:item?._id,label:`${item?.name} ${item?.year}`}))
    const departmentOptions = dData?.data?.map((item) => ({value: item._id,label: item.name, }));
    const {data:studentById,isLoading}=useGetStudentByIdQuery(studentId,{skip:dLoading,refetchOnMountOrArgChange:true});
    const [updatStudent,{data,error,isSuccess}]=useUpdateStudentMutation();
    const { id,name, gender, dateOfBirth, email, contactNo,bloogGroup,
      emergencyContactNo, presentAddress, permanentAddress, guardian, localGuardian,  admissionSemester, academicDepartment } = studentById?.data || {};
    const studentDefaultValue={
      
      name,
      gender,
      dateOfBirth,
      email,
      bloogGroup,
      contactNo,
      emergencyContactNo,
      permanentAddress,
      presentAddress,
      guardian,
      localGuardian,
      academicDepartment:academicDepartment?._id,
      admissionSemester:admissionSemester?._id
    }


   
    const toastId=toast.loading('loading');
      const onSubmit:SubmitHandler<FieldValues>=async(updateStudentData)=>{

        const modifyStudent={student:updateStudentData};
        try{

          await updatStudent({id,modifyStudent})
        }
        catch(error)
        {
           toast.error('Something went Wrong',{id:toastId});
        }
      
    }

    useEffect(()=>{
      if(isSuccess && data?.success)
      {
        toast?.success(data?.message,{id:toastId});
      }
      else{
        toast?.error(error?.toString(),{id:toastId})
      }

    },[isSuccess,toastId,error,data]);

    

    return (
        <>
          <Title level={2} >Update Student Information</Title>
          {
             isLoading && <Spin/>
            
          }
           
           <Row>
        <Col span={24}>
           <PHFrom onSubmit={onSubmit}  defaultValues={studentDefaultValue} resolver={zodResolver(UpdateStudentSchema)} >
            <Divider>Perdonal Information</Divider>
              <Row gutter={8}>
                 <Col span={24} lg={{span:8}} md={{span:12}}><PHInput type='text' name="name.firstName" label="First Name"></PHInput></Col>
                 <Col span={24} lg={{span:8}} md={{span:12}}><PHInput type='text' name="name.middleName" label="Middle Name"></PHInput></Col>
                 <Col span={24} lg={{span:8}} md={{span:12}}><PHInput type='text' name="name.lastName" label="Last Name"></PHInput></Col>
                 <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" lable="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                lable="Blood group"
              />
            </Col>
            {/* image file  */}

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>



              </Row>
{/* contract Informatiom */}
              <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          {/* Guridian Infromation */}
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          {/* Local Gurdian */}

          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          {/*Academic Information  */}
          <Divider>Academic Info.</Divider>
           <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sLoading}
                name="admissionSemester"
                lable="Admission Semester"
              />
            </Col>
           <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dLoading}
                name="academicDepartment"
                lable="Admission Department"
              />
            </Col> 
          </Row> 


              <Button htmlType="submit">Submit</Button>
           </PHFrom>
        </Col>
       </Row> 
        </>
    );
};

export default StudentUpdate;