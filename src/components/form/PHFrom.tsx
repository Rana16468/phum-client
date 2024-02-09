import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {  FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";


type TFromProps={
    onSubmit:SubmitHandler<FieldValues>,
    children:ReactNode,
    //{id:string,password:string}
    defaultValues?:any,
    resolver?:any
}
type TConfigForm={
    defaultValues?:Record<string,any>,
    resolver?:any
}

const PHFrom = ({onSubmit,children,defaultValues,  resolver}:TFromProps) => {

   const formConfig:TConfigForm={};
  
   if(defaultValues)
   {
    formConfig["defaultValues"]=defaultValues
   }

   
   
   if(resolver)
   {
    formConfig["resolver"]=resolver
   }

    const methods=useForm(formConfig);
    
    const submitForm:SubmitHandler<FieldValues>=(data)=>{

        onSubmit(data);
        methods.reset()
    }
    useEffect(()=>{
        methods.reset(defaultValues);

    },[methods,defaultValues]);

    //https://react-hook-form.com/docs/formprovider
    return (
       <FormProvider {...methods}>

          <Form layout="vertical" onFinish={methods.handleSubmit(submitForm)}>
            {children}
        </Form>
       </FormProvider>
    );
};

export default PHFrom;