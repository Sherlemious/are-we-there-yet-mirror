import { fadeIn } from "../styles/animations";
import { FileUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function TourGuideDocUpload({
  documents,
  handleFileChange,
  setDocuments,
}: {
  documents: {
    personalId: File | null;
    certificates: File[];
    taxDocument: File | null;
  };
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => void;
  setDocuments: React.Dispatch<
    React.SetStateAction<{
      personalId: File | null;
      certificates: File[];
      taxDocument: File | null;
    }>
  >;
}) {
  const handleDeleteFile = (fieldName: string, index?: number) => {
    if (fieldName === "certificates" && typeof index === "number") {
      setDocuments((prev) => ({
        ...prev,
        certificates: prev.certificates.filter((_, i) => i !== index),
      }));
    } else {
      setDocuments((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  return (
    <motion.div variants={fadeIn} className="space-y-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <FileUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-800">
            Personal ID Required
            {!documents.personalId && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </h3>
        </div>
        <p className="mb-3 text-blue-700">
          Please upload a clear scan or photo of your government-issued ID.
          {!documents.personalId && (
            <span className="ml-1 text-sm text-red-500">
              This field is required
            </span>
          )}
        </p>
        <div className="relative">
          <Input
            name="personalId"
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            required={!documents.personalId}
            onChange={(e) => handleFileChange(e, "personalId")}
            id="personalId"
          />
          <Button
            type="button"
            onClick={() => document.getElementById("personalId")?.click()}
            className={`w-32 ${
              !documents.personalId
                ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
                : "bg-white hover:bg-gray-50"
            }`}
            variant="outline"
          >
            Choose File
          </Button>
          <span
            className={`ml-3 ${!documents.personalId ? "text-red-500" : "text-blue-700"}`}
          >
            {documents.personalId
              ? documents.personalId.name
              : "No file chosen"}
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-blue-800">
              Tour Guide Certificates
              {documents.certificates.length === 0 && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </h3>
          </div>
          <span
            className={`text-sm ${documents.certificates.length === 0 ? "text-red-500" : "text-blue-600"}`}
          >
            {documents.certificates.length} file(s) selected
          </span>
        </div>
        <p className="mb-3 text-blue-700">
          Upload your relevant tour guide certifications and licenses.
          {documents.certificates.length === 0 && (
            <span className="ml-1 text-sm text-red-500">
              At least one certificate is required
            </span>
          )}
        </p>
        <div className="relative">
          <Input
            name="certificates"
            type="file"
            accept="image/*,.pdf"
            multiple
            className="hidden"
            required={documents.certificates.length === 0}
            onChange={(e) => handleFileChange(e, "certificates")}
            id="certificates"
          />
          <Button
            type="button"
            onClick={() => document.getElementById("certificates")?.click()}
            className={`w-32 ${
              documents.certificates.length === 0
                ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
                : "bg-white hover:bg-gray-50"
            }`}
            variant="outline"
          >
            Choose Files
          </Button>
          <span
            className={`ml-3 ${documents.certificates.length === 0 ? "text-red-500" : "text-blue-700"}`}
          >
            {documents.certificates.length > 0
              ? `${documents.certificates.length} files selected`
              : "No files chosen"}
          </span>
        </div>
        {documents.certificates.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {documents.certificates.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded bg-white px-2 py-1 text-sm text-blue-800"
              >
                {file.name}
                <button
                  type="button"
                  onClick={() => handleDeleteFile("certificates", index)}
                  className="rounded-full p-1 hover:bg-blue-50"
                >
                  <X className="h-3 w-3 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
