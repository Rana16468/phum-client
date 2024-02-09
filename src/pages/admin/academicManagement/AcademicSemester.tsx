import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types/globalErrorHandelar";



 type TTableData=Pick<TAcademicSemester, "name" |"startMonth" | "endMonth" | "year">
const AcademicSemester = () => {

    //[{name:"year",value:"2025"}]
    const [params,setParams]=useState<TQueryParam[] | undefined>([] || undefined);

     const  {data:SemesterData, isLoading,isFetching}=useGetAllAcademicSemesterQuery(params);

    const tableData=SemesterData?.data?.map(({_id,name,year,startMonth,endMonth})=>({key:_id,name,year,startMonth,endMonth}))

      const columns: TableColumnsType<TTableData> = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            { text: 'Autuman', value: 'Autuman' },
            { text: 'Summer', value: 'Summer' },
            { text: 'Fall', value: 'Fall' },
          ]
        },
        {
            title: 'Year',
            dataIndex: 'year',
            filters: [
                { text: '2024', value: '2024' },
                { text: '2025', value: '2025' },
                { text: '2026', value: '2026' },
              ]
          },
          {
            title: 'Start Month',
            dataIndex: 'startMonth',
          },
          {
            title: 'End Month',
            dataIndex: 'endMonth',
          },
          {
            title:"Action",
            key:"x",
            render:()=>{
                return <div>
                    <Button>Update</Button>
                </div>
            }
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
        <div>
            <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} />
        </div>
    );
};

export default AcademicSemester;