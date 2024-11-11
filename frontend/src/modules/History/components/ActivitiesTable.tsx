import React, { useContext } from "react";
import Table, { ActionProps, TableColumn } from "../../shared/components/Table"; // Assuming you have a Table component in shared
import { UserContext } from "@/modules/shared/store/user-context";

interface Activity {
  _id: string;
  name: string;
  datetime: Date;
  location: { name: string };
  price: number;
  category: { name: string };
  tags: { name: string }[];
  specialDiscounts: number;
  average_rating?: number;
  reviews: {user: string, rating: number, comment: string}[];
}

interface ActivitiesTableProps {
  activities: Activity[];
  onEditRating: (object: { _id: string; type: string }) => void; // You can adjust this for different actions like edit, view, etc.
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({ activities, onEditRating }) => {
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
    { header: "Name", accessor: "name", render: (name) => (name !== undefined ? name : "N/A"),    },
    { header: "Date", accessor: "datetime", render: (datetime: Date) => new Date(datetime).toLocaleDateString() },
    { header: "Time", accessor: "datetime", render: (datetime: Date) => new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { header: "Location", accessor: "location.name", render: (name) => (name !== undefined ? name : "N/A"), },
    { header: "Category", accessor: "category.name", render: (name) => (name !== undefined ? name : "N/A"), },
    { header: "Price", accessor: "price"},
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
    { header: "Special Discounts", accessor: "specialDiscounts", render: (discounts: number) => `${discounts}%` },
    {
        header: "Ratings",
        accessor: "average_rating",
        render: (rating) => (rating !== undefined ? rating.toFixed(1) + "/5" : "N/A"),
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
      const activity = activities.find((a) => a._id === id);  // Make sure to match by _id or another unique field
      if (activity) {
        onEditRating({ _id: id, type: "activities" }); 
      }
    },
  };

  return <Table data={activities} columns={columns} actions={actions} />;
};

export default ActivitiesTable;
