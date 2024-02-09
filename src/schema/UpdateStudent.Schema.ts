// updateStudentValidaion 

import { z } from "zod";

const UpdateuserNameSchema = z.object({
    firstName: z
      .string()
      .min(1,{message:'More Then 1 value accepted'})
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  });
  
  const  UpdateguardianSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
  }).optional();
  
  const  UpdatelocalGuardianSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional()
  }).optional();
  


export const UpdateStudentSchema= z.object({
 
      name: UpdateuserNameSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional().optional(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: UpdateguardianSchema,
      localGuardian: UpdatelocalGuardianSchema,
      profileImg: z.string().optional(),
      admissionSemester:z.string().optional(),
      academicDepartment:z.string().optional()
     })
 
      
  