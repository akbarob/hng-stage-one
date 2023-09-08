function getDay() {
  const d = new Date();
  let day = d.getDay();
  console.log(day);
  let daytext;

  if (day === 1) {
    daytext = "Monday";
  } else if (day === 2) {
    daytext = "Tuesday";
  } else if (day === 3) {
    daytext = "Wednesday";
  } else if (day === 4) {
    daytext = "Thursday";
  } else if (day === 5) {
    daytext = "Friday";
  } else if (day === 6) {
    daytext = "Saturday";
  } else {
    daytext = "Sunday";
  }

  document.getElementById("day").innerHTML = daytext;

  let time = d.getUTCMilliseconds();
  document.getElementById("time").innerHTML = time;
}
