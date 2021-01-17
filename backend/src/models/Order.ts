import mongoose from "mongoose";
import { Schema } from "../constants";
import { ItemSchema } from "./Item";

export const OrderSchema = new Schema({
  items: {
    type: [ItemSchema],
  },
  totalPrice: Number,
  userId: String,
});

export const Order = mongoose.model("Order", OrderSchema);
