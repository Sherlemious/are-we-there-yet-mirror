import React, { useContext } from "react";
import Table, { ActionProps, TableColumn } from "../../shared/components/Table";
import { UserContext } from "@/modules/shared/store/user-context";

interface Product{
    _id: string;
  name: string;
  description: string;
  price: number;
  available_quantity?: number;
  sales?: number;
  average_rating?: number;
  tags: { name: string }[];
  reviews: {user: string, rating: number, comment: string}[];
}

interface ProductTableProps {
    products: Product[];
    onEditRating: (object: { _id: string; type: string }) => void;
  }

const ProductTable: React.FC<ProductTableProps> = ({ products, onEditRating }) => {
  const { user } = useContext(UserContext);  
  const renderStars = (rating: number) => {
    const filledStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return (
      <span className="text-yellow-500 text-2xl">
        {filledStars}
        {emptyStars}
      </span>
    );
  };
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };
  const columns: TableColumn[] = [
      { header: "Name", accessor: "name" },
      { header: "Description", accessor: "description" },
      { header: "Price", accessor: "price"},
      { header: "Available Quantity", accessor: "available_quantity", render: (quantity) => (quantity !== undefined ? quantity : "0"), },
      { header: "Sales", accessor: "sales", render: (sales) => (sales !== undefined ? sales : "0"), },
      {
          header: "Tags",
          accessor: "tags",
          render: (tags: { name: string }[]) =>
              tags.map((tag, index) => (
                  <span key={index} className="bg-gray-400 text-black rounded-full px-3 py-1 text-sm">
                      {tag.name}
                  </span>
              ),
              ),
      },
      {
          header: "Ratings",
          accessor: "average_rating",
          render: (rating) => (rating !== undefined ? rating.toFixed(1) +"/5" : "N/A"),
        },
        {
          header: "Your Reviews",
          accessor: "reviews",
          render: (reviews: { user: string; rating: number; comment: string }[]) =>
            reviews
              .filter((review) => review.user === user._id) // Filter reviews by user ID
              .map((review, index) => (
                <div key={index} className="mb-2">
                  <div>{renderStars(review.rating)} <span className="text-gray-500">({truncateText(review.comment, 20)})</span></div>
                </div>
              )),
        },
    ];
    const actions: ActionProps = {
      onEdit: (id: string) => {
        const product = products.find((c) => c._id === id);
        if (product) {
          onEditRating({ _id: id, type: "products" });
        }
      },
    };
  
  
    return <Table data={products} columns={columns} actions={actions} />;
  };

  export default ProductTable