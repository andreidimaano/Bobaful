import { Product } from "../models/Product";
import mongoose from "mongoose";

export interface productArguments extends mongoose.Document {
  name: string;
  fanFav?: boolean;
  chefFav?: boolean;
  description: string;
}

export const ProductResolver = {
  Query: {
    products: () => Product.find(),
  },
  Mutation: {
    createProduct: async (_, { args }) => {
      const product = new Product({
        name: args.name,
        description: args.description,
        chefFav: args.chefFav,
        fanFav: args.fanFav,
      });
      await product.save();
      return product;
    },

    deleteAllProducts: async (): Promise<Boolean> => {
      await Product.deleteMany({});
      return true;
    },
  },
};
