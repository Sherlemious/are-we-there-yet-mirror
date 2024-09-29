import { Museum } from "../models/museum.models";
import { MuseumType } from "../../types/Museum.types";
import Validator from '../../utils/Validator.utils';

class MuseumRepo{
    async findMuseumById(id: string){
        Validator.validateId(id, 'Invalid museum ID');
        return await Museum.find({ _id: id });
    }

    async createMuseum(museum: MuseumType){
        const museumRes = await Museum.create(museum);
        return museumRes;
    }

    async updateMuseum(id: string, museum: MuseumType){
        Validator.validateId(id, 'Invalid museum ID');
        return await Museum.updateOne({ _id: id }, museum);
    }

    async deleteMuseum(id: string){
        Validator.validateId(id, 'Invalid museum ID');
        return await Museum.deleteOne({ _id: id });
    }
}

export default new MuseumRepo();