const formatter = new Intl.RelativeTimeFormat('en');

// Function to format relative time
const formatRelativeTime = (
  value: number,
  unit: Intl.RelativeTimeFormatUnit
) => {
  return formatter.format(value, unit);
};

// Function to calculate the difference between two dates
export const diffDate = (date1: Date, date2: Date) => {
  const msDiff = Math.abs(date2.getTime() - date1.getTime());

  if (msDiff < 1000) return 'less than a second ago';
  const secDiff = msDiff / 1000;
  if (secDiff < 60) {
    return formatRelativeTime(-Math.ceil(secDiff), 'seconds');
  }
  const minDiff = secDiff / 60;
  if (minDiff < 60) {
    return formatRelativeTime(-Math.ceil(minDiff), 'minutes');
  }
  const hourDiff = minDiff / 60;
  if (hourDiff < 24) {
    return formatRelativeTime(-Math.ceil(hourDiff), 'hours');
  }
  const dayDiff = hourDiff / 24;
  return formatRelativeTime(-Math.ceil(dayDiff), 'days');
};

// Function to format a date
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
