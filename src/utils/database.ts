import * as mongoose from 'mongoose';

export async function connectDatabase() {
  return await mongoose.connect(process.env.DATABASE_URL_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
} 