import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const works = [
  {
    title: 'Lorem Ipsum 1',
    content:
      'Si osculantur puer tuus aut uxorem tuam, osculum, non dico quod omnia quae sunt hominis, et sic non tangetur, si aut ex eis moriatur.',
  },
  {
    title: 'Lorem Ipsum 2',
    content:
      'Quando ambulabat agendis admonere te ipsum de vita tua, et de operibus tuis, ut non pecces in lingua tua, et non offendas in labiis tuis.',
  },
  {
    title: 'Lorem Ipsum 3',
    content:
      'Noli esse incredibilis timori Domini, et ne accesseris ad illum duplici corde. Ne fueris hypocrita in conspectu hominum, et non scandalizeris in labiis tuis.',
  },
  {
    title: 'Lorem Ipsum 4',
    content:
      'Attende tibi, et doctrine: insta in illis. Hoc enim faciens, et teipsum salvum facies, et eos qui te audiunt.',
  },
  {
    title: 'Lorem Ipsum 5',
    content:
      'Omnis sapientia a Domino Deo est, et cum illo fuit semper, et est ante aevum. Arenam maris, et pluviae guttas, et dies saeculi quis dinumeravit?',
  },
  {
    title: 'Lorem Ipsum 6',
    content:
      'Qui navigant mare, enarrant pericula ejus; et audientes auribus nostris admiramur. Illic praeclara opera et mirabilia, varia bestiarum genera, et omnium pecorum, et creatura belluarum. abilia, varia bestiarum genera, et omnium pecorum, et creatura belluarum. abilia, varia bestiarum genera, et omnium pecorum, et creatura belluarum. abilia, varia bestiarum genera, et omnium pecorum, et creatura belluarum. abilia, varia bestiarum genera, et omnium pecorum, et creatura belluarum. abilia, varia bestiarum genera, et omnium pecorum, et creatura belluarum. abilia, varia bestiarum genera, et . ',
  },
];

const Slider = ({ title }: { title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="max-w-fit h-auto p-14 border-2 border-gray-300">
      <h2 className="text-2xl font-bold mb-16 border-b-2 border-gray-400 w-fit pb-2">{title}</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-all duration-600 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            {[...works, ...works, ...works].map((work, index) => (
              <div
                key={index}
                className="w-[25%] flex-shrink-0 px-2 transition-all duration-600"
                style={{
                  transform: `scale(${index % works.length === currentIndex % works.length ? 1 : 0.9})`,
                  opacity: index % works.length === currentIndex % works.length ? 1 : 0.7,
                }}
              >
                <div className="border-gray-300 border-2 w-80 p-8 h-full bg-white overflow-auto">
                  <h3 className="font-bold mb-2">{work.title}</h3>
                  <p className="text-sm">{work.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-black"
          disabled={isTransitioning}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-black"
          disabled={isTransitioning}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
