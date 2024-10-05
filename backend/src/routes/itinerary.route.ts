import { Router } from 'express';
import {
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  filterItineraries,
} from '../controllers/itinerary.controller';
import { it } from 'node:test';

const itineraryRouter = Router();

itineraryRouter.get('/:id', findItineraryById);
itineraryRouter.post('/', createItinerary);
itineraryRouter.put('/:id', updateItinerary);
itineraryRouter.delete('/:id', deleteItinerary);
itineraryRouter.get('/', filterItineraries);

export default itineraryRouter;
