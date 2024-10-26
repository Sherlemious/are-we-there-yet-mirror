import { ObjectId } from 'mongodb';
import Validator from '../../utils/Validator.utils';
import { Attachment } from '../models/attachment.model';

class AttachmentRepo {
  async findAttachmentById(id: string) {
    Validator.validateId(id, 'Invalid attachment ID');
    return await Attachment.findOne({ _id: new ObjectId(id) });
  }

  async createAttachment(attachment: any): Promise<any> {
    return await Attachment.create(attachment);
  }

  async deleteAttachment(id: string) {
    Validator.validateId(id, 'Invalid attachment ID');
    return await Attachment.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteAttachments(ids: string[]) {
    return await Attachment.deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } });
  }
}

export default new AttachmentRepo();
