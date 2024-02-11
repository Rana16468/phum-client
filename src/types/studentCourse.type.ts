export interface TOfferedCourse {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    course: TCourse
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
    enrolledcourses: any[]
    completedCourse: any[]
    isCompletedCourseIds: any[]
    preRequisiteFulField: boolean
    isAlreadyEnrolled: boolean
  }
  
  export interface TCourse {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    preRequisiteCourses: any[]
    createdAt: string
    updatedAt: string
    __v: number
    isDeleted: boolean
  }
  