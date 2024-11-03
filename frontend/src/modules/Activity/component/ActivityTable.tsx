import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { LoaderDataType } from "../pages/Activity";
import axiosInstance from "../../shared/services/axiosInstance";
import type { TableColumn } from "../../shared/components/Table";
import type { TagType } from "../../shared/types/Tag.types";
import Table from "../../shared/components/Table";

function ActivityTable() {
  const { activites: loaded_activites } = useLoaderData() as LoaderDataType;
  const [activities, setActivities] = useState(loaded_activites);
  const navigate = useNavigate();

  const tableColumns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Date",
      accessor: "datetime",
      render: (value: string) => <>{formatDate(value)}</>,
    },
    {
      header: "Time",
      accessor: "datetime",
      render: (value: string) => <>{formatTime(value)}</>,
    },
    {
      header: "Location",
      accessor: "location.name",
    },
    {
      header: "Price",
      accessor: "price",
    },
    {
      header: "Category",
      accessor: "category.name",
    },
    {
      header: "Tags",
      accessor: "tags",
      render: (value: TagType[]) => (
        <span>
          {value.length === 0
            ? "No tags"
            : value.map(
              (tag, index) =>
                `${tag.name}${value.length - 1 !== index ? ", " : ""}`,
            )}
        </span>
      ),
    },
    {
      header: "Special Discount",
      accessor: "specialDiscounts",
    },
    {
      header: "Booking",
      accessor: "bookingOpen",
      render: (value: boolean) => <span>{value ? "Open" : "Booked"}</span>,
    },
  ];

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleEditActivity = (id: string) => {
    const activity = activities.find((activity) => activity._id === id);
    if (!activity) {
      console.error("Activity not found");
      return;
    }
    navigate(`edit/${activity._id}`);
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/activities/${id}`);

      if (response.status < 400) {
        setActivities((prev) => prev.filter((activity) => activity._id !== id));
      } else {
        console.error("Failed to delete activity response:", response);
        alert("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity error:", error);
      alert("Error deleting activity");
    }
  };

  return (
    <div className="container mx-auto">
      <Table
        data={activities}
        columns={tableColumns}
        actions={{
          onEdit: handleEditActivity,
          onDelete: handleDeleteActivity,
        }}
      />
    </div>
  );
}

export default ActivityTable;
