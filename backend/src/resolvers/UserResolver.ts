import { User } from "../models/User";

export interface userArguments {
  name: string;
  email: string;
  phone: string;
  password: string;
  orderId: string[];
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
        orderId: args.orderId,
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
