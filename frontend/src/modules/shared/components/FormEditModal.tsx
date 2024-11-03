import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Eye, EyeOff } from "lucide-react";

interface EditModalProps {
  fields: string[];
  onSave: (data: Record<string, string>) => void;
}

export type formModalRef = {
  open: (initialData?: Record<string, string>) => void;
  close: () => void;
};

const EditModal = forwardRef(({ fields, onSave }: EditModalProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (initialData = {}) => {
      setFormData(initialData);
      setIsOpen(true);
      setShowPassword(false); // Reset password visibility when opening modal
    },
    close: () => {
      setIsOpen(false);
      setShowPassword(false); // Reset password visibility when closing modal
    },
  }));

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderField = (field: string) => {
    if (field === "Password") {
      const hasPassword = formData[field]?.length > 0;

      return (
        <div className="relative">
          <Input
            id={field}
            type={showPassword ? "text" : "password"}
            value={formData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Enter new password`}
            className="h-12 border-slate-200 bg-white pr-10 text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100"
          />
          {hasPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      );
    }

    return (
      <Input
        id={field}
        disabled={field === "Date of Birth" || field === "Wallet"}
        value={formData[field] || ""}
        type="text"
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={`Enter ${field}`}
        className="h-12 border-slate-200 bg-white text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500"
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-none bg-white shadow-xl sm:max-w-3xl">
        <DialogHeader className="border-b border-slate-100 pb-6">
          <DialogTitle className="text-3xl font-bold text-slate-800">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-slate-500">
            Update your personal information below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-2 py-8">
          {fields.map((field) => (
            <div key={field} className="space-y-2">
              <Label
                htmlFor={field}
                className="text-sm font-medium text-slate-700"
              >
                {field === "YearsOfExperience"
                  ? "Years of Experience"
                  : field === "MobileNumber"
                    ? "Mobile Number"
                    : field}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>

        <DialogFooter className="border-t border-slate-100 pt-6">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="h-12 border-slate-200 px-6 text-base hover:bg-slate-50 hover:text-slate-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="8x-8 ml-3 h-12 bg-accent-dark-blue text-base text-white hover:bg-accent-dark-blue/80"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

EditModal.displayName = "EditModal";

export default EditModal;
