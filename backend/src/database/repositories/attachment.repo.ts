import { ObjectId } from 'mongodb';
import Validator from '../../utils/Validator.utils';
import { Attachment } from '../models/attachment.model';
import { AttachmentType } from '../../types/Attachment.types';

class AttachmentRepo {
  async findAttachmentById(id: string): Promise<AttachmentType | null> {
    Validator.validateId(id, 'Invalid attachment ID');
    return await Attachment.findOne({ _id: new ObjectId(id) });
  }

  async createAttachment(attachment: any): Promise<AttachmentType> {
    return await Attachment.create(attachment);
  }

  async deleteAttachment(id: string) {
    Validator.validateId(id, 'Invalid attachment ID');
    return await Attachment.deleteOne({ _id: new ObjectId(id) });
  }
}

export default new AttachmentRepo();
