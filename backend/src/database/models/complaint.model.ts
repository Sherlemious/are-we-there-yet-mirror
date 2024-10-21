import { Schema, model } from 'mongoose';
import { ComplaintStatus } from '../../types/Complaint.types';

const complaintSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: ComplaintStatus.PENDING,
    enum: Object.values(ComplaintStatus),
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

const complaintModel = model('complaint', complaintSchema);

export { complaintSchema, complaintModel };
