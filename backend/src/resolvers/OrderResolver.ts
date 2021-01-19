import { ItemSchema } from "./../models/Item";
import { Order } from "./../models/Order";
import mongoose from "mongoose";
import { User } from "../models/User";

export interface orderArguments extends mongoose.Document {
  items: [typeof ItemSchema];
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
        return {
          id: savedOrder._id,
          items: savedOrder.items,
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
