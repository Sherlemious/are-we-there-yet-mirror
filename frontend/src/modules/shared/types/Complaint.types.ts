export interface ComplaintType {
  title: String;
  body: String;
  status: ComplaintStatus;
  created_at: Date;
  updated_at: Date;
}

export enum ComplaintStatus {
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
}
