import express from 'express';
import * as cron from 'node-cron';

import populateNFLMatchups from './services/matchup';

const app = express();

app.listen({ port: 5000 }, () => {
  console.log('Server running at http://localhost:5000');
});

cron.schedule('*/30 * * * * *', async () => {
  await populateNFLMatchups();
});
