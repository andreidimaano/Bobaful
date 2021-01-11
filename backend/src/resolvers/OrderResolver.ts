import { Order } from "./../models/Order";
import { ItemSchema } from "./../models/Item";
import { UserSchema } from "src/models/User";

export interface orderArguments {
    items: [typeof ItemSchema];
    totalPrice: number;
    user: typeof UserSchema;
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
            await order.save();
            return order;
        },

        deleteAllOrders: async (): Promise<Boolean> => {
            await Order.deleteMany({});
            return true;
        },
    },
};
