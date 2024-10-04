import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import productRepo from '../database/repositories/product.repo';
import MuseumRepo from '../database/repositories/museum.repo';
import ActivityRepo from '../database/repositories/activity.repo';
import ItineraryRepo from '../database/repositories/itinerary.repo';
import { logger } from '../middlewares/logger.middleware';

const searchFunctions = {
  product: searchProduct,
  historicalPlace: searchHistoricalPlace,
  activity: searchActivity,
  itinerary: searchItinerary,
};

const availableSearchAttributes = {
  product: ['name'],
  historicalPlace: ['name', 'category', 'tags'],
  activity: ['name', 'category', 'tags'],
  itinerary: ['name', 'category', 'tags'],
};

const search = async (req: Request, res: Response) => {
  let { type, attributeName, attributeValue } = req.query;

  if (!type || !attributeName || !attributeValue) {
    res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Type and attribute (name, value) are required' });
    logger.error('Type and attribute (name, value) are required');
    return;
  }

  const searchFunction = searchFunctions[type as keyof typeof searchFunctions];

  if (!searchFunction) {
    logger.error('Invalid search type');
    res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Invalid search type' });
    return;
  }

  const availableAttributes = availableSearchAttributes[type as keyof typeof availableSearchAttributes];

  if (!availableAttributes.includes(attributeName as string)) {
    logger.error('Invalid search attribute');
    res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Invalid search attribute' });
    return;
  }

  try {
    const regex = attributeName === 'tags' ? (attributeValue as string) : new RegExp(attributeValue as string, 'i');
    const query = await searchFunction(attributeName as string, regex);
    res.status(ResponseStatusCodes.OK).send({ message: 'search is successful', data: query });
  } catch (error: any) {
    logger.error(`Error searching ${type}: ${error.message}`);
    res.status(ResponseStatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred during the search' });
  }
};

async function searchProduct(attributeName: string, attributeValue: RegExp | string) {
  const products = await productRepo.getProducts(attributeName, attributeValue);
  return { products: products };
}

async function searchHistoricalPlace(attributeName: string, attributeValue: RegExp | string) {
  const historicalPlaces = await MuseumRepo.getAllMuseums(attributeName, attributeValue);
  return { historicalPlaces: historicalPlaces };
}

async function searchActivity(attributeName: string, attributeValue: RegExp | string) {
  const activities = await ActivityRepo.getAllActivities(attributeName, attributeValue);
  return { activities: activities };
}

async function searchItinerary(attributeName: string, attributeValue: RegExp | string) {
  const itineraries = await ItineraryRepo.getItineraries(attributeName, attributeValue);
  return { itineraries: itineraries };
}

export { search };
