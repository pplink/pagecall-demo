export const formatDate = (date: Date): string => {
  const tokens = date.toISOString().split('T');
  const dates = tokens[0].split('-');
  const times = tokens[1].split(':');
  return `${dates[0]}-${dates[1]}-${dates[2]} ${times[0]}:${times[1]}`;
};
