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
        <h1 className="flex-grow text-xl font-semibold text-accent-dark-blue">{title}</h1>
      </div>
      {children}
    </dialog>,
    document.getElementById('modal-root')!
  );
});

export default Modal;
