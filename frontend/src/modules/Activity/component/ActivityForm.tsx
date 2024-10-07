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
    <Form method={method} className="w-full h-full">
      {data && data.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="datetime">Date</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          defaultValue={toDateTimeLocal(activity?.datetime)}
          required
        />
      </p>
      <p>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" defaultValue={activity?.price} required />
      </p>
      <div className="mb-7 w-full h-[70%]">
        <p className="flex">
          <input
            className="w-fit"
            type="text"
            id="locationLat"
            name="locationLat"
            value={location.latitude}
            onChange={() => {}}
            required
          />
          <input
            className="w-fit"
            type="text"
            id="locationLng"
            name="locationLng"
            value={location.longitude}
            onChange={() => {}}
            required
          />
          <input
            className="w-full"
            type="text"
            id="locationName"
            name="locationName"
            value={location.name}
            onChange={() => {}}
            required
          />
        </p>
        <Map
          onChange={(location) => {
            setLocation({
              latitude: location.lat,
              longitude: location.lng,
              name: location.name,
            });
          }}
        />
      </div>
      <p>
        <label htmlFor="category">Category</label>
        <select name="category" id="category" required>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </p>
      <p>
        {/* input tags using checkboxes */}
        <label>
          Tags
          {tags.map((tag) => (
            <label key={tag._id}>
              <input
                type="checkbox"
                name="tags"
                value={tag._id}
                defaultChecked={activity?.tags.map((t) => t._id).includes(tag._id)}
              />
              {tag.name}
            </label>
          ))}
        </label>
      </p>
      <p>
        <label htmlFor="specialDiscount">Special Discount</label>
        <input
          type="number"
          id="specialDiscount"
          name="specialDiscount"
          min="0"
          defaultValue={activity?.specialDiscounts}
          required
        />
      </p>

      <p>
        <label htmlFor="isBooked">Is Booked</label>
        <input type="checkbox" id="isBooked" name="isBooked" defaultChecked={activity?.bookingOpen} />
      </p>
      <div className="flex gap-2">
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
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
