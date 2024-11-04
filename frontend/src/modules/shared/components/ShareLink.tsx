import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Modal, { ModalRef } from './Modal'; // Import the Modal component
import { Clipboard, Mail } from 'lucide-react'; // Import the Clipboard and Mail icons
import { toast } from 'react-hot-toast'; // Import toast for notifications

export interface ShareLinkRef {
  open(): void;
  close(): void;
}

interface ShareLinkProps {
  link: string; // The link to be shared
}

const ShareLink = forwardRef<ShareLinkRef, ShareLinkProps>(({ link }, ref) => {
  const dialogRef = useRef<ModalRef>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.open();
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard!"); // Toast message for copy success
    }).catch(() => {
      toast.error("Failed to copy link."); // Toast message for copy failure
    });
  };

  const handleEmailShare = (service: string) => {
    const subject = "Check out this interesting link!";
    const body = `I wanted to share this link with you: ${link}\n\nFeel free to check it out!`;
    let mailtoLink = "";

    switch (service) {
      case "gmail":
        mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        break;
      case "yahoo":
        mailtoLink = `https://compose.mail.yahoo.com/?to=&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        break;
      case "outlook":
        mailtoLink = `https://outlook.live.com/owa/?path=/mail/action/compose&to=&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        break;
      default:
        return;
    }

    window.open(mailtoLink, '_blank');
    toast.success("Opening email client..."); // Toast message when opening email
  };

  const handleCancel = () => {
    dialogRef.current?.close(); // Close modal on cancel
  };

  return (
    <Modal ref={dialogRef} onClose={handleCancel}>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2">Share this link</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={link}
            readOnly
            className="border rounded px-2 py-1 w-80 mr-2" // Increased width to 80
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
            title="Copy link"
          >
            <Clipboard size={20} />
          </button>
        </div>
        <h3 className="text-md font-semibold mb-2">Share via:</h3>
        <div className="flex flex-col space-y-2"> {/* Vertical layout for buttons */}
          <button
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => handleEmailShare("gmail")}
          >
            <Mail className="w-6 h-6 mr-2 text-white" /> {/* Gmail icon in green */}
            Gmail
          </button>
          <button
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => handleEmailShare("yahoo")}
          >
            <Mail className="w-6 h-6 mr-2 text-white" /> {/* Yahoo icon in red */}
            Yahoo
          </button>
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => handleEmailShare("outlook")}
          >
            <Mail className="w-6 h-6 mr-2 text-white" /> {/* Outlook icon in blue */}
            Outlook
          </button>
        </div>
      </div>
        <div className="flex justify-end w-full "> {/* Container for the exit button */}
          <button
            onClick={handleCancel}
            className="rounded-lg px-3 py-3 font-bold text-accent-dark-blue transition-colors hover:bg-secondary-light_grey"
          >
            Exit
          </button>
        </div>
    </Modal>
  );
});

export default ShareLink;
