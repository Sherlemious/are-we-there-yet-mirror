import { Router } from 'express';
import { getItinerary } from '../database/repositories/itineraryRepo';
import { logger } from '../middlewares/logger';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes';

const itineraryController = Router();

itineraryController.get('/:id', async (req, res) => {
  try {
    const itineraries = await getItinerary(req.params.id);
    res.status(ResponseStatusCodes.OK).json({ message: 'Itinerary fetched successfully', data: itineraries });
  } catch (error: any) {
    logger.error(`Error fetching itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
});

itineraryController.post('/', (req, res) => {
  res.json({ message: 'Create Itinerary' });
});

itineraryController.put('/:id', (req, res) => {
  res.json({ message: 'Update Itinerary' });
});

itineraryController.delete('/:id', (req, res) => {
  res.json({ message: 'Delete Itinerary' });
});

export { itineraryController };
