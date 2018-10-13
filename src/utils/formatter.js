import moment from 'moment';

export const formatTime = time => moment(time).format('H:mm');
const formaterStasjonerUnderveis = (trip) => {
  const response = trip.legs
    .map((leg) => {
      if (leg.mode.includes('metro')) {
        return leg.intermediateEstimatedCalls
          .map((call) => {
            const { quay } = call;
            return `${quay.name} (${formatTime(
              call.expectedArrivalTime,
            )})`;
          })
          .join(' - ');
      }
      return null;
    })
    .filter(elem => elem !== null);
  return response;
};

export const formatTrip = (trip) => {
  const startTime = formatTime(trip.startTime);
  const endTime = formatTime(trip.endTime);
  const duration = Math.round(trip.duration / 60, 2);
  const from = trip.legs[0].fromPlace.name;
  const to = trip.legs[trip.legs.length - 1].toPlace.name;
  const stasjonerUnderveis = formaterStasjonerUnderveis(trip);
  return `Du må gå kl. ${startTime} for å rekke T-banen fra ${from}. Det tar ca. ${duration} minutter og du er fremme ved ${to} kl. ${endTime}\nStasjoner underveis: ${stasjonerUnderveis}`;
};

export default formaterStasjonerUnderveis;
