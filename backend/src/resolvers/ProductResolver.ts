import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { Item } from "../models/Item";
import mongoose from "mongoose";

export interface productArguments extends mongoose.Document {
  name: string;
  fanFav?: boolean;
  chefFav?: boolean;
  price: number;
  ounces: number;
  description: string;
}

export const ProductResolver = {
  Query: {
    products: () => Product.find(),
  },
  Mutation: {
    createProduct: async (_, { args }) => {
      console.log(args);
      const product = new Product({
        name: args.name,
        description: args.description,
        price: args.price,
        ounces: args.ounces,
        chefFav: args.chefFav,
        fanFav: args.fanFav,
      });
      await product.save();
      return product;
    },

    deleteAllProducts: async (): Promise<Boolean> => {
      //Orders have items which have products
      try {
        await Order.deleteMany({});
      } catch (err) {
        throw new Error(err);
      }
      try {
        await Item.deleteMany({});
      } catch (err) {
        throw new Error(err);
      }
      try {
        await Product.deleteMany({});
      } catch (err) {
        throw new Error(err);
      }
      return true;
    },
  },
};
