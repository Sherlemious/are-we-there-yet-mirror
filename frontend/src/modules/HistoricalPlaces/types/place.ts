interface place {
  id: number;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  ticketPrices: string;
  pictures?: string[];
}

export default place;
