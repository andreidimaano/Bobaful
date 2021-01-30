import { Item } from "../models/Item";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
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
      for (let i = 0; i < foundItems.length; i++) {
        const foundProduct = await Product.findById(foundItems[i].product);
        if (foundProduct) {
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
      const product = await Product.findById(args.product);
      if (product) {
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

    deleteAllItems: async (): Promise<Boolean> => {
      let foundItems;
      let foundOrders;
      try {
        foundItems = await Item.find({});
        foundOrders = await Order.find({});
      } catch (err) {
        throw new Error(err);
      }
      // for each item:
      for (let i = 0; i < foundItems.length; i++) {
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
