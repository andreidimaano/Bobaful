import mongoose from "mongoose";
import { userArguments } from "src/resolvers/UserResolver";
import { Schema } from "../constants";

export const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: false,
    },
  ],
});

export const User = mongoose.model<userArguments>("User", UserSchema);
