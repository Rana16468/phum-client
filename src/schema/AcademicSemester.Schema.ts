import { z } from "zod";


//https://codesandbox.io/p/sandbox/react-hook-form-zod-resolver-example-forked-ko5ll?file=%2Fsrc%2FApp.js%3A19%2C43
export const AcademicSemesterSchema=z.object({
    name:z.string({required_error:"This Field is Required"}),
    year:z.string({required_error:"Please Selected a  Year"}),
    startMonth:z.string({required_error:"Please Selected a Start Month"}),
    endMonth:z.string({required_error:"Plase Seleced a End Month"})


})