import { User } from "./../models/User";
import { OrderSchema } from "src/models/Order";

export interface orderArguments {
    name: string;
    email: string;
    phone: string;
    password: string;
    order: [typeof OrderSchema];
}

export const UserResolver = {
    Query: {
        users: () => User.find(),
    },
    Mutation: {
        createUser: async (_, { args }) => {
            console.log(args);
            const user = new User({
                name: args.name,
                email: args.email,
                phone: args.phone,
                password: args.password,
                //order: args.order,
            });
            console.log(user);
            await user.save();
            return user;
        },

        deleteAllUsers: async (): Promise<Boolean> => {
            await User.deleteMany({});
            return true;
        },
    },
};
