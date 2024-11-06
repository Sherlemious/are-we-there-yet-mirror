import React from "react";
import Table, { ActionProps, TableColumn } from "../../shared/components/Table";

interface TourGuide {
  _id: string;
  username: string;
  email: string;
  mobilenumber: string;
  years_of_experience?: number;
  average_rating?: number;
}

interface TourGuidesTableProps {
  tourGuides: TourGuide[];
  onEditRating: (tourGuide: TourGuide) => void; // Change here
}

const TourGuidesTable: React.FC<TourGuidesTableProps> = ({ tourGuides, onEditRating }) => {
  const columns: TableColumn[] = [
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Mobile Number", 
        accessor: "mobile_number",
        render: (mobilenumber) => (mobilenumber !== undefined ? mobilenumber : "N/A"),
      },
    {
      header: "Experience (Years)",
      accessor: "years_of_experience",
      render: (experience) => (experience !== undefined ? experience : "N/A"),
    },
    {
      header: "Average Rating",
      accessor: "average_rating",
      render: (rating) => (rating !== undefined ? rating.toFixed(1) : "N/A"),
    },
  ];
  const actions: ActionProps = {
    onEdit: (id: string) => {
      const tourGuide = tourGuides.find((c) => c._id === id);
      if (tourGuide) { // Allow edit only for Pending complaints
        onEditRating(tourGuide);
      }
    },  
  };


  return <Table data={tourGuides} columns={columns} actions={actions} />;
};

export default TourGuidesTable;
