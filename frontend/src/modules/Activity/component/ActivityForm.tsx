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

function ActivityForm({ method, activity }: { method: FormMethod; activity?: Activity }) {
  const data = useActionData() as { message?: string };
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { categories, tags } = useLoaderData() as { categories: Category[]; tags: Tag[] };

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method}>
      {data && data.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="datetime">Date</label>
        <input type="datetime-local" id="datetime" name="datetime" defaultValue={activity?.datetime} required />
      </p>
      <p>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" defaultValue={activity?.price} required />
      </p>
      <p>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" defaultValue={activity?.category.name} required />
      </p>
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
        <label htmlFor="tags">Tags</label>
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
      <div>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default ActivityForm;

export async function action({ request, params }: { request: Request; params: { activityId?: string } }) {
  const method = request.method;
  const data = await request.formData();

  const activityData = {};

  let url = `${import.meta.env.VITE_BACK_BASE_URL}`;

  if (method === 'put') {
    const activityId = params.activityId;
    url = `${import.meta.env.VITE_BACK_BASE_URL}/${activityId}`;
  }

  const response = await axios({
    method: method,
    url: url,
    data: activityData,
  });

  if (response.status === 400) {
    return response;
  }

  return redirect('/activities');
}

export async function loader() {
  const [categories, tags] = await Promise.all([
    axios.get(`${import.meta.env.VITE_BACK_BASE_URL}/categories`),
    axios.get(`${import.meta.env.VITE_BACK_BASE_URL}/tags`),
  ]);

  return { categories: categories.data.data.categories, tags: tags.data.data.tags };
}
