import { ObjectId } from 'mongodb';
import { getTagIds } from '../models/tag.model';
import { Museum } from "../models/museum.model";
import { MuseumType } from "../../types/Museum.types";
import Validator from '../../utils/Validator.utils';

class MuseumRepo{
    async findMuseumById(id: string){
        Validator.validateId(id, 'Invalid museum ID');
        return await Museum.findById(id).populate('tags');
    }

    async createMuseum(museum: MuseumType){
        const tagIds = await getTagIds(museum.tags);
        museum.tags = tagIds;
        const museumRes = await Museum.create(museum);
        return museumRes;
    }

    async updateMuseum(id: string, museum: MuseumType){
        Validator.validateId(id, 'Invalid museum ID');
        const tagIds = await getTagIds(museum.tags);
        museum.tags = tagIds;
        return await Museum.findByIdAndUpdate(id, museum);
    }

    async deleteMuseum(id: string){
        Validator.validateId(id, 'Invalid museum ID');
        return await Museum.deleteOne({ _id: new ObjectId(id) });
    }
}

export default new MuseumRepo();