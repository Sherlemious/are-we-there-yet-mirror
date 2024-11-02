import { Router } from 'express';
import {
  getItineraries,
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  filterItineraries,
  getItinerariesCreatedByUser,
  flagItinerary,
} from '../controllers/itinerary.controller';

const itineraryRouter = Router();

itineraryRouter.get('/get', getItineraries);
itineraryRouter.get('/mine', getItinerariesCreatedByUser);
itineraryRouter.get('/:id', findItineraryById);
itineraryRouter.post('/', createItinerary);
itineraryRouter.put('/:id', updateItinerary);
itineraryRouter.delete('/:id', deleteItinerary);
itineraryRouter.get('/', filterItineraries);
itineraryRouter.put('/flag/:id', flagItinerary);

export default itineraryRouter;
