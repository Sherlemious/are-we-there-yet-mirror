import { ObjectId } from 'mongodb';
import { Tag } from '../models/tag.model';
import { TagType } from '../../types/Tag.types';
import Validator from '../../utils/Validator.utils';

class TagRepo {
  async getAllTags(attributeName?: string, attributeValue?: RegExp | string) {
    const query = attributeName && attributeValue ? { [attributeName]: attributeValue } : {};
    return await Tag.find(query);
  }

  async findTagById(id: string) {
    Validator.validateId(id, 'Invalid tag ID');
    return await Tag.find({ _id: new ObjectId(id) });
  }

  async createTag(tag: TagType) {
    const tagRes = await Tag.create(tag);
    return tagRes;
  }

  async updateTag(id: string, tag: TagType) {
    Validator.validateId(id, 'Invalid tag ID');
    return await Tag.updateOne({ _id: new ObjectId(id) }, tag);
  }

  async deleteTag(id: string) {
    Validator.validateId(id, 'Invalid tag ID');
    return await Tag.deleteOne({ _id: new ObjectId(id) });
  }
}
export default new TagRepo();
