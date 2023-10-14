import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const usersSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        max: 100,
    },
    last_name: {
        type: String,
        required: false,
        max: 100,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        max: 100,
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user',
    },
    documents: [
        {
            name: { type: String, required: true },
            reference: { type: String, required: true },
        }
    ],
    last_connection: {
        type: Date,
        default: Date.now()
    },
    }, { 
        versionKey: false 
    }
);

usersSchema.plugin(mongoosePaginate);

export const UserModel = model('users', usersSchema);