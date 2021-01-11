import mongoose from "mongoose";
import { Schema } from "../constants";
import { ItemSchema } from "./Item";
import { UserSchema } from "./User";

export const OrderSchema = new Schema({
  items: [ItemSchema],
  totalPrice: Number,
  user: UserSchema,
});

export const Order = mongoose.model("Order", OrderSchema);
