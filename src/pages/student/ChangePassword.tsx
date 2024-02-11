import { Button, Row } from "antd";
import PHFrom from "../../components/form/PHFrom";
import PHInput from "../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChnagePasswordMutation } from "../../redux/features/admin/userManagement.Api";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/Auth/AuthSlice";

import { TResponse } from "../../types/globalErrorHandelar";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {

//student123
    const [changePassword]=useChnagePasswordMutation();
    const toastId=toast.loading('loading');
    const dispatch=useAppDispatch();
    const navigate=useNavigate();
   
    const onSubmit:SubmitHandler<FieldValues>=async(chnagePasswordData)=>{
        try{
           const  res=await changePassword(chnagePasswordData) as TResponse<any>;
           console.log(res);
           console.log(res?.data?.success);
           
            if(res?.data?.success)
            {
                
                dispatch(logout());
                navigate('/login');

               

            }
            else{
                toast.error('something went wrong');
            }
        }
        catch(error)
        {
            toast.error('Something went wrong',{id:toastId});
        }
    }

   
  
    return (
        <>
          <Row justify="center" align="middle" style={{height:"100vh"}}>
        <PHFrom onSubmit={onSubmit} >
                 <div>
                   
                    {/* <input type="text" id="id" {...register("id")} /> */}
                    < PHInput type="text" name="oldPassword" label="Old Password"/>
                 </div>
                 <div>
                    {/* <input type="text" id="Password" {...register("password")} /> */}
                    < PHInput type="text" name="newPassword" label="New Password"/>
                 </div>
                 <Button htmlType="submit">Submit</Button>
        </PHFrom>
        </Row>
        </>
    );
};

export default ChangePassword;