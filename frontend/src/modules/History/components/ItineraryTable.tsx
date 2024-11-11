import React, { useContext } from "react";
import Table, { ActionProps, TableColumn } from "../../shared/components/Table";
import { UserContext } from "@/modules/shared/store/user-context";

interface Itinerary {
  _id: string;
  name: string;
  tags: { name: string }[];
  timeline: string;
  language: string;
  price: number;
  average_rating?: number;
  created_by: { username: string };
  available_datetimes: Date[];
  accessibility: {
    wheelchairAccessible: boolean;
    assistiveHearingDevices: boolean;
    visualAidSupport: boolean;
    serviceAnimalAllowed: boolean;
    accessibleParking: boolean;
  };
  pick_up_location: { name: string };
  drop_off_location: { name: string };
  reviews: {user: string, rating: number, comment: string}[];
}

interface ItineraryTableProps {
  itineraries: Itinerary[];
  onEditRating: (object: { _id: string; type: string }) => void;
}

const ItineraryTable: React.FC<ItineraryTableProps> = ({ itineraries, onEditRating }) => {
  const { user } = useContext(UserContext);  
  const renderStars = (rating: number) => {
    const filledStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return (
      <span className="text-yellow-500 text-2xl">
        {filledStars}
        {emptyStars}
      </span>
    );
  };
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };
  const columns: TableColumn[] = [
    { header: "Name", accessor: "name" },
    { header: "Timeline", accessor: "timeline" },
    { header: "Language", accessor: "language" },
    { header: "Price", accessor: "price" },
    {
        header: "Available Dates",
        accessor: "available_datetimes",
        render: (dates: Date[]) =>
            dates.map((date, index) => <div key={index}>{new Date(date).toLocaleDateString()}</div>),
    },
    {
        header: "Accessibility",
        accessor: "accessibility",
        render: (accessibility) => (
           <div className="flex flex-col gap-2">
           <div className={`${accessibility.wheelchairAccessible ? 'bg-green-500' : 'bg-red-700'} text-black rounded-full px-3 py-1 text-sm`}>
            Wheelchair
          </div>
          <div className={`${accessibility.assistiveHearingDevices ? 'bg-green-500' : 'bg-red-700'} text-black rounded-full px-3 py-1 text-sm`}>
            Hearing Devices
          </div>
          <div className={`${accessibility.visualAidSupport ? 'bg-green-500' : 'bg-red-700'} text-black  rounded-full px-3 py-1 text-sm`}>
            Visual Aid
          </div>
          <div className={`${accessibility.serviceAnimalAllowed ? 'bg-green-500' : 'bg-red-700'} text-black  rounded-full px-3 py-1 text-sm`}>
            Service Animal
          </div>
          <div className={`${accessibility.accessibleParking ? 'bg-green-500' : 'bg-red-700'} text-black  rounded-full px-3 py-1 text-sm`}>
            Parking
          </div>
        </div>
      ),
    },
    { header: "Tags", accessor: "tags", render: (tags: { name: string }[]) => (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-400 text-black rounded-full px-3 py-1 text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      ),
    },
    { header: "Pick-up Location", accessor: "pick_up_location.name" },
    { header: "Drop-off Location", accessor: "drop_off_location.name" },
    { header: "Created By", accessor: "created_by.username" },
    {
      header: "Ratings",
      accessor: "average_rating",
      render: (rating) => (rating !== undefined ? rating.toFixed(1) +"/5" : "N/A"),
    },
    {
      header: "Your Reviews",
      accessor: "reviews",
      render: (reviews: { user: string; rating: number; comment: string }[]) =>
        reviews
          .filter((review) => review.user === user._id) // Filter reviews by user ID
          .map((review, index) => (
            <div key={index} className="mb-2">
              <div>{renderStars(review.rating)} <span className="text-gray-500">({truncateText(review.comment, 20)})</span></div>
            </div>
          )),
    },
  ];

  const actions: ActionProps = {
    onEdit: (id: string) => {
      const itinerary = itineraries.find((i) => i._id === id);
      if (itinerary) {
        onEditRating({ _id: id, type: "itineraries" });
      }
    },
  };

  return <Table data={itineraries} columns={columns} actions={actions} />;
};

export default ItineraryTable;
