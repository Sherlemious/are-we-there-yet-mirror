import { Schema, model } from 'mongoose';
import { type } from '../../types/Tag.types';


const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(type),
        required: true,
    },
    historical_period: {
        type: String,
        required: true,
    },
});
export const Tag = model('tag', tagSchema);