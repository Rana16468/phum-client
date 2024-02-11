import { useParams } from "react-router-dom";
import { useAddMarksMutation, useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCoursesManagement.api";
import { Button, Modal, Spin, Table} from "antd";
import { useEffect, useState } from "react";
import PHFrom from "../../components/form/PHFrom";
import PHInput from "../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";



const MyStudents = () => {

    const {registeredSemesterId,courseId}=useParams();
    const {data,isLoading,isFetching}=useGetAllFacultyCoursesQuery([
        {name:"semesterRegistration",value:registeredSemesterId},
        {name:"course",value:courseId}
    ]);
    const tableData=data?.data?.map(({_id,student,semesterRegistration,offeredCourse})=>({key:_id,name:student?.fullName,roll:student.id,semesterRegistration:semesterRegistration?._id,offeredCourse:offeredCourse?._id,student:student?._id}))

    const columns = [
        {
          title: 'Name',
          key:"name",
          dataIndex: 'name',
          
        },
        {
            title: 'Roll',
            dataIndex: 'roll',
            key:"roll"
          
          },
          {
            title:"Action",
            key:"x",
            render:(item:any)=>{
                return <AddMarksModal studentInfo={item} />
            }
          }
      ];
      
      
  
      if(isLoading)
      {
        return <Spin/>
      }


   
    

    
    return (
        <>
            <Table loading={isFetching} columns={columns} dataSource={tableData}  />
        </>
    );
};

const AddMarksModal=({studentInfo}:any)=>{

    const [isModalOpen, setIsModalOpen] = useState(false);
   const [addStudentMarks,{isSuccess,data,error}]=useAddMarksMutation()

    const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
       

      const toastId=toast.loading('loading');
  const onSubmit:SubmitHandler<FieldValues>= async(marksData)=>{

    marksData.classTest1=Number(marksData?.classTest1);
    marksData.classTest2=Number(marksData?.classTest2);
    marksData.midTerm=Number(marksData?.midTerm);
    marksData.finalTerm=Number(marksData?.finalTerm);
      const studentMarksData={
        semesterRegistration:studentInfo?.semesterRegistration,
        offeredCourse:studentInfo?.offeredCourse,
        student:studentInfo?.student,
        courseMarks: marksData

      }
     try{
        await addStudentMarks(studentMarksData);
     }
     catch(error)
     {toast.error('Something went wrong',{id:toastId})}

  }

  useEffect(()=>{
    if(isSuccess && data?.success)
    {
        toast.success(data?.message,{id:toastId})
    }
    else{
        toast.error(error?.toString(),{id:toastId})
    }

  },[isSuccess,toastId,data,error]);
       
console.log(isSuccess);
console.log(data);
console.log(error);
     
     

    return <>
     <Button  onClick={showModal}>
       Course Marks
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={null}>
      <PHFrom onSubmit={onSubmit}>
         <PHInput name="classTest1" label="Class Test One" type="text"/>
         <PHInput name="classTest2" label="Class Test Two" type="text"/>
         <PHInput name="midTerm" label="Mid Term" type="text"/>
         <PHInput name="finalTerm" label="Final Term" type="text"/>
          <Button htmlType="submit">Submit</Button>
        </PHFrom>

      </Modal>
    
    </>
}


export default MyStudents;