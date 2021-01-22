import mongoose from "mongoose";
import { itemArguments } from "src/resolvers/ItemResolver";
import { Schema } from "../constants";

export const ItemSchema = new Schema({
  quantity: Number,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

export const Item = mongoose.model<itemArguments>("Item", ItemSchema);
