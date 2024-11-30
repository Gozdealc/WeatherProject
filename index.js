const url = 'https://api.openweathermap.org/data/2.5/';
const key = '648a78e2dde0f669f495e0ceab8dd23c';

const cityInput = document.getElementById('city-input');
const weatherCity = document.getElementById('weather-city');
const weatherDegree = document.getElementById('weather-degree');
const weatherDescription = document.getElementById('weather-description');
const image = document.querySelector('.weather-icon');

let debounceTimer;

cityInput.addEventListener('input', () => {
    clearTimeout(debounceTimer); // Önceki timer'ı temizle
    const cityName = cityInput.value.trim();
    
    if (cityName === "") {
        clearWeatherInfo(); // Boşsa ekranı temizle
        return;
    }

    debounceTimer = setTimeout(() => {
        getWeather(cityName); // Kullanıcı yazmayı bitirdiğinde API'yi çağır
    }, 1000); // 1 saniye bekler
});

const getWeather = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    console.log("Oluşturulan API URL'si:", query); // Kontrol için
    fetch(query)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(displayResult)
        .catch((error) => {
            console.error("Fetch hatası:", error);
        });
};

const displayResult = (weather) => {
    weatherCity.innerText = `${weather.name} , ${weather.sys.country}`;
    weatherDegree.innerText = `${Math.round(weather.main.temp)}°C`;
    weatherDescription.innerText = weather.weather[0].description;

    switch(weather.weather[0].description) {
        case 'açık':
            image.src = './icons/acik.png';
            break;
        case 'parçalı bulutlu':
            image.src = './icons/parcalibulut.png';
            break;
        case 'kapalı':
            image.src = './icons/parcalibulut.png';
            break;
        case 'kar':
            image.src = './icons/kar.png';
            break;
        case 'hafif yağmur':
            image.src = './icons/hafifyagmur.png';
            break;
            case 'şiddetli yağmur':
                image.src = './icons/siddetliyagmur.png';
                break;
        default:
            image.src = 'default.png';
            break;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yüklendiğinde otomatik olarak Bursa'yı gösterirç
    getWeather('Bursa');
});
console.log(weather.weather[0].description);