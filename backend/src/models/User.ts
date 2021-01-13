import mongoose from "mongoose";
import { Schema } from "../constants";
//import { OrderSchema } from "./Order";

export const UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    // order: {
    //     type: [OrderSchema],
    //     required: false,
    // },
});

export const User = mongoose.model("User", UserSchema);
