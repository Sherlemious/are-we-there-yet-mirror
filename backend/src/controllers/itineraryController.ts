import { Router } from 'express';
import { getItinerary, deleteItinerary, createItinerary } from '../database/repositories/itineraryRepo';
import { logger } from '../middlewares/logger';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes';

const itineraryController = Router();

itineraryController.get('/:id', async (req, res) => {
  try {
    const itinerary = await getItinerary(req.params.id);
    const response = {
      message: 'Itinerary fetched successfully',
      data: { itinerary: itinerary },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error fetching itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
});

itineraryController.post('/', async (req, res) => {
  const itinerary = req.body;

  try {
    const newItinerary = await createItinerary(itinerary);
    const response = {
      message: 'Itinerary created successfully',
      data: { itineraryId: newItinerary._id },
    };

    res.status(ResponseStatusCodes.CREATED).json(response);
  } catch (error: any) {
    logger.error(`Error creating itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
});

itineraryController.put('/:id', (req, res) => {
  res.json({ message: 'Update Itinerary' });
});

itineraryController.delete('/:id', async (req, res) => {
  try {
    const deleteRes = await deleteItinerary(req.params.id);
    const response = {
      message: 'Itinerary deleted successfully',
      data: { itinerary: deleteRes },
    };

    res.status(ResponseStatusCodes.OK).json(response);
  } catch (error: any) {
    logger.error(`Error deleting itinerary: ${error.message}`);
    res.status(ResponseStatusCodes.BAD_REQUEST).json({ message: error.message, data: [] });
  }
});

export { itineraryController };
