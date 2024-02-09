export interface TStudent {
    _id: string
    id: string
    user: string
    name: Name
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloogGroup: string
    presentAddress: string
    permanentAddress: string
    guardian: Guardian
    localGuardian: LocalGuardian
    profileImg: string
    admissionSemester: AdmissionSemester
    academicDepartment: AcademicDepartment
    isDeleted: boolean
    fullName: string
  }
  
  export interface Name {
    firstName: string
    middleName: string
    lastName: string
    _id: string
  }
  
  export interface Guardian {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    _id: string
  }
  
  export interface LocalGuardian {
    name: string
    occupation: string
    contactNo: string
    address: string
    _id: string
  }
  
  export interface AdmissionSemester {
    _id: string
    name: string
    code: string
    year: string
    startMonth: string
    endMonth: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface AcademicDepartment {
    _id: string
    name: string
    academicFaculty: AcademicFaculty
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface AcademicFaculty {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
  }