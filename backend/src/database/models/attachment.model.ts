import { Schema, model } from 'mongoose';

const attachmentSchema = new Schema({
  original_name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Attachment = model('attachment', attachmentSchema);

export { Attachment, attachmentSchema };
