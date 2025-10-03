import { env } from './config/env';
import { connectMongo } from './config/db';
import { createApp } from './app';

async function start() {
  try {
    await connectMongo(env.MONGO_URI);
    const app = createApp();
    app.listen(env.PORT, () => {
      console.log(`🚀 Doin Tech Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Fatal startup error:', (err as any)?.message || err);
    process.exit(1);
  }
}

start();
