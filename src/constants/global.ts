

export const monthNames=['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];
export const genders = ['male', 'female', 'other'];
export const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const monthOptions=monthNames?.map((item)=>{
    return {
        value:item,
        label:item


    }
});
export const genderOptions = genders.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));
  
  export const bloodGroupOptions = bloodGroups.map((item) => ({
    value: item,
    label: item,
  }));

  export const weekDaysOptions = weekdays.map((item) => ({
    value: item,
    label: item,
  }));