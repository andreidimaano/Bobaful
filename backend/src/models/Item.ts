import mongoose from "mongoose";
import { Schema } from "../constants";
import { ProductSchema } from "./Product";

export const ItemSchema = new Schema({
    quantity: Number,
    product: {
        type: ProductSchema,
    },
});

export const Item = mongoose.model("Item", ItemSchema);
