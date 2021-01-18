import { Item } from "../models/Item";
import { ProductSchema } from "./../models/Product";

export interface itemArguments {
    quantity: number;
    product: typeof ProductSchema;
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
            await item.save();
            return item;
        },

        deleteAllItems: async (): Promise<Boolean> => {
            await Item.deleteMany({});
            return true;
        },
    },
};
