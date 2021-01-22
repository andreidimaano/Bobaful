import { Order } from "./../models/Order";
import mongoose from "mongoose";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { itemArguments } from "../resolvers/ItemResolver";
import { Product } from "../models/Product";

export interface orderArguments extends mongoose.Document {
  items: mongoose.Schema.Types.ObjectId[];
  totalPrice: number;
  user: mongoose.Schema.Types.ObjectId;
}

export const OrderResolver = {
  Query: {
    orders: () => Order.find(),
  },
  Mutation: {
    createOrder: async (_, { args }) => {
      const order = new Order({
        items: args.items,
        totalPrice: args.totalPrice,
        user: args.user,
      });
      const savedOrder = await order.save();
      const user = await User.findById(args.user);
      if (user) {
        user.orders.push(order._id);
        await user?.save();
        const items: itemArguments[] = [];
        for (let i = 0; i < args.items.length; i++) {
          const foundItem = await Item.findById(args.items[i]);
          if (foundItem) {
            items.push(foundItem);
          }
        }
        for (let i = 0; i < items.length; i++) {
          const foundProduct = await Product.findById(items[i].product);
          if (foundProduct) {
            items[i].product = foundProduct;
          }
        }
        return {
          id: savedOrder._id,
          items: items,
          totalPrice: savedOrder.totalPrice,
          user: user,
        };
      }
      return null;
    },

    deleteAllOrders: async (): Promise<Boolean> => {
      await Order.deleteMany({});
      return true;
    },
  },
};
