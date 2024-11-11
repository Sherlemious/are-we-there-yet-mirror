import React, { useContext } from "react";
import Table, { ActionProps, TableColumn } from "../../shared/components/Table";
import { UserContext } from "@/modules/shared/store/user-context";

interface TourGuide {
  _id: string;
  username: string;
  email: string;
  mobile_number: string;
  years_of_experience?: number;
  average_rating?: number;
  reviews: {user: string, rating: number, comment: string}[];
}

interface TourGuidesTableProps {
  tourGuides: TourGuide[];
  onEditRating: (object: { _id: string; type: string }) => void; // Change here
}

const TourGuidesTable: React.FC<TourGuidesTableProps> = ({ tourGuides, onEditRating }) => {
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
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Mobile Number", 
        accessor: "mobile_number",
        render: (mobile_number) => (mobile_number !== undefined ? mobile_number : "N/A"),
      },
    {
      header: "Experience (Years)",
      accessor: "years_of_experience",
      render: (experience) => (experience !== undefined ? experience : "N/A"),
    },
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
      const tourGuide = tourGuides.find((c) => c._id === id);
      if (tourGuide) { // Allow edit only for Pending complaints
        onEditRating({ _id: id, type: "users" });
      }
    },  
  };


  return <Table data={tourGuides} columns={columns} actions={actions} />;
};

export default TourGuidesTable;
