import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";


const PHDatePicker = ({name,label}:{name:string,label?:string}) => {

    
    return (
        <div style={{marginBottom:"20px"}}>
         
            <Controller name={name?.slice(0,10)}  render={({ field, fieldState:{error}}) => (
            <Form.Item label={label} >
            <DatePicker {...field} size="large"  style={{width:"100%"}}/>
            {error && <small style={{color:"red"}}>{error?.message}</small>}
          </Form.Item>
        )}/>
        </div>
    );
};

export default PHDatePicker;