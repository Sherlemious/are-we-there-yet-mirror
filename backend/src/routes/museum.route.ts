import { Router } from "express";
import {
    findMuseumById,
    createMuseum,
    updateMuseum,
    deleteMuseum,
    } from '../controllers/museum.controller';

const museumRouter = Router();

museumRouter.get('/:id', findMuseumById);
museumRouter.post('/', createMuseum);
museumRouter.put('/:id', updateMuseum);
museumRouter.delete('/:id', deleteMuseum);

export default museumRouter;