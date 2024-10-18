export interface TagType {
  _id: number;
  name: string;
  type: type;
  historical_period: string;
}
export enum type {
  Museum = "Museum",
  Monument = "Monument",
  ReligiousSight = "Religious Sight",
  Palace = "Palace",
  Castle = "Castle",
  Preference = "Preference",
}
