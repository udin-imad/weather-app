const currentCondition = document.querySelector('.current#text-condition');
const currentImg = document.querySelector('.current#icon-condition');
const currentTemp = document.querySelector('.current#temp');
const city = document.querySelector('#city');
// const date = document.querySelector('#date');
const input = document.querySelector('input');
const button = document.querySelector('#button');
const iconSearch = document.querySelector('.search-bar > #bar img');
const infoValue = document.querySelectorAll('.info-value');
const hourlyTime = document.querySelectorAll('.hourly-forecast .time');
const hourlyImg = document.querySelectorAll(
  '.hourly-forecast .card .card-content img'
);
const hourlyText = document.querySelectorAll(
  '.hourly-forecast .card .card-content .text'
);

const fetchData = async (location = 'jakarta') => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=34a152df079141e1871123439240702&q=${location}&days=7&aqi=no&alerts=no`
    );
    if (!response.ok) {
      console.log('Request Timed Out');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

function currentData(location = 'Jakarta') {
  fetchData(location).then(function (obj) {
    // date.textContent = new Date(obj.location.localtime).toDateString();
    city.textContent = `${obj.location.name}, ${obj.location.country}`;
    currentCondition.textContent = obj.current.condition.text;
    currentImg.src = obj.current.condition.icon;
    currentTemp.textContent = `${obj.current.temp_c}\xB0`;
    infoValue[0].textContent = `${obj.current.feelslike_c}\xB0`;
    infoValue[1].textContent = `${obj.current.wind_kph} km/h`;
    infoValue[2].textContent = `${obj.current.pressure_in} inch`;
    infoValue[3].textContent = `${obj.current.uv}`;
    infoValue[4].textContent = `${obj.current.humidity}`;
    infoValue[5].textContent = `${obj.current.cloud}%`;
    infoValue[6].textContent = `${obj.current.gust_kph} km/h`;
    infoValue[7].textContent = `${obj.forecast.forecastday[0].astro.sunrise}`;
    infoValue[8].textContent = `${obj.forecast.forecastday[0].astro.sunset}`;
  });
}

function hourlyData(location = 'Jakarta') {
  fetchData(location).then(function (obj) {
    let hour = obj.forecast.forecastday[0].hour;
    let newHour = hour
      .filter((el) => el.time_epoch > obj.current.last_updated_epoch)
      .slice(0, 4);
    console.log(newHour);
    hourlyTime[0].textContent = convertAMPM(newHour[0].time.slice(11, 13));
    hourlyTime[1].textContent = convertAMPM(newHour[1].time.slice(11, 13));
    hourlyTime[2].textContent = convertAMPM(newHour[2].time.slice(11, 13));
    hourlyTime[3].textContent = convertAMPM(newHour[3].time.slice(11, 13));
    hourlyImg[0].src = newHour[0].condition.icon;
    hourlyImg[1].src = newHour[1].condition.icon;
    hourlyImg[2].src = newHour[2].condition.icon;
    hourlyImg[3].src = newHour[3].condition.icon;
    hourlyText[0].textContent = newHour[0].condition.text;
    hourlyText[1].textContent = newHour[1].condition.text;
    hourlyText[2].textContent = newHour[2].condition.text;
    hourlyText[3].textContent = newHour[3].condition.text;
  });
}

function convertAMPM(hour) {
  if (hour === '00') return '12 AM';
  else if (hour === '12') return '12 PM';
  else if (hour < '12') return `${hour} AM`;
  else return `${hour - 12} PM`;
}

currentData();
hourlyData();

button.addEventListener('click', function () {
  currentData(input.value);
  hourlyData(input.value);
  fetchData(input.value).then(console.log);
  input.value = '';
  input.focus();
});

input.addEventListener('focus', function () {
  iconSearch.classList.add('has-focus');
});

input.addEventListener('blur', function () {
  iconSearch.classList.remove('has-focus');
});
