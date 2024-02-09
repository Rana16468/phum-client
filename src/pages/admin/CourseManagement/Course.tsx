import { Button, Modal, Spin, Table} from "antd";
import { useAddCourseFacultiesMutation, useGetAllCourseQuery } from "../../../redux/features/admin/courseManagement.Api";

import { useEffect, useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagement.Api";
import { toast } from "sonner";


const Course = () => {
    const {data:courses,isFetching,isLoading}=useGetAllCourseQuery(undefined,{refetchOnMountOrArgChange:true});
    const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
        key: _id,
        title,
        code: `${prefix}${code}`,
      }));
      const columns = [
        {
          title: 'Title',
          key: 'title',
          dataIndex: 'title',
        },
        {
          title: 'Code',
          key: 'code',
          dataIndex: 'code',
        },
        {
          title: 'Action',
          key: 'x',
          render:(item:any)=>{
            return <AddFacultyModal data={item}/>
          }
          
        },
      ];
      if(isLoading)
      {
        return <Spin/>
      }
    return (
        <>
            <Table
              loading={isFetching}
               columns={columns}
                dataSource={tableData}
      // onChange={onChange}
    />
        </>
    );
};

const AddFacultyModal=({data}:any)=>{

    

    const {data:faculties}=useGetAllFacultyQuery(undefined,{refetchOnMountOrArgChange:true});
    const facultiesOptions=faculties?.data?.map((item)=>({value:item?._id,label:`${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`}))
    const [addCourseFacultie,{data:serverRespone,isSuccess,error}]=useAddCourseFacultiesMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
   

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
      const handleSubmit:SubmitHandler<FieldValues>=async(facultyInfo)=>{

        const facultyData={
            courseId:data?.key,
            data:facultyInfo
        }
        try
        { await addCourseFacultie(facultyData); }
        catch(error)
        {toast.error('Something went wrong',{id:toastId})}
      }

      useEffect(()=>{

        if(isSuccess && serverRespone?.success)
        {
            toast.success(serverRespone?.message,{id:toastId,duration:2000});
        }
        else{
            toast.error(error?.toString(),{id:toastId});
        }

      },[isSuccess,error,serverRespone,toastId]);
     

    return <>
     <Button  onClick={showModal}>
       Add Faculty
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        footer={null}>
      <PHFrom onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions}
            name="faculties"
            lable="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHFrom>

      </Modal>
    
    </>
}

export default Course;