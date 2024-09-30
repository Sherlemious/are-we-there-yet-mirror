import { Router } from 'express';
import {
    findTagById,
    createTag,
    updateTag,
    deleteTag,
    } from '../controllers/tag.controller';

const tagRouter = Router();

tagRouter.get('/:id', findTagById);
tagRouter.post('/', createTag);
tagRouter.put('/:id', updateTag);
tagRouter.delete('/:id', deleteTag);

export default tagRouter;