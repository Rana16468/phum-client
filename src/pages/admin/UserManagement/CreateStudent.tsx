import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.Api";
import { toast } from "sonner";
import { useEffect } from "react";
import { TStudentDefaultValue } from "../../../types/studentDefaultValue.type";





const studentDefaultValue:TStudentDefaultValue={
    name: {
      firstName: 'I am ',
      middleName: 'Student',
      lastName: 'Number 1',
    },
    gender: 'male',
    bloogGroup: 'A+',
    contactNo: '1235678',
    email:"amsr215019@gmail.com",
    emergencyContactNo: '987-654-3210',
    presentAddress: '123 Main St, Cityville',
    permanentAddress: '456 Oak St, Townsville',
  
    guardian: {
      fatherName: 'James Doe',
      fatherOccupation: 'Engineer',
      fatherContactNo: '111-222-3333',
      motherName: 'Mary Doe',
      motherOccupation: 'Teacher',
      motherContactNo: '444-555-6666',
    },
  
    localGuardian: {
      name: 'Alice Johnson',
      occupation: 'Doctor',
      contactNo: '777-888-9999',
      address: '789 Pine St, Villageton',
    },
    admissionSemester: '65bb60ebf71fdd1add63b1c0',
    academicDepartment: '65b9bbeeea57ca490623d88a',
  
   
  };   
  
const CreateStudent = () => {

    const {data:sData,isLoading:sLoading}=useGetAllAcademicSemesterQuery([]);
    const {data:dData,isLoading:dLoading}=useGetAllAcademicDepartmentQuery(undefined,{skip:sLoading});
    const [addStudent,{data,error,isSuccess}]=useAddStudentMutation();


    const semesterOptions=sData?.data?.map(item=>({value:item?._id,label:`${item?.name} ${item?.year}`}))
    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      }));

    const toastId=toast.loading('loading')
    const onSubmit:SubmitHandler<FieldValues>=async(studentData)=>{

         const createStudent={
            password:"student123",
            student:studentData

         }

        const formData= new  FormData();
        formData.append('data',JSON.stringify(createStudent));
        formData.append('file',studentData?.image);
        try{
            await addStudent(formData);
        }
        catch(error)
        { 
            toast.error('Some thing Went Wrong',{id:toastId})
        }
        //console.log([...formData.entries()]);
        // this is for development ened just of chacking
        //console.log(Object.fromEntries(formData))


    }

   useEffect(()=>{
    if(isSuccess && data?.success)
    {
        toast.success(data?.message,{id:toastId,duration:200})
    }
    else{
        toast.error(error?.toString(),{id:toastId,duration:200})
    }

   },[data,error,isSuccess,toastId]);
   
    return (
        <>
       <Row>
        <Col span={24}>
           <PHFrom onSubmit={onSubmit} defaultValues={studentDefaultValue}>
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

export default CreateStudent;