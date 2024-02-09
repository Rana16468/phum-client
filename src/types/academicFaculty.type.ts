export interface TFaculty {
    _id: string
    id: string
    user: string
    name: TName
    designation: string
    email: string
    gender: string
    bloogGroup: string
    dateOfBirth: string
    contractNo: string
    emergencyContractNo: string
    presentAddress: string
    permanentAddress: string
    guirdian: TGuirdian
    academicDepartment: TAcademicDepartment
    profileImg: string
    academicFaculty: TAcademicFaculty
    isDeleted: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface TName {
    firstName: string
    middleName: string
    lastName: string
    _id: string
  }
  
  export interface TGuirdian {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    _id: string
  }
  
  export interface TAcademicDepartment {
    _id: string
    name: string
    academicFaculty: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface TAcademicFaculty {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  