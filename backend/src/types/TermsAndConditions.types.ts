import { Document } from 'mongoose';

export interface TermsAndConditions extends Document {
    title?: string;
    content?: string;
    version?: number;
    isAccepted: boolean;
}