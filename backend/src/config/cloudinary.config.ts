import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;
