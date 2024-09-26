import { Router } from 'express';

const itineraryController = Router();

itineraryController.get('/:id', (req, res) => {
  res.json({ message: 'Get Itinerary' });
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
