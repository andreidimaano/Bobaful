import mongoose from "mongoose";
import { Schema } from "../constants";
import { ItemSchema } from "./Item";
import { UserSchema } from "./User";

export const OrderSchema = new Schema({
    items: {
        type: [ItemSchema],
    },
    totalPrice: Number,
    user: {
        type: UserSchema,
    },
});

export const Order = mongoose.model("Order", OrderSchema);
