import mongoose from "mongoose";
import { productArguments } from "src/resolvers/ProductResolver";
import { Schema } from "../constants";

export const ProductSchema = new Schema({
  name: String,
  fanFav: {
    type: Boolean,
    required: false,
  },
  chefFav: {
    type: Boolean,
    required: false,
  },
  price: Number,
  ounces: Number,
  description: String,
});

export const Product = mongoose.model<productArguments>(
  "Product",
  ProductSchema
);
