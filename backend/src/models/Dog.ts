import mongoose from 'mongoose'
import { Schema } from '../constants';

export const DogSchema = new Schema({
  name: String,
});

export const Dog = mongoose.model("Dog", DogSchema);


