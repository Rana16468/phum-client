export type TSemetser= {
    _id: string
    academicSemester: TAcademicSemester
    status: string
    startDate: string
    endDate: string
    minCredite: number
    maxCredite: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export type TAcademicSemester= {
    _id?: string
    name: string
    code: string
    year: string
    startMonth: string
    endMonth: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  export type TCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: { course: string | null; isDeleted: boolean }[];
    isDeleted: boolean;
  };