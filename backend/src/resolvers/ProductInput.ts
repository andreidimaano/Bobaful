import { InputType, Field } from 'type-graphql';


@InputType()
export class ProductInput {
    @Field()
    productName: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field()
    ounces: number;

    @Field()
    fanFav: boolean;
    
    @Field()
    chefFav: boolean;
}