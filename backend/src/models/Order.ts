import mongoose from "mongoose";
import { orderArguments } from "src/resolvers/OrderResolver";
import { Schema } from "../constants";
import { ItemSchema } from "./Item";

export const OrderSchema = new Schema({
  items: {
    type: [ItemSchema],
  },
  totalPrice: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Order = mongoose.model<orderArguments>("Order", OrderSchema);
