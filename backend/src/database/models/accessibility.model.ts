import { Schema } from 'mongoose';

const accessibilitySchema = new Schema({
  wheelchairAccessible: {
    type: Boolean,
    required: true,
    default: false,
  },
  assistiveHearingDevices: {
    type: Boolean,
    required: true,
    default: false,
  },
  visualAidSupport: {
    type: Boolean,
    required: true,
    default: false,
  },
  serviceAnimalAllowed: {
    type: Boolean,
    required: true,
    default: false,
  },
  accessibleParking: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export { accessibilitySchema };
