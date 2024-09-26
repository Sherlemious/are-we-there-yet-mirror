import { Router } from 'express';
import { getItinerary } from '../database/repositories/itineraryRepo';
import { logger } from '../middlewares/logger';

const itineraryController = Router();

itineraryController.get('/:id', async (req, res) => {
  try {
    const itineraries = await getItinerary(req.params.id);
    res.json({ message: 'Itinerary fetched successfully', data: itineraries });
  } catch (error: any) {
    logger.error(`Error fetching itinerary: ${error.message}`);
    res.status(400).json({ message: error.message });
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
