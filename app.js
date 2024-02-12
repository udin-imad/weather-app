const currentCondition = document.querySelector('.current#text-condition');
const currentImg = document.querySelector('.current#icon-condition');
const currentTemp = document.querySelector('.current#temp');
const city = document.querySelector('#city');
// const date = document.querySelector('#date');
const input = document.querySelector('input');
const button = document.querySelector('#button');
const iconSearch = document.querySelector('.search-bar > #bar img');
const infoValue = document.querySelectorAll('.info-value');

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
  const data = [];
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
  });

  return data;
}

currentData();

button.addEventListener('click', function () {
  currentData(input.value);
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
