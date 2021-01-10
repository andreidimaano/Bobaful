import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => Int)
    @PrimaryColumn()
    id!: number;

    @Field()
    @Column()
    productName: string;

    @Field()
    @Column()
    fanFav: boolean;

    @Field()
    @Column()
    chefFav: boolean;

    @Field(()=> Float)
    @Column()
    price!: number;

    @Field(()=> Int)
    @Column()
    ounces!: number;

    @Field(()=> String)
    @Column()
    description!: string;
}
