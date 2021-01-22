import { Order } from "./../models/Order";
import mongoose from "mongoose";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { itemArguments } from "../resolvers/ItemResolver";
import { Product } from "../models/Product";

export interface orderArguments extends mongoose.Document {
  items: mongoose.Schema.Types.ObjectId[];
  totalPrice: number;
  user: mongoose.Schema.Types.ObjectId;
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
      const savedOrder = await order.save();
      const user = await User.findById(args.user);
      if (user) {
        user.orders.push(order._id);
        await user?.save();
        const items: itemArguments[] = [];
        for (let i = 0; i < args.items.length; i++) {
          const foundItem = await Item.findById(args.items[i]);
          if (foundItem) {
            items.push(foundItem);
          }
        }
        for (let i = 0; i < items.length; i++) {
          const foundProduct = await Product.findById(items[i].product);
          if (foundProduct) {
            items[i].product = foundProduct;
          }
        }
        return {
          id: savedOrder._id,
          items: items,
          totalPrice: savedOrder.totalPrice,
          user: user,
        };
      }
      return null;
    },

    updateOrder: async (_, { args }) => {
      // retrieve the target order based on passed in userId
      await Order.findOne({ userId: args.userId }, async (err, obj) => {
        if (err) {
          console.log(err);
        } else {
          var orderItems = obj.items;
          const inputItems = args.items;
          // for each Item passed in:
          for (var i in inputItems) {
            var matchFlag = false;
            // check each Item.product
            for (var j in orderItems) {
              // if there is a match, add the curr Item.quantity to the matched Item.quantity
              // (can be negative, quantity cannot go below zero)
              if (inputItems[i].product.name == orderItems[j].product.name) {
                orderItems[j].quantity += inputItems[i].quantity;
                // if quantity goes below or equal to 0, remove that item
                if (orderItems[j].quantity <= 0) {
                  orderItems.splice(j, 1);
                }
                matchFlag = true;
                break;
              }
            }
            // else, add the curr Item to the array if the Item.quantity > 0
            if (matchFlag == false && inputItems[i].quantity > 0) {
              orderItems.push(inputItems[i]);
            }
          }
          obj.items = orderItems;
          await obj.save();
        }
      });
      return true;
      // add all prices of items then update totalprice
      // retrieve prices of each Item.product in items
      // for each Item in items:
      // update the item's price
      // newTotal += price * Item.quantity
      //totalPrice = newTotal
    },

    deleteAllOrders: async (): Promise<Boolean> => {
      await Order.deleteMany({});
      return true;
    },
  },
};
