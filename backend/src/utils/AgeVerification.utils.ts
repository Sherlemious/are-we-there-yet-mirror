import userRepo from '../database/repositories/user.repo';
import { UserType } from '../types/User.types';

async function checkLegalAge(dob: string): Promise<boolean> {
  try {
    // Ensure dob is a string
    dob = String(dob);

    // Parse the date string to a Date object
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const birthYear = birthDate.getFullYear();
    const curYear = new Date().getFullYear();
    return curYear - birthYear >= 18;
  } catch (error) {
    console.error('Error parsing date of birth:', error);
    return false;
  }
}

export async function checkUserLegalAge(userId: string): Promise<boolean> {
  const user: UserType | null = await userRepo.findUserById(userId);

  if (user) {
    const dob = user.dob;
    if (dob) return await checkLegalAge(dob);
  }
  return false;
}
