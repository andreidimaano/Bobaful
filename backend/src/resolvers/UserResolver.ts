import { User } from "../models/User";
import mongoose from "mongoose";
import argon2 from "argon2";
import { orderArguments } from "./OrderResolver";
import { Order } from "../models/Order";
import { Item } from "../models/Item";
import { Product } from "../models/Product";
import { cookieName } from "../constants";

export interface userArguments extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  orders: mongoose.Schema.Types.ObjectId[];
}

export const UserResolver = {
  Query: {
    me: (_, __, { req }) => {
      // If user is not logged in
      if (!req.session.userId) {
        return null;
      }
      return User.findById(req.session.userId);
    },
    users: async () => {
      let userArray: object[] = [];
      let foundUsers;
      try {
        foundUsers = await User.find({});
      } catch (err) {
        throw new Error(err);
      }
      // Loop through each user to fill their orders variable
      for (let i = 0; i < foundUsers.length; i++) {
        let currentUser = foundUsers[i];
        const orders: orderArguments[] = [];
        for (let j = 0; j < currentUser.orders.length; j++) {
          const foundOrder = await Order.findById(currentUser.orders[j]);
          if (foundOrder) {
            // Find the corresponding items and product for each order
            for (let k = 0; k < foundOrder.items.length; k++) {
              const foundItem = await Item.findById(foundOrder.items[k]);
              if (foundItem) {
                const foundProduct = await Product.findById(foundItem.product);
                if (foundProduct) {
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
        };
        // Push the user to the userArray
        userArray.push(constructedUser);
      }
      return userArray;
    },
  },
  Mutation: {
    createUser: async (_, { args }, { req }) => {
      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) {
        //if the email is already taken
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
      // After creating the user, save a cookie to keep the user logged in
      req.session.userId = user.id;
      return user;
    },

    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        // No such username or email exists, return error
        return null;
      }
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        // Incorrect password, return error
        return null;
      }
      // Keep the user logged in using a cookie
      req.session.userId = user.id;
      return user;
    },

    logout: (_, __, { req, res }) => {
      return new Promise((resolve) =>
        req.session.destroy((err) => {
          res.clearCookie(cookieName);
          if (err) {
            console.log(err);
            // return false if an error occurred, resulting in a failed logout
            resolve(false);
          }
          // return true if everything went through, logging out the user
          resolve(true);
        })
      );
    },

    deleteUser: async (_, { args }) => {
      let foundUser;
      let foundOrders;
      try {
        foundUser = await User.findById(args.userId);
        foundOrders = await Order.find({});
      } catch (err) {
        throw new Error(err);
      }
      //delete any orders that belong to the specified user
      for (let i = 0; i < foundOrders.length; i++) {
        if (foundOrders[i].user == foundUser._id) {
          try {
            await Order.deleteOne({ _id: foundOrders[i]._id });
          } catch (err) {
            throw new Error(err);
          }
        }
      }
      //delete the user
      try {
        await User.deleteOne({ _id: args.userId });
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },

    deleteAllUsers: async (): Promise<Boolean> => {
      // each order must have a user so deleting all users means also deleting all orders
      try {
        await User.deleteMany({});
        await Order.deleteMany({});
      } catch (err) {
        throw new Error(err);
      }
      return true;
    },
  },
};
