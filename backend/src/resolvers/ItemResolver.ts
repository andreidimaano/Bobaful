import { Item } from "../models/Item";
import mongoose from "mongoose";
import { productArguments } from "../resolvers/ProductResolver";
import { Product } from "../models/Product";

export interface itemArguments extends mongoose.Document {
  quantity: number;
  product: mongoose.Schema.Types.ObjectId | productArguments;
}

export const ItemResolver = {
  Query: {
    items: () => Item.find(),
  },
  Mutation: {
    createItem: async (_, { args }) => {
      const item = new Item({
        quantity: args.quantity,
        product: args.product,
      });
      const savedItem = await item.save();
      const product = await Product.findById(args.product);
      if (product) {
        return {
          quantity: savedItem.quantity,
          product: product,
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
