import React from "react";
import Table, { TableColumn, ActionProps } from "../../shared/components/Table";

interface Complaint {
  _id: string;
  title: string;
  body: string;
  status: string;
  reviews: {comment: string, createdAt: string}[];
  created_at: string;
  updated_at: string;
}

interface ComplaintsTableProps {
  complaints: Complaint[];
  onEditComplaint: (complaint: Complaint) => void; // Change here
}

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
    complaints,
    onEditComplaint,
  }) => {
    // Sort complaints: Resolved first, then Pending
    const sortedComplaints = [...complaints].sort((a, b) => {
      if (a.status === "Pending" && b.status === "Resolved") return 1;
      if (a.status === "Resolved" && b.status === "Pending") return -1;
      return 0; // Maintain original order if both are the same status
    });
  const columns: TableColumn[] = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "body" },
    {
      header: "Issued At",
      accessor: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: "status",
      render: (status) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status === "Pending" ? " bg-primary-green text-gray-900" : "bg-green-600 text-white"}`}>
          {status}
        </span>
      ),
    },
    { header: "Comments", accessor: "reviews", render: (reviews: { comment: string, createdAt: string }[]) => 
        reviews.map((review, index) => (
          <div key={index}>
            {review.comment} <span className="text-gray-500">({new Date(review.createdAt).toLocaleDateString()})</span>
          </div>
        ))
    ,
    },
  ];

  const actions: ActionProps = {
    onEdit: (id: string) => {
      const complaint = complaints.find((c) => c._id === id);
      if (complaint && complaint.status === "Pending") { // Allow edit only for Pending complaints
        onEditComplaint(complaint);
      }
    },  
  };

  return <Table data={sortedComplaints} columns={columns} actions={actions} />;
};

export default ComplaintsTable;
