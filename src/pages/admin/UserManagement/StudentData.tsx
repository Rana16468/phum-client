import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/globalErrorHandelar";

import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.Api";
import { TStudent } from "../../../types/userManagement.type";
import { Link } from "react-router-dom";

type TTableData=Pick<TStudent, "fullName" |"id" | "email" | "contactNo">
const StudentData = () => {

    //[{name:"year",value:"2025"}]
    const [params,setParams]=useState<TQueryParam[]>([] || undefined);
    const [page,setPage]=useState(1);

     const  {data:studentData, isLoading,isFetching}=useGetAllStudentsQuery([{name:'limit',value:3},{name:"page",value:page},{name:"sort",value:"id"},...params]);
     const metaData=studentData?.meta;
   

    const tableData=studentData?.data?.map(({_id,fullName,id,email,contactNo,dateOfBirth})=>({key:_id,fullName,id,email,contactNo,dateOfBirth}))

      const columns: TableColumnsType<TTableData> = [
        {
          title: 'Name',
          dataIndex: 'fullName'
          
        },
        {
            title: 'Roll No',
            dataIndex: 'id'
            
          },
          {
            title: 'Email',
            dataIndex: 'email'
            
          },
          {
            title: 'Contract Number',
            dataIndex: 'contactNo'
            
          },
          {
            title:"Date Of Birth",
            dataIndex:"dateOfBirth"
          },
          
          {
            title:"Action",
            key:"x",
            render:(item)=>{
             
                return <Space>
                     <Link to={`/admin/student-details/${item?.key}`}><Button>Details</Button></Link>
                  <Link to={`/admin/student-update/${item?.key}`}>   <Button>Update</Button></Link>
                    <Button>Block</Button>
                </Space>
            },
            width:"1%"
          }
      ];
      
      
      
      const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
       // console.log('params', pagination, filters, sorter, extra);
        //console.log(filters,extra);
        if(extra.action==='filter')
        {
            const QueryParams:TQueryParam[]=[];
            filters?.name?.forEach(item=>QueryParams.push({name:"name",value:item}));
            filters?.year?.forEach(item=>QueryParams.push({name:"year",value:item}));
            setParams(QueryParams);
        }
      };
      if(isLoading)
      {
        return <p>Is Loading</p>
      }
    return (
        <>
            <Table loading={isFetching}  columns={columns} dataSource={tableData} onChange={onChange} pagination={false} />
            <Pagination current={page} onChange={(value)=>setPage(value)} pageSize={metaData?.limit} total={metaData?.total}/>
        </>
    );
};

export default StudentData;