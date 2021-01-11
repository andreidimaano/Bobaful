import { Schema } from "../constants";
import mongoose from 'mongoose'

const CatSchema = new Schema({
  name: String,
});

export const Cat = mongoose.model("Cat", CatSchema);


