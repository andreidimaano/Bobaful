import { Product } from "../models/Product";

export interface productArguments {
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
        createProduct: async (_, {args}) => {
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
            await Product.deleteMany({});
            return true;
        },
    },
};