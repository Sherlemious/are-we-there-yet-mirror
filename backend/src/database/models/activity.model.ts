import { Schema, model } from 'mongoose';
import { locationSchema } from './location.model';
import { ActivityType } from '../../types/Activity.types';
import { ValidationException } from '../../exceptions/ValidationException';
import { getTagIds } from './tag.model';

const activitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    },
    specialDiscounts: {
      type: Number,
      min: 0,
      max: 100,
    },
    bookingOpen: {
      type: Boolean,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    modified_by: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

async function getActivityIds(activitiesData: ActivityType[]): Promise<ActivityType[]> {
  const activityIds: ActivityType[] = [];

  if (!activitiesData) {
    return activityIds;
  }

  for (const activityData of activitiesData) {
    const tagIds = await getTagIds(activityData.tags);
    activityData.tags = tagIds;
    let activity = await Activity.findOne(activityData);

    if (!activity) {
      throw new ValidationException('One or more activities are invalid');
    }
    activityIds.push(activity.id);
  }

  return activityIds;
}

const Activity = model('activity', activitySchema);

export { Activity, activitySchema, getActivityIds };
