// import react, { useState } from 'react';
import { useForm } from 'react-hook-form';
import place from '../types/place';

const PlaceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<place>();
  const onSubmit = (data: place) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Museum name is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location', { required: 'Location is required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
        <input
          type="text"
          {...register('openingHours', { required: 'Opening hours are required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.openingHours && <p className="text-red-500">{errors.openingHours.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ticket Prices</label>
        <input
          type="text"
          {...register('ticketPrices', { required: 'Ticket prices are required' })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.ticketPrices && <p className="text-red-500">{errors.ticketPrices.message}</p>}
      </div>

      {/* You can add the file input for pictures here */}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        add Museum
      </button>
    </form>
  );
};

export default PlaceForm;
