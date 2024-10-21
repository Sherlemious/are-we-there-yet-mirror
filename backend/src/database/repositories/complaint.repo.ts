import { ComplaintType } from '../../types/Complaint.types';
import { Complaint } from '../models/complaint.model';

class ComplaintRepo {
  async fileComplaint(complaint: ComplaintType) {
    return await Complaint.create(complaint);
  }
}

export default new ComplaintRepo();
