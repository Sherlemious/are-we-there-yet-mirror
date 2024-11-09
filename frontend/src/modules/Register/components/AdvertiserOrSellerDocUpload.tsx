import { fadeIn } from "../styles/animations";
import { FileUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdvertiserOrSellerDocUpload({
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
    fieldName: string,
  ) => void;
  setDocuments: React.Dispatch<
    React.SetStateAction<{
      personalId: File | null;
      certificates: File[];
      taxDocument: File | null;
    }>
  >;
}) {
  const handleDeleteFile = (fieldName: string) => {
    setDocuments((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
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
        {documents.personalId && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-2 rounded bg-white px-2 py-1 text-sm text-blue-800">
              {documents.personalId.name}
              <button
                type="button"
                onClick={() => handleDeleteFile("personalId")}
                className="rounded-full p-1 hover:bg-blue-50"
              >
                <X className="h-3 w-3 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <FileUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-blue-800">
            Tax Registration Document
            {!documents.taxDocument && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </h3>
        </div>
        <p className="mb-3 text-blue-700">
          Upload your taxation registry card or business registration document.
          {!documents.taxDocument && (
            <span className="ml-1 text-sm text-red-500">
              This field is required
            </span>
          )}
        </p>
        <div className="relative">
          <Input
            name="taxDocument"
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            required={!documents.taxDocument}
            onChange={(e) => handleFileChange(e, "taxDocument")}
            id="taxDocument"
          />
          <Button
            type="button"
            onClick={() => document.getElementById("taxDocument")?.click()}
            className={`w-32 ${
              !documents.taxDocument
                ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
                : "bg-white hover:bg-gray-50"
            }`}
            variant="outline"
          >
            Choose File
          </Button>
          <span
            className={`ml-3 ${!documents.taxDocument ? "text-red-500" : "text-blue-700"}`}
          >
            {documents.taxDocument
              ? documents.taxDocument.name
              : "No file chosen"}
          </span>
        </div>
        {documents.taxDocument && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-2 rounded bg-white px-2 py-1 text-sm text-blue-800">
              {documents.taxDocument.name}
              <button
                type="button"
                onClick={() => handleDeleteFile("taxDocument")}
                className="rounded-full p-1 hover:bg-blue-50"
              >
                <X className="h-3 w-3 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
