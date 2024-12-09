import Modal, { type ModalRef } from "@/modules/shared/components/Modal";
import type { TableColumn } from "@/modules/shared/components/Table";
import Table from "@/modules/shared/components/Table";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import type { ItineraryType } from "@/modules/shared/types/Itinerary.types";
import { X, Flag, FlagOff, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

export default function FlagItineraries() {
  const ref = useRef<ModalRef>(null);
  const [itineraries, setItineraries] = useState(
    useLoaderData() as ItineraryType[],
  );
  const [selectedId, setSelectedId] = useState("");
  const selectedItinerary = itineraries.find(
    (itinerary) => itinerary._id === selectedId,
  );

  const tableColumns: TableColumn[] = [
    {
      header: "Name",
      accessor: "name",
      render: (name: string) => (
        <div className="max-w-48 truncate font-semibold text-gray-800">
          {name}
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category.name",
      render: (category: string) => (
        <span className="rounded-full bg-blue-50 px-2 py-1 text-sm text-blue-600">
          {category}
        </span>
      ),
    },
    {
      header: "Active",
      accessor: "active",
      render: (active: boolean) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Avg Rating",
      accessor: "average_rating",
      render: (rating: number) => (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-gray-700">{rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      header: "Flagged",
      accessor: "flagged",
      render: (flagged: boolean) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${flagged ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
            }`}
        >
          {flagged ? "Flagged" : "Clear"}
        </span>
      ),
    },
  ];

  const handleFlagItinerary = (id: string) => {
    toast.promise(
      axiosInstance.patch(`/itineraries/toggleFlag/${id}`).then(() =>
        setItineraries((prev) => {
          const itineraries = [...prev];
          const index = itineraries.findIndex(
            (itinerary) => itinerary._id === id,
          );
          itineraries[index] = {
            ...itineraries[index],
            flagged: !itineraries[index].flagged,
          };
          return itineraries;
        }),
      ),
      {
        loading: (
          <div className="flex items-center">
            <RefreshCw className="mr-2 animate-spin" />
            Toggling itinerary flag...
          </div>
        ),
        success: "Itinerary flag toggled successfully!",
        error: "Failed to toggle itinerary flag.",
      },
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col py-14 text-primary-blue">
            <h3 className="py-4 text-2xl font-bold text-primary-blue">
              Flag/Unflag Itineraries
            </h3>
          </div>
        </header>

        <div className="overflow-hidden rounded-lg shadow-md">
          <Table
            columns={tableColumns}
            data={itineraries}
            actions={{
              onEdit: (id) => {
                setSelectedId(id);
                ref.current?.open();
              },
            }}
          />
        </div>
      </div>

      <Modal ref={ref} onClose={() => setSelectedId("")}>
        {selectedItinerary && (
          <div className="rounded-xl p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedItinerary.name}
              </h1>
              <button
                className="text-red-500 transition-colors hover:text-red-700"
                onClick={() => ref.current?.close()}
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <DetailRow
                label="Category"
                value={selectedItinerary.category.name}
              />
              <DetailRow
                label="Active"
                value={selectedItinerary.active ? "Yes" : "No"}
              />

              {selectedItinerary.accessibility && (
                <div className="col-span-2 rounded-lg p-4">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800">
                    Accessibility
                  </h2>
                  {Object.entries(selectedItinerary.accessibility).map(
                    ([key, value]) =>
                      key !== "_id" && (
                        <DetailRow
                          key={key}
                          label={key}
                          value={value ? "Yes" : "No"}
                        />
                      ),
                  )}
                </div>
              )}

              {selectedItinerary.tags.length > 0 && (
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedItinerary.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <DetailRow
                label="Average Rating"
                value={selectedItinerary.average_rating.toFixed(1)}
              />
              <DetailRow label="Language" value={selectedItinerary.language} />
              <DetailRow
                label="Available Datetimes"
                value={selectedItinerary.available_datetimes
                  .map((datetime) => new Date(datetime).toLocaleString())
                  .join(", ")}
              />
              <DetailRow
                label="Price"
                value={selectedItinerary.price.toString()}
              />
              <DetailRow
                label="Timeline"
                value={selectedItinerary.timeline
                  .split(" - ")
                  .map((datetime) => new Date(datetime).toLocaleString())
                  .join(" to ")}
              />
              <DetailRow
                label="Pick Up Location"
                value={selectedItinerary.pick_up_location.name}
              />
              <DetailRow
                label="Drop Off Location"
                value={selectedItinerary.drop_off_location.name}
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-4">
                <span
                  className={`text-lg font-semibold ${selectedItinerary.flagged ? "text-red-600" : "text-gray-600"
                    }`}
                >
                  Flagged: {selectedItinerary.flagged ? "Yes" : "No"}
                </span>
                <button
                  className={`flex items-center space-x-2 rounded-md px-4 py-2 text-white transition-colors ${selectedItinerary.flagged
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                    }`}
                  onClick={() => handleFlagItinerary(selectedId)}
                >
                  {selectedItinerary.flagged ? (
                    <>
                      <FlagOff size={20} />
                      <span>Unflag Itinerary</span>
                    </>
                  ) : (
                    <>
                      <Flag size={20} />
                      <span>Flag Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-gray-50 p-3">
    <span className="mb-1 block text-xs text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export async function loader() {
  return axiosInstance
    .get("/itineraries/admin")
    .then((res) => res.data.data.itineraries);
}
