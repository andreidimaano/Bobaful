import { User } from "../models/User";
import mongoose from "mongoose";
import argon2 from "argon2";
import { orderArguments } from "./OrderResolver";
import { Order } from "../models/Order";
import { Item } from "../models/Item";
import { Product } from "../models/Product";

export interface userArguments extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  orders: mongoose.Schema.Types.ObjectId[];
}

export const UserResolver = {
  Query: {
    users: async () => {
      let userArray: object[] = [];
      let foundUsers;
      try {
        foundUsers = await User.find({});
      } catch(err) {
        throw new Error(err);
      }
      for(let i = 0; i < foundUsers.length; i++) {
        let currentUser = foundUsers[i];
        const orders: orderArguments[] = [];
        for(let j = 0; j < currentUser.orders.length; j++) {
          const foundOrder = await Order.findById(currentUser.orders[j]);
          if(foundOrder) {
            for(let k = 0; k < foundOrder.items.length; k++) {
              const foundItem = await Item.findById(foundOrder.items[k]);
              if(foundItem) {
                const foundProduct = await Product.findById(foundItem.product);
                if(foundProduct) {
                  foundItem.product = foundProduct;
                  foundOrder.items[k] = foundItem;
                }
              }
            }
            orders.push(foundOrder);
          }
        }
        let constructedUser = {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
          password: currentUser.password,
          orders: orders,
        }
        userArray.push(constructedUser);
      }
      return userArray;
    }
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
