import { Schema, model } from 'mongoose';

const attachmentSchema = new Schema(
  {
    original_name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const Attachment = model('attachment', attachmentSchema);

export { Attachment, attachmentSchema };
