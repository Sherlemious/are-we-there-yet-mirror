import React, { useContext, useEffect, useState, useRef } from "react";
import Modal, { ModalRef } from "@/modules/shared/components/Modal";
import axiosInstance from "@/modules/shared/services/axiosInstance";
import { UserContext } from "../../shared/store/user-context";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";

function StatusPill({ status }: { status: string }) {
  const colors = {
    pending: "bg-yellow-400",
    resolved: "bg-green-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-black ${colors[status.toLowerCase()]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

function Table({
  complaints,
  onClick,
}: {
  complaints: Complaint[];
  onClick: (complaint: Complaint) => void;
}) {
  const headerClassName = "bg-accent-dark-blue text-white px-4 py-4";
  const rowClassName =
    "text-text-primary px-4 py-4 text-center max-w-[200px] truncate";
  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <table className="mt-6 w-full rounded-lg bg-gray-100">
      <thead>
        <tr>
          <th className={headerClassName + " rounded-tl-lg"}>Title</th>
          <th className={headerClassName}>Description</th>
          <th className={headerClassName}>Created By</th>
          <th className={headerClassName}>Created At</th>
          <th className={headerClassName}>Status</th>
          <th className={headerClassName + " rounded-tr-lg"}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint) => (
          <tr key={complaint._id}>
            <td className={rowClassName}>{complaint.title}</td>
            <td className={rowClassName}>{complaint.body}</td>
            <td className={rowClassName}>
              {complaint.created_by?.username || "Anonymous"}
            </td>
            <td className={rowClassName}>{formatDate(complaint.created_at)}</td>
            <td className={rowClassName}>
              <StatusPill status={complaint.status} />
            </td>
            <td className={rowClassName}>
              <button onClick={() => onClick(complaint)}>
                <Eye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ViewComplaint({ viewingComplaint, handleCloseModal }) {
  const [comments, setComments] = useState<
    {
      comment: string;
      created_at: string;
    }[]
  >([]);
  const [newComment, setNewComment] = useState("");
  const [commentRefresh, setCommentRefresh] = useState(0);

  const formatDate = (date) => new Date(date).toLocaleDateString();

  useEffect(() => {
    const run = async () => {
      // escape early
      if (!viewingComplaint) return;
      try {
        // fetch comments
        const response = await axiosInstance
          .get(`/reviews/complaints/${viewingComplaint?._id}`)
          .then((res) => {
            console.log(res);
            return res;
          });

        // set the comments
        await setComments(
          response.data.reviews.map((review) => {
            return {
              comment: review.comment,
              created_at: formatDate(review.createdAt),
            };
          }),
        );
      } catch (error) {
        toast.error(`Error fetching comments: ${error}`);
      }
    };

    run();
  }, [viewingComplaint, commentRefresh]);

  const handleComment = async () => {
    try {
      // init the body
      const body = {
        modelType: "complaints",
        modelId: viewingComplaint?._id,
        review: {
          rating: 5,
          comment: newComment,
        },
      };

      // post the comment
      await axiosInstance.post("/reviews", body);

      // refresh comments
      setCommentRefresh(commentRefresh + 1);

      // clear the input
      setNewComment("");
    } catch (error) {
      toast.error(`Error commenting: ${error}`);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      // init the body
      const body = {
        status: "Resolved",
      };

      // post the comment
      await axiosInstance.patch(`/complaints/${id}`, body);

      // refresh comments
      setCommentRefresh(commentRefresh + 1);

      // toast
      toast.success("Complaint resolved successfully");
    } catch (error) {
      toast.error(`Error commenting: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 rounded-lg bg-white p-8 shadow-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">Complaint Details</h1>

      {/* Modal Body */}
      <div className="flex w-full flex-col items-start justify-between gap-12 md:flex-row">
        {/* Complaint Info */}
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <div className="flex flex-col items-start gap-2 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              {viewingComplaint?.title || "No Title"}
            </h2>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-gray-600">Body:</span>
              <p className="max-w-[350px] truncate text-gray-700 text-text-primary">
                {viewingComplaint?.body || "No Description"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">Created By:</span>
              <p className="text-gray-700 text-text-primary">
                {viewingComplaint?.created_by?.username || "Anonymous"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">Created At:</span>
              <p className="text-gray-700 text-text-primary">
                {viewingComplaint?.created_at || "Unknown"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">Status:</span>
              <p className="text-text-primary">
                {viewingComplaint ? (
                  <StatusPill status={viewingComplaint.status} />
                ) : (
                  "Unknown"
                )}
              </p>
            </div>
          </div>
          <button
            className="mt-8 w-1/2 rounded-lg bg-accent-dark-blue px-6 py-3 font-bold text-white transition-transform duration-150 hover:scale-105"
            onClick={() => handleResolve(viewingComplaint?._id)}
          >
            Resolve
          </button>
        </div>

        {/* Comments Section */}
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-2 rounded-lg bg-gray-50 p-4 shadow-md"
            >
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-gray-600">Comment:</span>
                <p className="text-text-primary">{comment.comment}</p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-gray-600">Created At:</span>
                <p className="text-sm text-gray-500">{comment.created_at}</p>
              </div>
            </div>
          ))}
          <input
            type="text"
            placeholder="Enter your comment"
            value={newComment}
            className="w-full rounded-lg bg-gray-100 p-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-accent-dark-blue"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="rounded-lg bg-accent-dark-blue px-6 py-3 font-bold text-white transition-transform duration-150 hover:scale-105"
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      </div>

      {/* Close Button */}
      <button
        className="mt-8 rounded-lg bg-red-500 px-6 py-3 font-bold text-white transition-transform duration-150 hover:scale-105"
        onClick={() => {
          setComments([]);
          setNewComment("");
          handleCloseModal();
        }}
      >
        Close
      </button>
    </div>
  );
}

export default function AdminAllComplaints() {
  // get user from context
  const { user } = useContext(UserContext);
  const modalRef = useRef<ModalRef>(null);
  const [viewingComplaint, setViewingComplaint] = useState<Complaint | null>(
    null,
  );

  // init some big boi states
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [refresh, setRefresh] = useState(0);

  // init some more states
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isfiltering, setIsFiltering] = useState<number>(0); // 0 = all, 1 = pending, 2 = resolved
  const [isSorting, setIsSorting] = useState<number>(0); // 0 = time asc, 1 = time desc

  // fetch complaints
  useEffect(() => {
    const run = async () => {
      try {
        // fetch complaints
        const response = await axiosInstance.get("/complaints");

        // set the complaints
        setComplaints(response.data.data.complaints);
      } catch (error) {
        toast.error(`Error fetching complaints: ${error}`);
      }
    };
    run();
  }, [refresh]);

  // update the complaints list
  useEffect(() => {
    setFilteredComplaints(complaints);
  }, [complaints]);

  // some cool functions
  const handleFilter = () => {
    // update the filter
    if (isfiltering === 0) {
      setFilteredComplaints(complaints);
    } else if (isfiltering === 1) {
      setFilteredComplaints(
        complaints.filter((complaint) => complaint.status === "Pending"),
      );
    } else {
      setFilteredComplaints(
        complaints.filter((complaint) => complaint.status === "Resolved"),
      );
    }

    // increase filter with wrap around
    setIsFiltering((isfiltering + 1) % 3);
  };

  const handleSort = () => {
    // update the sort
    if (isSorting === 0) {
      setFilteredComplaints(
        [...filteredComplaints].sort((a, b) =>
          a.created_at.localeCompare(b.created_at),
        ),
      );
    } else {
      setFilteredComplaints(
        [...filteredComplaints]
          .sort((a, b) => a.created_at.localeCompare(b.created_at))
          .reverse(),
      );
    }

    // increase sort with wrap around
    setIsSorting((isSorting + 1) % 2);
  };

  // more cool funcs but this time for the modal
  const handleOpenModal = (complaint?: Complaint) => {
    setViewingComplaint(complaint || null);
    modalRef.current?.open();
  };
  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  // UI stuff
  return (
    <div className="p-9 text-text-primary">
      <div className="grid grid-cols-[70%_30%] items-center justify-between gap-4">
        {/* header stuff */}
        <div className="flex flex-col divide-y-2 divide-borders-bottomBorder rounded-lg bg-gray-100 px-8 py-16">
          <h1 className="py-2 text-4xl font-bold">Welcome, {user.username}</h1>
          <h3 className="py-2 text-2xl font-bold">Complaints</h3>
        </div>

        {/* tool box */}
        <div className="flex h-full flex-col justify-center gap-8 rounded-lg bg-gray-100 px-8 py-8">
          <button
            className="flex items-center gap-2 rounded-lg bg-accent-dark-blue px-6 py-3 text-center font-bold text-white transition-all duration-150 hover:opacity-80"
            onClick={handleFilter}
          >
            {isfiltering === 1
              ? "All"
              : isfiltering === 2
                ? "Pending"
                : "Resolved"}{" "}
            Complaint
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-accent-dark-blue px-6 py-3 text-center font-bold text-white transition-all duration-150 hover:opacity-80"
            onClick={handleSort}
          >
            Sorting by {isSorting === 0 ? "Time Ascending" : "Time Descending"}
          </button>
        </div>
      </div>

      {/* table stuff */}
      <Table complaints={filteredComplaints} onClick={handleOpenModal} />

      {/* modal stuff for viewing details */}
      <Modal ref={modalRef} onClose={handleCloseModal}>
        <ViewComplaint
          viewingComplaint={viewingComplaint}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
