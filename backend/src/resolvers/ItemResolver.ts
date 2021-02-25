import { Item } from "../models/Item";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { User } from "../models/User";
import mongoose from "mongoose";
import { productArguments } from "../resolvers/ProductResolver";

export interface itemArguments extends mongoose.Document {
  quantity: number;
  product: mongoose.Schema.Types.ObjectId | productArguments;
  price: Number;
  ounces: Number;
}

export const ItemResolver = {
  Query: {
    items: async () => {
      let foundItems;
      try {
        foundItems = await Item.find({});
      } catch (err) {
        throw new Error(err);
      }
      // Find each item's products
      for (let i = 0; i < foundItems.length; i++) {
        const foundProduct = await Product.findById(foundItems[i].product);
        if (foundProduct) {
          // Replace the objectID with their corresponding product
          foundItems[i].product = foundProduct;
        }
      }
      return foundItems;
    },
  },
  Mutation: {
    createItem: async (_, { args }) => {
      const item = new Item({
        quantity: args.quantity,
        product: args.product,
        price: args.price,
        ounces: args.ounces,
      });
      const savedItem = await item.save();
      // Find the corresponding product in the item
      const product = await Product.findById(args.product);
      if (product) {
        // Return an item object with all fields filled
        return {
          id: savedItem._id,
          quantity: savedItem.quantity,
          product: product,
          price: savedItem.price,
          ounces: savedItem.ounces,
        };
      }
      return null;
    },

    deleteItem: async (_, { args }) => {
      let foundItem;
      let foundOrders;
      let foundUsers;
      try {
        foundItem = await Item.findById(args.itemId);
        foundOrders = await Order.find({});
        foundUsers = await User.find({});
      } catch (err) {
        throw new Error(err);
      }

      // for each user:
      for (let i = 0; i < foundUsers.length; i++) {
        // if item id in user.cart, remove it
        if (foundUsers[i].cart.includes(foundItem._id)) {
          //remove the id from the user.cart
          try {
            await User.updateOne(
              { _id: foundUsers[i]._id },
              { $pullAll: { cart: [foundItem._id] } }
            );
          } catch (err) {
            throw new Error(err);
          }
        }
      }

      // for each order:
      for (let i = 0; i < foundOrders.length; i++) {
        // if item id in order.items, remove it
        if (foundOrders[i].items.includes(foundItem._id)) {
          //remove the id from the order.items
          try {
            await Order.updateOne(
              { _id: foundOrders[i]._id },
              { $pullAll: { items: [foundItem._id] } }
            );
          } catch (err) {
            throw new Error(err);
          }
        }
      }
      //delete the item
      try {
        await Item.deleteOne({ _id: foundItem._id });
      } catch (err) {
        throw new Error(err);
      }

      return true;
    },

    deleteAllItems: async (): Promise<Boolean> => {
      let foundItems;
      let foundOrders;
      let foundUsers;
      try {
        foundItems = await Item.find({});
        foundOrders = await Order.find({});
        foundUsers = await User.find({});
      } catch (err) {
        throw new Error(err);
      }
      // for each item:
      for (let i = 0; i < foundItems.length; i++) {
        // for each user:
        for (let j = 0; j < foundUsers.length; j++) {
          // if item id in user.cart, remove it
          if (foundUsers[j].items.includes(foundItems[i]._id)) {
            //remove the id from the user.cart
            try {
              await User.updateOne(
                { _id: foundUsers[j]._id },
                { $pullAll: { cart: [foundItems[i]._id] } }
              );
            } catch (err) {
              throw new Error(err);
            }
          }
        }
        // for each order:
        for (let j = 0; j < foundOrders.length; j++) {
          // if item id in order.items, remove it
          if (foundOrders[j].items.includes(foundItems[i]._id)) {
            //remove the id from the order.items
            try {
              await Order.updateOne(
                { _id: foundOrders[j]._id },
                { $pullAll: { items: [foundItems[i]._id] } }
              );
            } catch (err) {
              throw new Error(err);
            }
          }
        }
        //delete the item
        try {
          await Item.deleteOne({ _id: foundItems[i]._id });
        } catch (err) {
          throw new Error(err);
        }
      }
      return true;
    },
  },
};
