import { Dog } from "../models/Dog";

export const DogResolver = {
  Query: {
    dogs: () => Dog.find(),
  },
  Mutation: {
    createDog: async (_, { name }) => {
      const puppy = new Dog({ name });
      await puppy.save();
      return puppy;
    },
  },
};
