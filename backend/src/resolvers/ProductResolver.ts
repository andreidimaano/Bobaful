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

    updateProduct: async (_, { args }) => {
      //check for args.name or args.id
      let foundProduct;
      //use if if available, fall back to name if not
      if (args.id) {
        try {
          foundProduct = await Product.findById(args.id);
        } catch (err) {
          throw new Error(err);
        }
      } else if (args.name) {
        try {
          foundProduct = await Product.findOne({ name: args.name });
        } catch (err) {
          throw new Error(err);
        }
      } else {
        console.log("No id or name provided to updateProduct.");
        return false;
      }

      if (args.fanFav) {
        foundProduct.fanFav = args.fanFav;
      }
      if (args.chefFav) {
        foundProduct.chefFav = args.chefFav;
      }
      if (args.description) {
        foundProduct.description = args.description;
      }
      try {
        await foundProduct.save();
      } catch (err) {
        throw new Error(err);
      }

      return true;
    },

    deleteAllProducts: async (): Promise<Boolean> => {
      await Product.deleteMany({});
      return true;
    },
  },
};
