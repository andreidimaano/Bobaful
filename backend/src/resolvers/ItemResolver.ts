import { Item } from "../models/Item";
import mongoose from "mongoose";
import { productArguments } from "../resolvers/ProductResolver";
import { Product } from "../models/Product";

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
      await Item.deleteMany({});
      return true;
    },
  },
};
