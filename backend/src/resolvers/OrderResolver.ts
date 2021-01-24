import { Order } from "./../models/Order";
import mongoose from "mongoose";
import { User } from "../models/User";
import { Item } from "../models/Item";
import { itemArguments } from "../resolvers/ItemResolver";
import { Product } from "../models/Product";

export interface orderArguments extends mongoose.Document {
  items: mongoose.Schema.Types.ObjectId[] | itemArguments[];
  totalPrice: number;
  user: mongoose.Schema.Types.ObjectId;
}

export const OrderResolver = {
  Query: {
    orders: async () => {
      let ordersArray: object[] = [];
      let foundOrders;
      try {
        foundOrders = await Order.find({});
      } catch (err) {
        throw new Error(err);
      }
      for (let i = 0; i < foundOrders.length; i++) {
        let curr = foundOrders[i];
        //construct an order and push it to ordersArray
        const items: itemArguments[] = [];
        for (let j = 0; j < curr.items.length; j++) {
          const foundItem = await Item.findById(curr.items[j]);
          if (foundItem) {
            items.push(foundItem);
          }
        }
        for (let j = 0; j < items.length; j++) {
          const foundProduct = await Product.findById(items[j].product);
          if (foundProduct) {
            items[j].product = foundProduct;
          }
        }
        const user = await User.findById(curr.user);
        let constructedOrder = {
          id: curr._id,
          items: items,
          totalPrice: curr.totalPrice,
          user: user,
        };
        ordersArray.push(constructedOrder);
      }
      return ordersArray;
    },
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
          let orderItems = obj.items;
          const inputItems = args.items;
          // for each Item passed in:
          for (let i = 0; i < inputItems.length; i++) {
            let matchFlag = false;
            // check each Item.product
            for (let j = 0; j < orderItems.length; j++) {
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
      let foundOrders;
      let foundUsers;
      try {
        foundOrders = await Order.find({});
        foundUsers = await User.find({});
      } catch (err) {
        throw new Error(err);
      }
      // for each order:
      for (let i = 0; i < foundOrders.length; i++) {
        // for each user:
        for (let j = 0; j < foundUsers.length; j++) {
          // if item id in user.orders, remove it
          if (foundUsers[j].orders.includes(foundOrders[i]._id)) {
            // remove the id from user.orders
            try {
              await User.updateOne(
                { _id: foundUsers[j]._id },
                { $pullAll: { orders: [foundOrders[i]._id] } }
              );
            } catch (err) {
              throw new Error(err);
            }
          }
        }
        // delete the order
        try {
          await Order.deleteOne({ _id: foundOrders[i]._id });
        } catch (err) {
          throw new Error(err);
        }
      }
      return true;
    },
  },
};
