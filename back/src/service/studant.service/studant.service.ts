var data = require("../../../studant.json");

export const getStudant = () => {
  return data.studant;
};

export const createStudant = (studant: any) => {
  data.studant.push(studant);
  return data.studant;
};
export const deleteStudant = (studantID: number) => {
     const studantIndex = data.studant.findIndex((stu:any)=>stu.id === studantID)
      data.studant.splice(studantIndex, 1)
  // data.studant.filter((studant: any) => studant.id !== studantID);
  return data.studant;
};
export const updateStudant = (first:any, last:any, id:number) =>{
  const studant = data.studant.find((studant:any) => studant.id === id);
  studant.first = first;
  studant.last = last;
  return data.studant;


}