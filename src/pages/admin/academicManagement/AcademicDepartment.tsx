import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.Api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";


type TTableData=Pick<TAcademicDepartment, "name" | "academicFaculty" >

const AcademicDepartment = () => {
    const {data,isFetching}=useGetAllAcademicDepartmentQuery(undefined);
    const tableData=data?.data?.map(({_id,name,academicFaculty}:TAcademicDepartment)=>({key:_id,name,academicFaculty}));
    

   
     

    const columns: TableColumnsType<TTableData> = [
      
        {
          title: 'Academic Faculty',
          dataIndex: 'name',
        },
        {
            title:"Academic Faculty Name",
            dataIndex: 'academicFaculty',
            render:(item)=>{
               return item.name
            }
            
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
    return (
        <>
            <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
        </>
    );
};

export default AcademicDepartment;