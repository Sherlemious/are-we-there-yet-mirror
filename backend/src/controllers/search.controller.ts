import { Request, Response } from 'express';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

const searchFunctions = {
  product: searchProduct,
  historicalPlace: searchHistoricalPlace,
  activity: searchActivity,
  itinerary: searchItinerary,
};

async function search(req: Request, res: Response) {
  const { type, attribute } = req.query;

  if (!type || !attribute) {
    return res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Type and attribute are required' });
  }

  const searchFunction = searchFunctions[type as keyof typeof searchFunctions];

  if (!searchFunction) {
    return res.status(ResponseStatusCodes.BAD_REQUEST).send({ error: 'Invalid search type' });
  }

  try {
    const query = await searchFunction(attribute as string);
    res.send({ data: query });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred during the search' });
  }
}

async function searchProduct(attribute: string) {
  return { product: {} };
}

async function searchHistoricalPlace(attribute: string) {
  return { historicalPlace: {} };
}

async function searchActivity(attribute: string) {
  return { activity: {} };
}

async function searchItinerary(attribute: string) {
  return { itinerary: {} };
}

export { search };
