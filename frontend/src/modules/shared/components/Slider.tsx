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

const customStyles = {
  container:
    "h-auto max-w-fit border-2 border-gray-300 pr-14 pt-14 pl-20 pb-14",
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
};

const Slider = ({
  title,
  onAddSlide,
}: {
  title: string;
  onAddSlide: () => void;
}) => {
  const [works, setWorks] = useState([
    {
      title: "Lorem Ipsum 1",
      content:
        "Si osculantur puer tuus aut uxorem tuam, osculum, non dico quod omnia quae sunt hominis, et sic non tangetur, si aut ex eis moriatur.et sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriaturet sic non tangetur, si aut ex eis moriatur",
    },
    {
      title: "Lorem Ipsum 2",
      content:
        "Quando ambulabat agendis admonere te ipsum de vita tua, et de operibus tuis, ut non pecces in lingua tua, et non offendas in labiis tuis.",
    },
    {
      title: "Lorem Ipsum 3",
      content:
        "Noli esse incredibilis timori Domini, et ne accesseris ad illum duplici corde. Ne fueris hypocrita in conspectu hominum, et non scandalizeris in labiis tuis.",
    },
    {
      title: "Lorem Ipsum 4",
      content:
        "Attende tibi, et doctrine: insta in illis. Hoc enim faciens, et teipsum salvum facies, et eos qui te audiunt.",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (works.length + 1));
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + works.length + 1) % (works.length + 1),
      );
    }
  };

  const removeSlide = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setWorks((prevWorks) => prevWorks.filter((_, i) => i !== index));
    if (currentIndex > index + 1) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (currentIndex === index + 1 && index === works.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const goToBeginning = () => {
    if (!isTransitioning && currentIndex !== 0) {
      setIsTransitioning(true);
      setCurrentIndex(0);
    }
  };

  const goToEnd = () => {
    if (!isTransitioning && currentIndex !== works.length) {
      setIsTransitioning(true);
      setCurrentIndex(works.length);
    }
  };

  const focusSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
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
              <div className={customStyles.addSlideDiv} onClick={onAddSlide}>
                <Plus className={customStyles.addSlideIcon} />
              </div>
            </div>
            {works.map((work, index) => (
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
                  <h3 className={customStyles.slideTitle}>{work.title}</h3>
                  <p className={customStyles.slideText}>{work.content}</p>
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
          disabled={currentIndex === works.length || isTransitioning}
        >
          Go to End
          <ChevronsRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Slider;
