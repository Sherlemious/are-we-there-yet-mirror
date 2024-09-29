import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';

const museumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pictures: {
        type: [String],
        required: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    opening_hours: {
        type: String,
        required: true,
    },
    ticket_prices: {
        type: Number,
        required: true,
    },
    });

export const Museum = model('museum', museumSchema);