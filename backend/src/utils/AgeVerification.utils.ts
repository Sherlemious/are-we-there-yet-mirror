import { parseISO, differenceInYears } from 'date-fns';
import userRepo from '../database/repositories/user.repo';
import { UserType } from '../types/User.types';

async function checkLegalAge(dob: string): Promise<boolean> {
  try {
    const birthDate = parseISO(dob);
    const age = differenceInYears(new Date(), birthDate);
    return age >= 18;
  } catch (error) {
    console.error('Error parsing date of birth:', error);
    return false;
  }
}

export async function checkUserLegalAge(userId: string): Promise<boolean> {
  const user: UserType | null = await userRepo.findUserById(userId);

  if (user) {
    const dob = user.dob;
    if (!(dob && (await checkLegalAge(dob)))) {
      return false;
    }
    return true;
  }
  return false;
}
