import axios from 'axios';
import { MuseumFormData } from '../components/MuseumForm';
import { Museum } from '../types/museum';

const API_URL = 'https://api.example.com/museums';

export const createMuseum = async (museumData: MuseumFormData): Promise<Museum> => {
    const response = await axios.post(API_URL, museumData);
    return response.data;
  };
  
  export const deleteMuseum = async (museumId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${museumId}`);
  };
  
  export const updateMuseum = async (museumId: string, museumData: MuseumFormData): Promise<Museum> => {
    const response = await axios.put(`${API_URL}/${museumId}`, museumData);
    return response.data;
  };
  
  export const getMuseums = async (): Promise<Museum[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  };