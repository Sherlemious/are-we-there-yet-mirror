export interface Tag {
    _id: string;         // The unique ID for each tag (assigned by the backend)
    name: string;        // The name of the tag
    type: string;        // The type of the tag
    historical_period: string;    // The historical period of the tag
  }