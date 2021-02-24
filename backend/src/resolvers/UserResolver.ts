import { User } from "../models/User";
import mongoose from "mongoose";
import argon2 from "argon2";
import { orderArguments } from "./OrderResolver";
import { Order } from "../models/Order";
import { Item } from "../models/Item";
import { Product } from "../models/Product";
import { cookieName } from "../constants";
import { ObjectID } from "typeorm";
import { itemArguments } from "./ItemResolver";

export interface userArguments extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  orders: mongoose.Schema.Types.ObjectId[];
  cart: mongoose.Schema.Types.ObjectId[];
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
      // Loop through each user
      for (let i = 0; i < foundUsers.length; i++) {
        let currentUser = foundUsers[i];
        const orders: orderArguments[] = [];

        //fill their orders variable
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
        const currCart: itemArguments[] = [];
        //fill their cart variable
        for (let j = 0; j < currentUser.cart.length; j++) {
          const foundItem = await Item.findById(currentUser.cart[j]);
          if (foundItem) {
            const foundProduct = await Product.findById(foundItem.product);
            if (foundProduct) {
              foundItem.product = foundProduct;
            }
            currCart.push(foundItem);
          }
        }
        let constructedUser = {
          id: currentUser._id,
          email: currentUser.email,
          name: currentUser.name,
          password: currentUser.password,
          orders: orders,
          cart: currCart,
        };
        // Push the user to the userArray
        userArray.push(constructedUser);
      }
      return userArray;
    },
    getCurrCart: async (_, __, { req }) => {
      // If user is not logged in
      if (!req.session.userId) {
        return null;
      }
      // get current user's id
      let currUser;
      try {
        currUser = await User.findById(req.session.userId);
      } catch (err) {
        throw new Error(err);
      }
      return currUser.cart;
    },
  },
  Mutation: {
    createUser: async (_, { args }, { req }) => {
      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) {
        //if the email is already taken
        return {
          errors: [
            {
              field: "email",
              message: "email already taken",
            },
          ],
        };
      }
      if (args.password.length < 8) {
        return {
          errors: [
            {
              field: "password",
              message: "password length must be 8 or greater",
            },
          ],
        };
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
      return { user };
    },

    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        // No such email exists, return error
        return {
          errors: [
            {
              field: "email",
              message: "email doesn't exist",
            },
          ],
        };
      }
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        // Incorrect password, return error
        return {
          errors: [
            {
              field: "password",
              message: "incorrect password",
            },
          ],
        };
      }
      // Keep the user logged in using a cookie
      req.session.userId = user.id;
      return { user };
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

    updateCart: async (_, { args }) => {
      //find the target user to update
      let foundUser;
      if (args.userId) {
        try {
          foundUser = await User.findById(args.userId);
        } catch (err) {
          throw new Error(err);
        }
      } else {
        console.log("No user ID supplied to updateCart!");
        return false;
      }

      if (args.itemId) {
        let cartItemIds: ObjectID[];
        try {
          cartItemIds = foundUser.cart;
        } catch (err) {
          // if foundUser.cart does not exist, use an empty array
          cartItemIds = [];
        }

        let foundFlag = false;
        // iterate through the item ids in the cart array and see if the item is already there
        for (let i = 0; i < cartItemIds.length; i++) {
          if (args.itemId == cartItemIds[i]) {
            foundFlag = true;
            break;
          }
        }
        //if the itemId was not found in the cart array
        if (!foundFlag) {
          //if the supplied itemId is a valid and existing item, add that id to the cart array
          let foundItem;
          try {
            foundItem = await Item.findById(args.itemId);
          } catch (err) {
            throw new Error(err);
          }
          if (foundItem) {
            cartItemIds.push(args.itemId);
            foundUser.items = cartItemIds;
          }
        } else {
          console.log(
            "updateCart: Attempted to add an item to the cart that already exists in the cart."
          );
          return false;
        }
      } else {
        console.log("You must supply an item ID.");
        return false;
      }

      await foundUser.save();
      return true;
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
