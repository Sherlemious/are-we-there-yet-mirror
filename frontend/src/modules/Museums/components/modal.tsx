import { X } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalRef {
  open(): void;
  close(): void;
}

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  title: string;
}

const Modal = forwardRef(function Modal({ children, onClose, title }: ModalProps, ref: React.Ref<ModalRef>) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
      close() {
        dialog.current?.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="backdrop:bg-base-black/15 w-2/3 rounded-lg p-12 shadow-md outline-none relative" // Set to relative positioning
    >
      <div className="border-system-neutral-3 flex border-b py-6">
        <h1 className="flex-grow text-xl font-semibold">{title}</h1>
        {/* Close button styled and positioned */}
        <button
          type="button" // Changed to 'button' to prevent form reset
          onClick={() => dialog.current?.close()}
          className="absolute top-4 right-4 flex-shrink-0 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          <X size={16} />
        </button>
      </div>
      {children}
    </dialog>,
    document.getElementById('modal-root')!
  );
});

export default Modal;
