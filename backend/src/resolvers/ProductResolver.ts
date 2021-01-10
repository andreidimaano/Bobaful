import { Product } from "../entities/Product";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProductInput } from "./ProductInput";

@Resolver()
export class ProductResolver {
    @Mutation(() => Product)
    async createProduct(@Arg('input') input: ProductInput) {
        
        return Product.create({
            ...input
        }).save();
    }

    @Query(() => [Product])
    products() {
        return Product.find();
    }
}