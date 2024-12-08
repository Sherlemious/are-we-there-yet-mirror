import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import Button from "./Button";
import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";

const customStyles = {
  container: "h-auto w-full border-2 border-gray-300 pr-14 pt-14 pl-20 pb-14",
  title: "mb-16 w-fit border-b-2 border-borders-bottomBorder pb-2 text-2xl",
  sliderContainer: "relative",
  sliderContent: "overflow-hidden",
  sliderWrapper: "flex transition-all duration-600 ease-in-out",
  slide: "w-[25%] flex-shrink-0 px-2 transition-all duration-600",
  slideContent:
    "h-full w-80 overflow-auto border-2 border-gray-300 bg-white p-8 relative cursor-pointer",
  slideTitle: "mb-2 font-bold",
  slideText: "text-sm",
  navButton:
    "absolute top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-black",
  removeButton:
    "absolute group top-2 right-2 z-10 rounded-full bg-background-button p-1 hover:bg-red-600 focus:outline-none duration-150",
  addSlideDiv:
    "flex items-center justify-center h-full w-80 border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50",
  addSlideIcon: "text-gray-400 w-16 h-16",
  navigationButtons: "flex justify-between mt-4",
  endBeginButton:
    "px-4 py-2 rounded hover:opacity-70 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
  // Custom Modal Styles
  modalOverlay:
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  modalContent:
    "bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden",
  modalHeader: "px-6 py-4 ",
  modalTitle: "text-xl font-semibold text-gray-900",
  modalBody: "px-6 py-4",
  modalFooter: "px-6 py-4 flex justify-end gap-2",
  input:
    "w-full px-4 py-2  rounded-md focus:outline-none border-2 border-borders-primary",
  button:
    "px-4 py-2 rounded-md transition-all duration-200 duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
  primaryButton: "text-white hover:opacity-70",
  secondaryButton: "bg-red-400 text-black hover:opacity-70",
};

const Slider = ({
  title,
  array,
  id,
  account_type,
}: {
  title: string;
  array: string[];
  id: string;
  account_type: string;
}) => {
  const updateProp =
    account_type === "TourGuide" ? "previous_work" : "company_profile";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure list is always initialized as an array
  const [list, setList] = useState<string[]>(() => {
    if (Array.isArray(array)) {
      return array;
    }
    return [];
  });

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (list?.length + 1));
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + list?.length + 1) % (list?.length + 1),
      );
    }
  };

  const removeSlide = async (index: number, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const updatedList = list.filter((_, i) => i !== index);
      const updateData = { [updateProp]: updatedList };

      const resPromise = axiosInstance.patch(`/users/${id}`, updateData);

      toast.promise(resPromise, {
        loading: "Removing item...",
        success: "Item removed",
        error: "Failed to remove item",
      });

      const res = await resPromise;

      if (res.status === 200) {
        setList(updatedList);
        if (currentIndex > index + 1) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        } else if (currentIndex === index + 1 && index === list.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }
      } else {
        console.error("Error updating data:", res.statusText);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const goToBeginning = () => {
    if (!isTransitioning && currentIndex !== 0) {
      setIsTransitioning(true);
      setCurrentIndex(0);
    }
  };

  const goToEnd = () => {
    if (!isTransitioning && currentIndex !== list?.length) {
      setIsTransitioning(true);
      setCurrentIndex(list?.length);
    }
  };

  const focusSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewItemText("");
  };

  const handleModalSubmit = async () => {
    if (!newItemText.trim()) return;

    setIsSubmitting(true);

    try {
      const updatedList = [...list, newItemText];
      const updateData = { [updateProp]: updatedList };

      const resPromise = axiosInstance.patch(`users/${id}`, updateData);

      toast.promise(resPromise, {
        loading: "Adding item...",
        success: "Item added",
        error: "Failed to add item",
      });

      const res = await resPromise;

      if (res.status === 200) {
        setList(updatedList);
        setNewItemText("");
        setIsModalOpen(false);
        setCurrentIndex(updatedList.length);
      } else {
        console.error("Error updating data:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Add effect to handle escape key for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <div className={customStyles.container}>
        <h2 className={customStyles.title}>{title}</h2>
        <div className={customStyles.sliderContainer}>
          <div className={customStyles.sliderContent}>
            <div
              className={customStyles.sliderWrapper}
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
                transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <div
                className={customStyles.slide}
                style={{
                  transform: `scale(${currentIndex === 0 ? 1 : 0.9})`,
                  opacity: currentIndex === 0 ? 1 : 0.7,
                }}
              >
                <div
                  className={customStyles.addSlideDiv}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  <Plus className={customStyles.addSlideIcon} />
                </div>
              </div>
              {list?.map((item, index) => (
                <div
                  key={index}
                  className={customStyles.slide}
                  style={{
                    transform: `scale(${index + 1 === currentIndex ? 1 : 0.9})`,
                    opacity: index + 1 === currentIndex ? 1 : 0.7,
                  }}
                  onClick={() => focusSlide(index + 1)}
                >
                  <div className={customStyles.slideContent}>
                    <button
                      onClick={(e) => removeSlide(index, e)}
                      className={customStyles.removeButton}
                    >
                      <Minus
                        size={16}
                        className="stroke-white duration-150 group-hover:stroke-black"
                      />
                    </button>
                    <p className={customStyles.slideText}>{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className={`${customStyles.navButton} left-0 -translate-x-full`}
            disabled={isTransitioning}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className={`${customStyles.navButton} right-0 translate-x-full`}
            disabled={isTransitioning}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className={customStyles.navigationButtons}>
          <Button
            className={customStyles.endBeginButton}
            onClick={goToBeginning}
            type="button"
            disabled={currentIndex === 0 || isTransitioning}
          >
            <ChevronsLeft className="mr-2" size={20} />
            Go to Beginning
          </Button>
          <Button
            className={customStyles.endBeginButton}
            onClick={goToEnd}
            type="button"
            disabled={currentIndex === list?.length || isTransitioning}
          >
            Go to End
            <ChevronsRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className={customStyles.modalOverlay} onClick={handleModalClose}>
          <div
            className={customStyles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={customStyles.modalHeader}>
              <h3 className={customStyles.modalTitle}>Add New Item</h3>
            </div>

            <div className={customStyles.modalBody}>
              <input
                type="text"
                className={customStyles.input}
                placeholder="Enter Previous Work"
                value={newItemText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewItemText(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (
                    e.key === "Enter" &&
                    !isSubmitting &&
                    newItemText.trim()
                  ) {
                    handleModalSubmit();
                  }
                }}
                autoFocus
              />
            </div>

            <div className={customStyles.modalFooter}>
              <Button
                className={`${customStyles.button} ${customStyles.secondaryButton}`}
                onClick={handleModalClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className={`${customStyles.button} ${customStyles.primaryButton}`}
                onClick={handleModalSubmit}
                disabled={isSubmitting || !newItemText.trim()}
              >
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
