import axios from 'axios';
import { Activity } from './ItineraryList';
import { Tag } from './ItineraryList';

const API_URL = 'https://are-we-there-yet-mirror.onrender.com/api';

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axios.get<{ data: Activity[] }>(`${API_URL}/activities`);
    return response.data.data;
  } catch (error) {
    console.log('Error not working');
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error fetching activities');
    } else {
      throw new Error('Error fetching activities');
    }
  }
};

export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await axios.get<{ data: { tags: Tag[] } }>(`${API_URL}/tags`);
    return response.data.data.tags;
  } catch (error) {
    console.log('Error not working');
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error fetching tags');
    } else {
      throw new Error('Error fetching tags');
    }
  }
};
