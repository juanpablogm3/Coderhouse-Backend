import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime:{ type: Date, required: true, default: Date.now }, // Puse Date, quizás cambiar por string!!
    amount: { type: Number, required: true },
    purchaser:{ type: String, required: true }
}, { versionKey: false });

ticketSchema.pre('save', function (next) {
    if (!this.purchase_datetime) {
      this.purchase_datetime = new Date();
    }
    next();
});

export const ticketModel = model("ticket", ticketSchema);