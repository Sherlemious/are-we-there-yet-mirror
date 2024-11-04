import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirmDelete,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby=""
        className="border-none bg-white shadow-xl sm:max-w-lg"
      >
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Delete Account
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-base text-slate-600">
            Are you sure you want to delete your account? This action cannot be
            undone and all of your data will be permanently deleted.
          </p>
        </div>

        <DialogFooter className="border-t border-slate-100 pt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-12 border-slate-200 px-6 text-base hover:bg-slate-50 hover:text-slate-800"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirmDelete}
            className="ml-3 h-12 bg-red-600 px-6 text-base text-white hover:bg-red-700"
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
