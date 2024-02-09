export interface TStudentDefaultValue {
    name: TName
    gender: string
    bloogGroup: string
    contactNo: string
    email: string
    emergencyContactNo: string
    presentAddress: string
    permanentAddress: string
    guardian: TGuardian
    localGuardian: TLocalGuardian
    admissionSemester: string
    academicDepartment: string
  }
  
  export interface TName {
    firstName: string
    middleName: string
    lastName: string
  }
  
  export interface TGuardian {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
  }
  
  export interface TLocalGuardian {
    name: string
    occupation: string
    contactNo: string
    address: string
  }
  