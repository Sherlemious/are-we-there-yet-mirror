export interface ReviewType {
  _id: string;
  user?: string;
  rating?: number;
  comment?: string;
  created_by?: string;
  modified_by?: string;
}
