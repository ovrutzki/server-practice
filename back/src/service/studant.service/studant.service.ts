import { IStudant, StudantModal } from "../../model/studants.model";

export const getStudant = async () => {
  try {
    const studants = await StudantModal.find();
    return studants;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const createStudant = async (studant: IStudant) => {
  const _studant = new StudantModal(studant);
  try {
    await _studant.save();
    return _studant;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const deleteStudant = async (studantID: string) => {
  try {
    await StudantModal.findByIdAndDelete(studantID);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const updateStudant = async (id:string, studant:IStudant) => {
  try {
   const _studant =  await StudantModal.findByIdAndUpdate(id, studant);
   if(_studant){
    return (_studant)
   }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const register = (studant: any) => {
//   data.studant.push(studant);
//   return data.studant;
// };
