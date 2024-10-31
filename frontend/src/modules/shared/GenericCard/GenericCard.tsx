import React from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
// import { Clock, DollarSign } from "lucide-react";
import { TagType } from "../types/Tag.types";

// Define the minimum required properties for the card
type CommonProperties = {
  name: string;
  category?: string;
  tags: TagType[];
};

type CardProps<T extends CommonProperties> = {
  item: T;
  className?: string;
  imageUrl?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, item: T) => void;
};

const GenericCard = <T extends CommonProperties>({
  item,
  className = "",
  imageUrl,
  children,
  onClick,
}: CardProps<T>) => {
  // Safe check for tags
  const renderTags = () => {
    const tags = item?.tags;
    if (!tags || !Array.isArray(tags) || tags.length === 0) return null;

    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag?.name.toString() || ""}
          </Badge>
        ))}
      </div>
    );
  };

  // // Safe check for additional content
  // const getCardContent = () => {
  //   if (!item) return null;

  //   return (
  //     <>
  //       {"description" in item && item.description && (
  //         <div className="mt-2 text-sm text-gray-600">
  //           <p>{(item as any).description}</p>
  //         </div>
  //       )}

  //       {"price" in item && typeof item.price !== "undefined" && (
  //         <div className="mt-2 flex items-center text-sm text-gray-600">
  //           <DollarSign className="mr-1 h-4 w-4" />
  //           <span>{(item as any).price}</span>
  //         </div>
  //       )}

  //       {"opening_hours" in item && item.opening_hours && (
  //         <div className="mt-2 flex items-center text-sm text-gray-600">
  //           <Clock className="mr-1 h-4 w-4" />
  //           <span>{(item as any).opening_hours}</span>
  //         </div>
  //       )}

  //       {"available_quantity" in item && item.available_quantity && (
  //         <div className="mt-2 flex items-center text-sm text-gray-600">
  //           <span>available quantity: {(item as any).available_quantity}</span>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  return (
    <Card
      onClick={(e) => onClick?.(e, item)}
      className={`overflow-hidden transition-shadow duration-300 hover:shadow-lg ${className}`}
    >
      <div className="relative h-48 overflow-hidden bg-blue-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name || "Item image"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500" />
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {item.category && (
            <p className="text-sm font-medium text-blue-600">{item.category}</p>
          )}
          <h3 className="text-xl font-semibold text-gray-900">
            {item.name || "Untitled"}
          </h3>
          {children}
          {renderTags()}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenericCard;
