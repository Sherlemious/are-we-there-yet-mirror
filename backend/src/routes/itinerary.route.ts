import { Router } from 'express';
import {
  getItineraries,
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} from '../controllers/itinerary.controller';

const itineraryRouter = Router();

itineraryRouter.get('/', getItineraries);
itineraryRouter.get('/:id', findItineraryById);
itineraryRouter.post('/', createItinerary);
itineraryRouter.put('/:id', updateItinerary);
itineraryRouter.delete('/:id', deleteItinerary);

export default itineraryRouter;
