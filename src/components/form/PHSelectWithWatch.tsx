

import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

//https://react-hook-form.com/docs/usewatch

type TPHSelectedProps={
    lable:string
    name:string,
    options:{
        value:string;
        label:string;
        disabled?:boolean 
    }[] | undefined,
    mode?:"multiple" | undefined
    disabled?:boolean;
    onValueChange: React.Dispatch<React.SetStateAction<string>>;

}

const PHSelectWithWatch = ({lable,name,options,mode, disabled, onValueChange}:TPHSelectedProps) => {

    const {control}=useFormContext();
    const inputValue=useWatch({
        control,
        name
    });
   useEffect(()=>{

    onValueChange(inputValue)

   },[inputValue,onValueChange])
    

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

export default PHSelectWithWatch;