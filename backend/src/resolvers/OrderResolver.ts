import { ItemSchema } from "./../models/Item";
import { Order } from "./../models/Order";

export interface orderArguments {
  items: [typeof ItemSchema];
  totalPrice: number;
  userId: string;
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
        userId: args.userId,
      });
      await order.save();
      return order;
    },

    deleteAllOrders: async (): Promise<Boolean> => {
      await Order.deleteMany({});
      return true;
    },
  },
};
