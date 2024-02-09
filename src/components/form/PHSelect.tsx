import { Form, Select } from "antd";
import { Controller} from "react-hook-form";



type TPHSelectedProps={
    lable:string
    name:string,
    options:{
        value:string;
        label:string;
        disabled?:boolean 
    }[] | undefined,
    mode?:"multiple" | undefined
    disabled?:boolean

}

const PHSelect = ({lable,name,options,mode, disabled}:TPHSelectedProps) => {

    
    

    return (
        <>

        <Controller  name={name} render={({field,fieldState:{error}})=>( <Form.Item  label={lable}>
    <Select
    mode={mode}
  style={{ width:'100%' }}
  {...field}
  options={options}
  size="large"
  disabled={disabled}
/>
{error && <small style={{color:"red"}}>{error?.message}</small>}

 </Form.Item>

 )}/>
          

   
  
        </>
    );
};

export default PHSelect;