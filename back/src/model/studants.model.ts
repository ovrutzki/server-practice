import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export interface IStudant{
    first: string;
    last:string;
    email:string;
    password:string;
}

export const studantSchema = new Schema<IStudant>({
    first: {type: String, required:true},
    last:{type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true}
})

export const StudantModal = mongoose.model<IStudant>("students", studantSchema);