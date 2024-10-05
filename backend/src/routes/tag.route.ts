import { Router } from 'express';
import { getAllTags, findTagById, createTag, updateTag, deleteTag } from '../controllers/tag.controller';

const tagRouter = Router();

tagRouter.get('/', getAllTags);
tagRouter.get('/:id', findTagById);
tagRouter.post('/', createTag);
tagRouter.put('/:id', updateTag);
tagRouter.delete('/:id', deleteTag);

export default tagRouter;
