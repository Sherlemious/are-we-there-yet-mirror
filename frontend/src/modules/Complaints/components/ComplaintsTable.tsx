import React from "react";
import Table, { TableColumn, ActionProps } from "../../shared/components/Table";

interface Complaint {
  _id: string;
  title: string;
  body: string;
  status: string;
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
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${status === "Pending" ? " bg-primary-green text-gray-900" : "bg-green-200 text-green-900"}`}>
          {status}
        </span>
      ),
    },
  ];

  const actions: ActionProps = {
    onEdit: (id: string) => {
      const complaint = complaints.find((c) => c._id === id);
      if (complaint) {
        onEditComplaint(complaint);
      }
    },
  };

  return <Table data={complaints} columns={columns} actions={actions} />;
};

export default ComplaintsTable;
