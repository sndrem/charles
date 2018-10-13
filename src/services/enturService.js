import '@babel/polyfill';
import EnturService, { convertFeatureToLocation } from '@entur/sdk';

const service = new EnturService({ clientName: 'sindrem-slackbot' });

const api = {};

async function getTripPatterns(from, to) {
  const [fromFeature] = await service.getFeatures(from);
  const [toFeature] = await service.getFeatures(to, {
    latitude: 59.914735,
    longitude: 10.730304,
  });

  if (!fromFeature) {
    throw new Error(`Fant ingen egenskaper for fra-destinasjon: ${from}`);
  }
  if (!toFeature) {
    throw new Error(`Fant ingen egenskaper for til-destinasjon: ${to}`);
  }

  const [tripPatterns] = await service.getTripPatterns({
    searchDate: new Date(),
    from: convertFeatureToLocation(fromFeature),
    to: convertFeatureToLocation(toFeature),
  });
  return tripPatterns;
}

// const { to, from } = places.til_hjem_fra_nationaltheateret;
// getTripPatterns(from, to).then(data => console.log(formatTrip(data)));

api.getTripPatterns = getTripPatterns;

export default api;
