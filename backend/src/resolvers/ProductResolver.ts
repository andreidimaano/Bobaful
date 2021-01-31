import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { Item } from "../models/Item";
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

    //this function is ineffecient, but efficiency does not matter for such a rarely used function
    deleteProduct: async (_, { args }) => {
      let foundItems;
      let foundOrders;
      try {
        foundItems = await Item.find({});
        foundOrders = await Order.find({});
      } catch (err) {
        throw new Error(err);
      }
      //Iterate through items and delete (any items containing the product) from orders
      for (let i = 0; i < foundItems.length; i++) {
        if (foundItems[i].product == args.productId) {
          for (let j = 0; j < foundOrders.length; j++) {
            if (foundOrders[j].items.includes(foundItems[i]._id)) {
              let updatedOrder;
              try {
                await Order.updateOne(
                  { _id: foundOrders[j]._id },
                  { $pullAll: { items: [foundItems[i]._id] } }
                );
                updatedOrder = await Order.findById(foundOrders[j]._id);
              } catch (err) {
                throw new Error(err);
              }
              // delete the order if it has no items
              if (updatedOrder.items.length < 1) {
                try {
                  await Order.deleteOne({ _id: updatedOrder._id });
                } catch (err) {
                  throw new Error(err);
                }
              }
            }
          }
          //delete the Item that contains the product
          try {
            await Item.deleteOne({ _id: foundItems[i]._id });
          } catch (err) {
            throw new Error(err);
          }
        }
      }
      //finally, delete the product
      try {
        await Product.deleteOne({ _id: args.productId });
      } catch (err) {
        throw new Error(err);
      }
      return true;
    },

    deleteAllProducts: async (): Promise<Boolean> => {
      //Orders have items which have products
      try {
        await Order.deleteMany({});
        await Item.deleteMany({});
        await Product.deleteMany({});
      } catch (err) {
        throw new Error(err);
      }
      return true;
    },
  },
};
