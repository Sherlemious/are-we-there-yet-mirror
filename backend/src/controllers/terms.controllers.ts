import { Request, Response } from 'express';
import { TERMS_AND_CONDITIONS_TEXT } from '../constants/terms.constants';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

export const getTerms = async (req: Request, res: Response) => {
  const response = {
    message: 'Terms and conditions fetched successfully',
    data: {
      terms: TERMS_AND_CONDITIONS_TEXT,
    },
  };
  res.status(ResponseStatusCodes.OK).json(response);
};
