import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../shared/services/axiosInstance";

interface Booking {
  id: string;
  details: string;
  date: string;
  status: string;
}

const Bookings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/${id}`);
        setBookings(response.data);
      } catch (error) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <div>
                <strong>Details:</strong> {booking.details}
              </div>
              <div>
                <strong>Date:</strong> {booking.date}
              </div>
              <div>
                <strong>Status:</strong> {booking.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Bookings;
