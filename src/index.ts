import express from 'express';
import * as cron from 'node-cron';

import populateNFLMatchups from './services/nflMatchupService';
import populateMLBMatchups from './services/mlbMatchupService';

const app = express();

app.listen({ port: 5000 }, () => {
  console.log('Server running at http://localhost:5000');
});

populateNFLMatchups();
populateMLBMatchups();

cron.schedule('*/10 * * * *', async () => {
  await populateNFLMatchups();
  await populateMLBMatchups();
});
