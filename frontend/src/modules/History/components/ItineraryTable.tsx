import React, { useContext } from "react";
import Table, { ActionProps, TableColumn } from "../../shared/components/Table";
import { UserContext } from "@/modules/shared/store/user-context";

interface Itinerary {
  _id: string;
  name: string;
  timeline: string;
  average_rating?: number;
  created_by: { _id: string, username: string };
  available_datetimes: Date[];
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
    const halfStar = rating % 1 >= 0.5; 
    const emptyStars = "☆".repeat(5 - Math.floor(rating) - ((halfStar)?1:0));
    return (
      <span className="text-yellow-500 text-2xl">
        {filledStars}
        {halfStar && "⯨"}
        {emptyStars}
      </span>
    );
  };
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };
  const columns: TableColumn[] = [
    { header: "Name", accessor: "name" },
    {
        header: "Available Dates",
        accessor: "available_datetimes",
        render: (dates: Date[]) =>
            dates.map((date, index) => <div key={index}>{new Date(date).toLocaleDateString()}</div>),
    },
    {
      header: "Created By",
      accessor: "created_by",
      render: (created_by: { _id: string, username: string }) => {
        return (
          <div>
            <div>{created_by.username}</div>
            <button
              onClick={() =>
                onEditRating({ _id: created_by._id, type: "users" })
              }
              className="mt-2 px-4 py-2 text-sm bg-accent-gold font-bold transition-all duration-150 hover:opacity-80"
            >
              Add Review
            </button>
          </div>
        );
      },
    },        
    {
      header: "Ratings",
      accessor: "average_rating",
      render: (rating) => (rating !== undefined ? renderStars(rating): "N/A"),
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
    {
      header: "Actions",
      accessor: "_id",
      render: (id: string) => (
        <button
          onClick={() => onEditRating({ _id: id, type: "itineraries" })}
          className="px-4 py-2 text- bg-accent-gold font-bold transition-all duration-150 hover:opacity-80"
        >
          Add Review
        </button>
      ),
    }
  ];

  const actions: ActionProps = {
    // onEdit: (id: string) => {
    //   const itinerary = itineraries.find((i) => i._id === id);
    //   if (itinerary) {
    //     onEditRating({ _id: id, type: "itineraries" });
    //   }
    // },
  };

  return <Table data={itineraries} columns={columns} actions={null} />;
};

export default ItineraryTable;
