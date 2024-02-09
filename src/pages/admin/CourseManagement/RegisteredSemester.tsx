import { Button, Dropdown, Table, TableColumnsType, TableProps, Tag } from "antd";
import { useGetAllSemesterQuery, useUpdateSemesterStatusMutation } from "../../../redux/features/admin/courseManagement.Api";
import { TSemetser } from "../../../types/courseManagement.type";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";


type TTableData=Pick<TSemetser, "_id" | "status" | "startDate" | "endDate" | "academicSemester" > 
const items = [
    {
      label: 'UPCOMMING',
      key: 'UPCOMMING',
    },
    {
      label: 'ONGOING',
      key: 'ONGOING',
    },
    {
      label: 'ENDED',
      key: 'ENDED',
    },
  ];
const RegisteredSemester = () => {
    const [semesterId, setSemesterId] = useState('');
    const {data,isLoading,isFetching}=useGetAllSemesterQuery([]);
    const [updateSemesterStatus,{data:serverRespone,isSuccess,error}]=useUpdateSemesterStatusMutation()
    const tableData=data?.data?.map(({_id,academicSemester,status,
            startDate,endDate}:TSemetser)=>({key:_id,academicSemester,status,
            startDate:moment(new Date(startDate)).format("MMM"),
            endDate:moment(new Date(endDate)).format("MMM")}));
            const toastId=toast.loading('loading');
            const handelStatusUpdate=async(data:any)=>{
            const updateData={
            id:semesterId,
            data:{ status:data?.key}
           }
          try{
            await updateSemesterStatus(updateData);
          }
          catch(error){
            toast.error('Somethign went Wrong',{id:toastId})
          }
        }


        useEffect(()=>{
            if(isSuccess && serverRespone?.success)
            {
                toast.success(serverRespone?.message)
            }
            else{
                toast.error(error?.toString());
            }

        },[isSuccess,error,toastId,serverRespone]);

            const menuProps={
                items,
                onClick:handelStatusUpdate
            }

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'name',
            key:"name",
            dataIndex: 'academicSemester',
            render:(item)=>{
                return `${item?.name} ${item?.year}`
            }
          },
      
          {
            title: 'Statud',
            key:"status",
            dataIndex: 'status',
            render:(item)=>{
                const color=item==="ONGOING"?'red':item==="UPCOMMING"?"green":'red'
                return <Tag color={color}>{item}</Tag>
            }
          },
          {
            title: 'Start Month',
            key:"startDate",
            dataIndex: 'startDate',
          },
          {
            title: 'End Month',
            key:"endDate",
            dataIndex: 'endDate',
          },
        
          {
            title:"Action",
            key:"x",
            render:(item)=>{
                return <Dropdown menu={menuProps} trigger={['click']}>
                <Button onClick={()=>setSemesterId(item.key)}>Update</Button>
              </Dropdown>
            }
          }
      ];
      const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

      if(isLoading)
      {
        return <p>Is Loading</p>
      }


      console.log(serverRespone);
      console.log(error);
      
    return (
        <>
        <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
            
        </>
    );
};

export default RegisteredSemester;