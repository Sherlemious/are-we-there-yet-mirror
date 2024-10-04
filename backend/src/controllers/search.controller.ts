import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';
import productRepo from '../database/repositories/product.repo';
import MuseumRepo from '../database/repositories/museum.repo';
import ActivityRepo from '../database/repositories/activity.repo';

const searchFunctions = {
  product: searchProduct,
  historicalPlace: searchHistoricalPlace,
  activity: searchActivity,
  itinerary: searchItinerary,
};

async function search(req: Request, res: Response) {
  const { type, attributeName, attributeValue } = req.query;

  if (!type || !attributeName) {
    return res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Type and attribute are required' });
  }

  const searchFunction = searchFunctions[type as keyof typeof searchFunctions];

  if (!searchFunction) {
    return res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Invalid search type' });
  }

  try {
    const query = await searchFunction(attributeName as string, attributeValue as string);
    res.send({ message: 'search is successful', data: query });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred during the search' });
  }
}

async function searchProduct(attributeName: string, attributeValue: string) {
  const products = await productRepo.getProducts(attributeName, attributeValue);
  return { products: products };
}

async function searchHistoricalPlace(attributeName: string, attributeValue: string) {
  const historicalPlaces = await MuseumRepo.getAllMuseums(attributeName, attributeValue);
  return { historicalPlaces: historicalPlaces };
}

async function searchActivity(attributeName: string, attributeValue: string) {
  const activities = await ActivityRepo.getAllActivities(attributeName, attributeValue);
  return { activities: activities };
}

async function searchItinerary(attributeName: string, attributeValue: string) {
  return { itinerary: {} };
}

export { search };
