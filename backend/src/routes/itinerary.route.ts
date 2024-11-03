import { Router } from 'express';
import {
  getItineraries,
  findItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  filterItineraries,
  getItinerariesCreatedByUser,
  toggleItineraryActive,
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
itineraryRouter.patch('/:id/activate', (req, res) => toggleItineraryActive(req, res, true));
itineraryRouter.patch('/:id/deactivate', (req, res) => toggleItineraryActive(req, res, false));
itineraryRouter.put('/flag/:id', flagItinerary);

export default itineraryRouter;
