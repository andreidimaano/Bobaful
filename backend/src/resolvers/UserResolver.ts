import { User } from "../models/User";
import mongoose from "mongoose";
import argon2 from "argon2";

export interface userArguments extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  orders: mongoose.Schema.Types.ObjectId[];
}

export const UserResolver = {
  Query: {
    users: () => User.find(),
  },
  Mutation: {
    createUser: async (_, { args }) => {
      const existingUser = await User.findOne({ name: args.name });
      if (existingUser) {
        //if the name is already taken
        return null;
      }
      const hashedPassword = await argon2.hash(args.password);
      console.log(args);
      const user = new User({
        name: args.name,
        email: args.email,
        phone: args.phone,
        password: hashedPassword,
        orders: args.orders,
      });

      await user.save();
      return user;
    },
    deleteAllUsers: async (): Promise<Boolean> => {
      await User.deleteMany({});
      return true;
    },
  },
};
