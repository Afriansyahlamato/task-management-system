import mongoose from 'mongoose';

export async function connectMongo(uri: string) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ Connected to MongoDB');
}
