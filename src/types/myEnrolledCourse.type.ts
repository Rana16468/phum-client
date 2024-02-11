export interface TEnrolledCourses {
    _id: string
    semesterRegistration: SemesterRegistration
    academicSemester: AcademicSemester
    academicFaculty: AcademicFaculty
    academicDepartment: AcademicDepartment
    course: Course
    student: Student
    faculty: Faculty
    offeredCourse: OfferedCourse
    isEnrolled: boolean
    courseMarks: CourseMarks
    grade: string
    gradePoints: number
    createdAt: string
    updatedAt: string
  }
  
  export interface SemesterRegistration {
    _id: string
    academicSemester: string
    status: string
    startDate: string
    endDate: string
    minCredite: number
    maxCredite: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface AcademicSemester {
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
  
  export interface AcademicFaculty {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface AcademicDepartment {
    _id: string
    name: string
    academicFaculty: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Course {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    preRequisiteCourses: any[]
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Student {
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
    admissionSemester: string
    academicDepartment: string
    academicFaculty: string
    isDeleted: boolean
    __v: number
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
  
  export interface Faculty {
    _id: string
    id: string
    user: string
    name: Name2
    designation: string
    email: string
    gender: string
    bloogGroup: string
    dateOfBirth: string
    contractNo: string
    emergencyContractNo: string
    presentAddress: string
    permanentAddress: string
    guirdian: Guirdian
    academicDepartment: string
    profileImg: string
    academicFaculty: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Name2 {
    firstName: string
    middleName: string
    lastName: string
    _id: string
  }
  
  export interface Guirdian {
    fatherName: string
    fatherOccupation: string
    fatherContactNo: string
    motherName: string
    motherOccupation: string
    motherContactNo: string
    _id: string
  }
  
  export interface OfferedCourse {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    course: string
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface CourseMarks {
    classTest1: number
    midTerm: number
    classTest2: number
    finalTerm: number
  }
  