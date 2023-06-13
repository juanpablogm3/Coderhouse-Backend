import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [{
    idProduct: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number },
    _id: false
  }]

}, { versionKey: false });

export const CartModel = model("carts", cartSchema);