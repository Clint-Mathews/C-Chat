const formatTime = (dateRaw) => {
  const dateFormated = new Date(dateRaw);
  let hours = dateFormated.getHours();
  let minutes = dateFormated.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
export default formatTime;
