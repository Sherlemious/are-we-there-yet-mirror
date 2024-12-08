import Table, { type TableColumn } from "../../shared/components/Table";
import { useEffect, useRef, useState } from "react";
import { AccountType, type UserType } from "@/modules/shared/types/User.types";
import Modal, { type ModalRef } from "@/modules/shared/components/Modal";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import toast from "react-hot-toast";
import { X, FileText, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileTableProps {
  profiles: UserType[];
  setProfiles: React.Dispatch<React.SetStateAction<UserType[]>>;
  onDeleteProfile: (id: string) => void;
}

function ProfileTable({
  profiles,
  setProfiles,
  onDeleteProfile,
}: ProfileTableProps) {
  const tableColumns: TableColumn[] = [
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Accepted?",
      accessor: "accepted",
      render: (accepted: boolean) => (
        <span
          className={`rounded-full p-1 bg-${accepted ? "primary-green" : ""}`}
        >
          {accepted ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Rejected?",
      accessor: "rejected",
      render: (rejected: boolean) => (
        <span
          className={`rounded-full p-1 bg-${rejected ? "destructive" : ""}`}
        >
          {rejected ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Request Deletion?",
      accessor: "deletionRequested",
      render: (deletionRequested: boolean) => (
        <span className={`text-${deletionRequested ? "red" : "black"}-500`}>
          {deletionRequested ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Account Type",
      accessor: "account_type",
    },
  ];

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const modalRef = useRef<ModalRef>(null);

  const handleAccept = () => {
    if (!selectedUser) {
      console.error("No user selected");
      return;
    }

    toast.promise(
      axiosInstance.patch(`/users/accept-user/${selectedUser._id}`).then(() => {
        setProfiles((prevProfiles) => {
          const index = prevProfiles.findIndex(
            (profile) => profile._id === selectedUser._id,
          );
          if (index === -1) return prevProfiles;
          const updatedProfiles = [...prevProfiles];
          updatedProfiles[index] = {
            ...updatedProfiles[index],
            accepted: true,
          };
          return updatedProfiles;
        });
        modalRef.current?.close();
      }),
      {
        loading: "Accepting The User...",
        success: "Accepted The User",
        error: (error) => `Failed to accept the user: ${error}`,
      },
    );
  };

  const handleReject = () => {
    if (!selectedUser) {
      console.error("No user selected");
      return;
    }

    toast.promise(
      axiosInstance.patch(`/users/rejectUser/${selectedUser._id}`).then(() => {
        setProfiles((prevProfiles) => {
          const index = prevProfiles.findIndex(
            (profile) => profile._id === selectedUser._id,
          );
          if (index === -1) return prevProfiles;
          const updatedProfiles = [...prevProfiles];
          updatedProfiles[index] = {
            ...updatedProfiles[index],
            rejected: true,
          };
          return updatedProfiles;
        });
        modalRef.current?.close();
      }),
      {
        loading: "Rejecting The User...",
        success: "Rejected The User",
        error: (error) => `Failed to reject the user: ${error}`,
      },
    );
  };

  useEffect(() => {
    if (!selectedUser) return;
    const user = profiles.find((profile) => profile._id === selectedUser._id);
    if (!user) {
      console.error("User not found");
      return;
    }
    setSelectedUser(user);
  }, [profiles]);

  return (
    <>
      <div className="container mx-auto p-4">
        <Table
          data={profiles}
          columns={tableColumns}
          actions={{
            onEdit: (id: string) => {
              const user = profiles.find((profile) => profile._id === id);
              if (!user) {
                console.error("User not found");
                return;
              }
              setSelectedUser(user);
              modalRef.current?.open();
            },
            onDelete: onDeleteProfile,
          }}
        />
      </div>
      <Modal ref={modalRef} onClose={() => setSelectedUser(null)}>
        {selectedUser && (
          <>
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  User Details
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => modalRef.current?.close()}
                >
                  <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Section */}
                <Card className="md:col-span-1">
                  <CardContent className="flex flex-col items-center pt-6">
                    <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100 shadow-lg">
                      {selectedUser.profile_pic ? (
                        <img
                          src={selectedUser.profile_pic.url}
                          alt="Profile Pic"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center overflow-hidden rounded-full bg-gray-200">
                          <span className="font-medium text-gray-600">
                            {selectedUser.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {selectedUser.username || "Unknown User"}
                      </h3>
                      <p className="mt-1 text-gray-500">
                        {selectedUser.account_type || "User"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Attachments Section */}
                <Card className="md:col-span-2">
                  <CardContent className="pt-6">
                    <h4 className="mb-4 flex items-center text-lg font-semibold">
                      <FileText className="mr-2 text-blue-500" />
                      Attachments
                    </h4>
                    {selectedUser.attachments &&
                    selectedUser.attachments.length > 0 ? (
                      <div className="space-y-3">
                        {selectedUser.attachments.map((attach) => (
                          <details
                            key={attach._id}
                            className="overflow-hidden rounded-lg border"
                          >
                            <summary className="flex cursor-pointer items-center bg-gray-100 p-3">
                              <ImageIcon className="mr-2 text-gray-600" />
                              {attach.original_name}
                            </summary>
                            <div className="p-4">
                              <iframe
                                src={attach.url}
                                title={attach.original_name}
                                className="h-96 w-full rounded border"
                              ></iframe>
                            </div>
                          </details>
                        ))}
                      </div>
                    ) : (
                      <p className="italic text-gray-500">No attachments</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              {(selectedUser.account_type === AccountType.Seller ||
                selectedUser.account_type === AccountType.Advertiser ||
                selectedUser.account_type === AccountType.TourGuide) &&
                !(selectedUser.accepted || selectedUser.rejected) && (
                  <div className="mt-6 flex justify-end gap-4">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={handleAccept}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </div>
                )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ProfileTable;
