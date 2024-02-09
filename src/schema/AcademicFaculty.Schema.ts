import { z } from "zod";

export const AcademicFacultySchema=z.object({
    name:z.string({required_error:"This Field is Required"}),

})