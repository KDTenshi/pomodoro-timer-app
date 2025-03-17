export const getTimestring = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const minutesString = minutes / 10 < 1 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds / 10 < 1 ? `0${seconds}` : `${seconds}`;

  return `${minutesString}:${secondsString}`;
};
