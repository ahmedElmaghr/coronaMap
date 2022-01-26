export const formatEpochDateToDate = (epoch: number) => {
  var d = new Date(epoch);
  return d.toUTCString();
};
