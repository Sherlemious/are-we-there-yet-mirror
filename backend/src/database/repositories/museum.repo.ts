import { ObjectId } from 'mongodb';
import { getTagIds } from '../models/tag.model';
import { Museum } from '../models/museum.model';
import { MuseumType } from '../../types/Museum.types';
import Validator from '../../utils/Validator.utils';

class MuseumRepo {
  async getAllMuseums(attributeName?: string, attributeValue?: RegExp | string) {
    const query = attributeName && attributeValue ? { [attributeName]: attributeValue } : {};
    return Museum.find(query).populate('tags');
  }
  async findMuseumById(id: string) {
    Validator.validateId(id, 'Invalid museum ID');
    return await Museum.findById(id).populate('tags');
  }

  async findMuseumsByTags(tagIds: ObjectId[]) {
    return await Museum.find({ tags: { $all: tagIds } }).populate('tags');
  }

  async createMuseum(museum: MuseumType) {
    const museumRes = await Museum.create(museum);
    return museumRes;
  }

  async updateMuseum(id: string, museum: MuseumType) {
    Validator.validateId(id, 'Invalid museum ID');
    return await Museum.findByIdAndUpdate(id, museum);
  }

  async deleteMuseum(id: string) {
    Validator.validateId(id, 'Invalid museum ID');
    return await Museum.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new MuseumRepo();
