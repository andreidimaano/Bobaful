require("dotenv").config();
import mongoose from "mongoose";
export const Schema = mongoose.Schema;
export const mongoUrl = process.env.MONGO_URL as string;
export const cookieName = process.env.COOKIE_NAME as string;
export const secret = process.env.SECRET as string;
