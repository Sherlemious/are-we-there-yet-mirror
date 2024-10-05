import { Schema, model } from 'mongoose';
import { TagType, type } from '../../types/Tag.types';
import { ValidationException } from '../../exceptions/ValidationException';

const tagSchema = new Schema(
  {
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

async function getTagIds(tagsData: TagType[]): Promise<TagType[]> {
  const tagIds: TagType[] = [];

  if (!tagsData) {
    return tagIds;
  }

  for (const tagData of tagsData) {
    let tag = await Tag.findOne(tagData);

    if (!tag) {
      throw new ValidationException('One or more tags are invalid');
    }

    tagIds.push(tag.id);
  }

  return tagIds;
}

const Tag = model('tag', tagSchema);

export { Tag, tagSchema, getTagIds };
