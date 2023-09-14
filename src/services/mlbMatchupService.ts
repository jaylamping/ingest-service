import axios from 'axios';
import { getUpcomingMLBMatchups } from '../api/getUpcomingMLBMatchups';

const populateMLBMatchups = async () => {
  let newCount = 0;
  const matchups = await getUpcomingMLBMatchups();

  matchups.map(async (matchup: any) => {
    try {
      await axios
        .post('http://localhost:4000/graphql', {
          query: `
            mutation {
                createMatchup(
                    input: {
                      awayTeam: "${matchup.awayTeam}"
                      awayTeamId: "${matchup.awayTeamId}"
                      homeTeam: "${matchup.homeTeam}"
                      homeTeamId: "${matchup.homeTeamId}"
                      dateTime: "${matchup.dateTime}"
                      externalId: "${matchup.externalId}"
                      league: "${matchup.league}"
                      name: "${matchup.name}"
                      sport: "${matchup.sport}"
                      logo_url: "${matchup.logo_url}"
                    }
                  ) {
                    name
                  }
            }
          `
        })
        .then(() => newCount++);
    } catch (error) {
      console.error('Error sending data to Apollo server:', error);
    }
  });
  console.log(`populateMLBMatchups successfully ran - added ${newCount} new matchups`);
};

export default populateMLBMatchups;
