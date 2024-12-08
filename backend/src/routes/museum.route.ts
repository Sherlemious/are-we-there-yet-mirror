import { Router } from 'express';
import {
  getAllMuseums,
  findMuseumById,
  findMuseumsByTags,
  createMuseum,
  updateMuseum,
  deleteMuseum,
  getMuseumsCreatedByUser,
} from '../controllers/museum.controller';

const museumRouter = Router();

museumRouter.get('/getall', getAllMuseums);
museumRouter.get('/mine', getMuseumsCreatedByUser);
museumRouter.get('/:id', findMuseumById);
museumRouter.get('/', findMuseumsByTags);
museumRouter.post('/', createMuseum);
museumRouter.put('/:id', updateMuseum);
museumRouter.delete('/:id', deleteMuseum);

export default museumRouter;
