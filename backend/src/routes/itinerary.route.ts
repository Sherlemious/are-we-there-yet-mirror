import { Router } from 'express';
import {
  getItineraries,
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  filterItineraries,
  getItinerariesCreatedByUser,
} from '../controllers/itinerary.controller';

const itineraryRouter = Router();

itineraryRouter.get('/get', getItineraries);
itineraryRouter.get('/:id', findItineraryById);
itineraryRouter.get('/created_by/:id', getItinerariesCreatedByUser);
itineraryRouter.post('/', createItinerary);
itineraryRouter.put('/:id', updateItinerary);
itineraryRouter.delete('/:id', deleteItinerary);
itineraryRouter.get('/', filterItineraries);

export default itineraryRouter;
