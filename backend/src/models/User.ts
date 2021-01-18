import mongoose from "mongoose";
import { Schema } from "../constants";

export const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  orderId: {
    type: [String],
    required: false,
  },
});

export const User = mongoose.model("User", UserSchema);
