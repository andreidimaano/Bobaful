require('dotenv').config();
import mongoose from 'mongoose';
export const Schema = mongoose.Schema;
export const mongoUrl = process.env.MONGO_URL as string;