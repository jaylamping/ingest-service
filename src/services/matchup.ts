import axios from 'axios';
import { getUpcomingNFLMatchups } from '../api/matchup';

const populateNFLMatchups = async () => {
  let newCount = 0;
  const matchups = await getUpcomingNFLMatchups();

  matchups.map(async (matchup: any) => {
    try {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: `
            mutation {
                createMatchup(
                    input: {
                      awayTeam: "${matchup.awayTeam}"
                      awayTeamId: "${matchup.awayTeamId}"
                      dateTime: "${matchup.dateTime}"
                      externalId: "${matchup.externalId}"
                      homeTeam: "${matchup.homeTeam}"
                      homeTeamId: "${matchup.homeTeamId}"
                      league: "${matchup.league}"
                      name: "${matchup.name}"
                      sport: "${matchup.sport}"
                    }
                  ) {
                    name
                  }
            }
          `
      });
      newCount++;
    } catch (error) {
      console.error('Error sending data to Apollo server:', error);
    }
  });
  console.log(`populateNFLMatchups successfully ran - added ${newCount} new matchups`);
};

export default populateNFLMatchups;
