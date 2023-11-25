import mongoose from 'mongoose';

export const dbConnect = () => {
  const mongoUri = process.env.MONGO_URI;

  mongoose.set('strictQuery', true);
  return mongoose.connect(mongoUri, { retryWrites: true, w: 'majority' });
};
