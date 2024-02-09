import { Form, Input } from "antd";
import { Controller } from "react-hook-form";


const PHInput = ({type,name,label,disabled}:{type:string,name:string,label?:string,disabled?:boolean}) => {
   //https://react-hook-form.com/docs/usecontroller/controller

    return (
        <div style={{marginBottom:"20px"}}>
         
            <Controller name={name}  render={({ field, fieldState:{error}}) => (
            <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" disabled={disabled} />
            {error && <small style={{color:"red"}}>{error?.message}</small>}
          </Form.Item>
        )}/>
        </div>
    );
};

export default PHInput;