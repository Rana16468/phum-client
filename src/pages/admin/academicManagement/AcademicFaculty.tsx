import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.Api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

type TTableData=Pick<TAcademicFaculty, "name" >
const AcademicFaculty = () => {
    const {data,isFetching, isLoading}=useGetAllAcademicFacultyQuery(undefined);
    const tableData=data?.data?.map(({_id,name}:{_id:string,name:string})=>({key:_id,name}));
    const columns: TableColumnsType<TTableData> = [
      
          {
            title: 'Academic Faculty',
            dataIndex: 'name',
          },
        
          {
            title:"Action",
            key:"x",
            render:()=>{
                return <div>
                    <Button>Update</Button>
                </div>
            }
          },
          {
            title:"Delete",
            key:"x",
            render:()=>{
                return <div>
                    <Button>Delete</Button>
                </div>
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
    return (
        <>
        <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
            
        </>
    );
};

export default AcademicFaculty;