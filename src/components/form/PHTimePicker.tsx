import {  Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";


const PHTimePicker = ({name,label}:{name:string,label?:string}) => {

    
    return (
        <div style={{marginBottom:"20px"}}>
         
            <Controller name={name?.slice(0,10)}  render={({ field, fieldState:{error}}) => (
            <Form.Item label={label} >
            <TimePicker {...field} size="large" format="HH:mm"  style={{width:"100%"}}/>
            {error && <small style={{color:"red"}}>{error?.message}</small>}
          </Form.Item>
        )}/>
        </div>
    );
};

export default PHTimePicker;