import mongoose from "mongoose";
import { orderArguments } from "src/resolvers/OrderResolver";
import { Schema } from "../constants";

export const OrderSchema = new Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
  totalPrice: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Order = mongoose.model<orderArguments>("Order", OrderSchema);
