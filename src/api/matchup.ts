import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

/**
 * Returns the next 15 NFL matchups
 * @returns {Array} - Array of matchups
 */
export const getUpcomingNFLMatchups = async () => {
  const url = `${process.env.DATADB_BASE_URL}${process.env.DATADB_API_KEY}/eventsnextleague.php?id=${process.env.DATADB_NFL_ID}`;

  const response = await axios
    .get(url)
    .then(res => res.data.events)
    .catch(err => console.error(err));

  const matchups = response.map((matchup: any) => {
    return {
      name: matchup.strEvent,
      description: matchup.strEventDescription,
      dateTime: matchup.dateEvent + ' ' + matchup.strTimeLocal,
      homeTeamId: matchup.idHomeTeam,
      homeTeam: matchup.strHomeTeam,
      awayTeamId: matchup.idAwayTeam,
      awayTeam: matchup.strAwayTeam,
      logo_url: matchup.strThumb,
      sport: 'Football',
      league: 'NFL',
      externalId: matchup.idEvent
    };
  });

  console.log(matchups);
  return matchups;
};
