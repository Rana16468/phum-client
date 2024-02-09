import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/Auth/AuthApi";
import { useAppDispatch } from "../../redux/hooks";
import { TUser, setUser } from "../../redux/features/Auth/AuthSlice";
import { varifyToken } from "../../utils/varifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHFrom from "../../components/form/PHFrom";
import PHInput from "../../components/form/PHInput";

//https://sonner.emilkowal.ski/ ---> toast
const Login = () => {

  const UserdefaultValues:{id:string,password:string}={
    id:"A-0001",
    password:"admin123456"
  }


  const navigate=useNavigate();
   // const {register,handleSubmit}=useForm();
    const [login,{error}]=useLoginMutation();
    const dispatch=useAppDispatch();
    
   
    console.log("error=>", error);

    const onSubmit=async(event:FieldValues)=>{

      

     const toastId= toast.loading("Login In")
      try{
        const res= await  login(event).unwrap();
      const user=varifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({user:user,token:res?.data?.accessToken}));
      toast.success("Login In Success",{id:toastId,duration:2000});
      navigate(`/${user?.role}/dashboard`);
      //dispatch(setUser(user:null,token:res?.data?.accessToken))
      }
      catch(error)
      {
        toast.error("Something went Wrong",{id:toastId,duration:2000});
      }
    }
    return (
        <Row justify="center" align="middle" style={{height:"100vh"}}>
        <PHFrom onSubmit={onSubmit} defaultValues={UserdefaultValues}>
                 <div>
                   
                    {/* <input type="text" id="id" {...register("id")} /> */}
                    < PHInput type="text" name="id" label="ID:"/>
                 </div>
                 <div>
                    {/* <input type="text" id="Password" {...register("password")} /> */}
                    < PHInput type="text" name="password" label="Password"/>
                 </div>
                 <Button htmlType="submit">Submit</Button>
        </PHFrom>
        </Row>
    );
};

export default Login;