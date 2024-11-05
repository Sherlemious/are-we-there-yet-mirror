import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface ComplaintsFormProps {
  onClose: () => void;
  onSubmit: (data: { title: string; body: string }) => Promise<void>;
  initialValues?: { title: string; body: string };
}

const ComplaintsForm: React.FC<ComplaintsFormProps> = ({
  onClose,
  onSubmit,
  initialValues = { title: "", body: "" },
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [body, setBody] = useState(initialValues.body);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ title, body });
      onClose();
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  useEffect(() => {
    setTitle(initialValues.title);
    setBody(initialValues.body);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <h2 className="text-lg font-bold">{initialValues.title ? "Edit Complaint" : "New Complaint"}</h2>
      <label>
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          className="border p-2 rounded w-full"
        />
      </label>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="mr-4 rounded-lg px-6 py-3 font-bold text-accent-dark-blue transition-colors hover:bg-secondary-light_grey"
          >
          Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-accent-dark-blue px-6 py-3 font-bold text-white transition-all duration-150 hover:opacity-80">
          {initialValues.title ? "Update Complaint" : "Submit Complaint"}
        </button>
      </div>
    </form>
  );
};

export default ComplaintsForm;
