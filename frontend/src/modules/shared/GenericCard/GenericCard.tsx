// import React, { useMemo } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { Card, CardContent } from "./card";
// import { Badge } from "./badge";
// import { TagType } from "../types/Tag.types";

// type CommonProperties = {
//   name: string;
//   category?: string;
//   tags?: TagType[];
// };

// type CardProps<T extends CommonProperties> = {
//   item: T;
//   images?: string[];
//   className?: string;
//   children: React.ReactNode;
//   onClick?: (e: React.MouseEvent<HTMLDivElement>, item: T) => void;
// };

// const GenericCard = <T extends CommonProperties>({
//   item,
//   images,
//   className = "",
//   children,
//   onClick,
// }: CardProps<T>) => {
//   const defaultSliderSettings = {
//     dots: true,
//     arrows: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   const renderTags = useMemo(() => {
//     if (!item?.tags || item.tags.length === 0) return null;
//     return (
//       <div className="mt-2 flex flex-wrap justify-center gap-2">
//         {item.tags.slice(0, 3).map((tag, index) => (
//           <Badge key={index} variant="secondary" className="text-xs">
//             {tag?.name ?? ""}
//           </Badge>
//         ))}
//       </div>
//     );
//   }, [item.tags]);

//   return (
//     <Card
//       // onClick={(e) => onClick?.(e, item)}
//       className={`w-80 overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-green ${className}`}
//     >
//       <div className="relative h-48 overflow-hidden">
//         {images && images.length > 0 ? (
//           <Slider {...defaultSliderSettings} className="h-full w-full">
//             {images.map((imageUrl, index) => (
//               <div key={index} className="h-full">
//                 <img
//                   src={imageUrl}
//                   alt={`${item.name || "Item"} Image ${index + 1}`}
//                   className="mt-0 h-48 w-full object-cover"
//                   style={{ marginTop: 0 }}
//                 />
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-primary-blue" />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-secondary-light_grey via-transparent"></div>
//       </div>

//       <CardContent className="space-y-4 bg-secondary-light_grey p-6 text-center">
//         <h3 className="text-headline font-headline text-accent-dark-blue">
//           {item.name || "Untitled"}
//         </h3>
//         <p className="text-sub-headings font-sub_headings text-primary-blue">
//           {item.category ?? "Product"}
//         </p>
//         <p className="text-body text-text-primary">{children}</p>
//         {renderTags}
//       </CardContent>
//     </Card>
//   );
// };

// export default GenericCard;
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TagType {
  id?: string | number;
  name: string;
}

type CommonProperties = {
  name: string;
  category?: string;
  tags?: TagType[];
};

type CardProps<T extends CommonProperties> = {
  item: T;
  images?: string[];
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, item: T) => void;
};

const GenericCard = <T extends CommonProperties>({
  item,
  images,
  className = "",
  children,
  onClick,
}: CardProps<T>) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  }, [images]);

  const previousImage = useCallback(() => {
    if (images && images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length,
      );
    }
  }, [images]);

  const renderTags = useMemo(() => {
    if (!item?.tags || item.tags.length === 0) return null;
    return (
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {item.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag?.name ?? ""}
          </Badge>
        ))}
      </div>
    );
  }, [item.tags]);

  const renderImageSlider = () => {
    if (!images || images.length === 0) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green to-primary-blue" />
      );
    }

    return (
      <div className="group relative h-full w-full">
        <img
          src={images[currentImageIndex]}
          alt={`${item.name || "Item"} Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-black/50 group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white opacity-0 transition-opacity duration-200 hover:bg-black/50 group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "w-4 bg-primary-green"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Card
      onClick={(e) => onClick?.(e, item)}
      className={`bg-ac w-80 overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-green ${className}`}
    >
      <div className="relative h-48 overflow-hidden">
        {renderImageSlider()}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-light_grey via-transparent"></div>
      </div>

      <CardContent className="space-y-4 bg-secondary-light_grey p-6 text-center">
        <h3 className="text-headline font-headline text-accent-dark-blue">
          {item.name || "Untitled"}
        </h3>
        <p className="text-sub-headings font-sub_headings text-primary-blue">
          {item.category ?? "Product"}
        </p>
        <p className="text-body text-text-primary">{children}</p>
        {renderTags}
      </CardContent>
    </Card>
  );
};

export default GenericCard;
