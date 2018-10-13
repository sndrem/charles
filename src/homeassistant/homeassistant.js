import enturService, { formatTrip } from '../services/enturService';
import places from '../constants/places';

const slack = (bot) => {
  bot.hear(/hjem/i, async (res) => {
    const { from, to } = places.til_hjem_fra_nationaltheateret;
    const tripPatterns = await enturService.getTripPatterns(from, to);
    const trip = formatTrip(tripPatterns);
    res.send(trip);
  });
};

module.exports = slack;
