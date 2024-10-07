import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
  type FormMethod,
  useLoaderData,
} from 'react-router-dom';

import { Activity, Category, Tag } from '../types/Activity';
import axios from 'axios';
import Map from '../../shared/utils/map';
import { useState } from 'react';

function ActivityForm({ method, activity }: { method: FormMethod; activity?: Activity }) {
  const data = useActionData() as { message?: string };
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { categories, tags } = useLoaderData() as { categories: Category[]; tags: Tag[] };
  const [location, setLocation] = useState(activity?.location || { latitude: 0, longitude: 0, name: '' });

  const isSubmitting = navigation.state === 'submitting';

  function toDateTimeLocal(isoTimestamp?: string) {
    if (!isoTimestamp) return '';

    const date = new Date(isoTimestamp);
    const dateTimeLocal = date.toISOString().slice(0, 16);

    return dateTimeLocal;
  }

  function cancelHandler() {
    navigate('..');
  }

  console.log(activity);
  return (
    <Form method={method} className="w-full h-full bg-gray-100 p-6 rounded-lg shadow-md">
      {data && data.message && <p className="text-gray-700 mb-4">{data.message}</p>}

      <div className="mb-4">
        <label htmlFor="datetime" className="block text-gray-700 font-semibold mb-2">
          Date
        </label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          defaultValue={toDateTimeLocal(activity?.datetime)}
          required
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={activity?.price}
          required
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="w-full h-full">
        <div className="flex gap-2 mb-2">
          <input
            className="w-1/3 px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            id="locationLat"
            name="locationLat"
            value={location.latitude}
            onChange={() => {}}
            required
            placeholder="Latitude"
          />
          <input
            className="w-1/3 px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            id="locationLng"
            name="locationLng"
            value={location.longitude}
            onChange={() => {}}
            required
            placeholder="Longitude"
          />
          <input
            className="w-1/3 px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            id="locationName"
            name="locationName"
            value={location.name}
            onChange={() => {}}
            required
            placeholder="Location Name"
          />
        </div>
        <Map
          onChange={(location) => {
            setLocation({
              latitude: location.lat,
              longitude: location.lng,
              name: location.name,
            });
          }}
          className="w-full h-[90%] bg-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
          Category
        </label>
        <select
          name="category"
          id="category"
          required
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <span className="block text-gray-700 font-semibold mb-2">Tags</span>
        <div className="space-y-2">
          {tags.map((tag) => (
            <label key={tag._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="tags"
                value={tag._id}
                defaultChecked={activity?.tags.map((t) => t._id).includes(tag._id)}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="text-gray-700">{tag.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="specialDiscount" className="block text-gray-700 font-semibold mb-2">
          Special Discount
        </label>
        <input
          type="number"
          id="specialDiscount"
          name="specialDiscount"
          min="0"
          defaultValue={activity?.specialDiscounts}
          required
          className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="isBooked" className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isBooked"
            name="isBooked"
            defaultChecked={activity?.bookingOpen}
            className="form-checkbox h-5 w-5 text-gray-600"
          />
          <span className="text-gray-700 font-semibold">Is Booked</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={cancelHandler}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default ActivityForm;

export async function action({ request, params }: { request: Request; params: { activityId?: string } }) {
  const method = request.method;
  const data = await request.formData();

  const activityData = {
    datetime: data.get('datetime'),
    price: data.get('price'),
    location: {
      latitude: data.get('locationLat'),
      longitude: data.get('locationLng'),
      name: data.get('locationName'),
      address: data.get('locationAddress'),
    },
    category: data.get('category'),
    tags: data.getAll('tags'),
    specialDiscounts: data.get('specialDiscount'),
    bookingOpen: data.get('isBooked') === 'on',
  };

  let url = `${import.meta.env.VITE_BACK_BASE_URL}/activities`;

  console.log('activityData', activityData);
  console.log('method', method);
  console.log('params', params);
  console.log('url', url);

  if (method === 'put') {
    const activityId = params.activityId;
    url = `${import.meta.env.VITE_BACK_BASE_URL}/${activityId}`;
  }

  try {
    console.log(
      await axios({
        method: method,
        url: url,
        data: activityData,
      })
    );

    return redirect('/activity');
  } catch (e) {
    console.error('Error saving activity', e);
    return { message: 'Error submitting' };
  }
}

export async function loader() {
  const [categories, tags] = await Promise.all([
    axios.get(`${import.meta.env.VITE_BACK_BASE_URL}/categories`),
    axios.get(`${import.meta.env.VITE_BACK_BASE_URL}/tags`),
  ]);

  return { categories: categories.data.data.categories, tags: tags.data.data.tags };
}
