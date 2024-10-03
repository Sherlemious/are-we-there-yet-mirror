// TODO: Add review type

export interface ProductType {
  seller: string;
  name: string;
  category: string;
  tags: string[];
  description?: string;
  price: number;
  available_quantity: number;
  created_at?: Date;
  rating?: number;
  documents?: {
    licenses?: string[];
    certifications?: string[];
  };
  services_offered?: string[];
  availability?: string[];
}
