import type {
  AccessibilityType,
  ItineraryType,
} from "@/modules/shared/types/Itinerary.types";

export type ItineraryPostType = Omit<
  ItineraryType,
  "_id" | "tags" | "activities" | "accessibility" | "flagged" | "average_rating"
> & {
  tags: string[];
  activities: { activity: string; duration: number }[];
  accessibility: Omit<AccessibilityType, "_id">;
};
