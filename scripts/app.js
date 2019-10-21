const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//console.log(forecast);

const updateUI = (data) => {

    // destructure properties
    console.log(data);
    const { cityDetails, weather } = data;


    // update details
    details.innerHTML = `
        <h6 class="my-2">${cityDetails.EnglishName}</h5>
        <div class="my-2">${weather.WeatherText}</div>
        <div class="display-4 my-3">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;    

    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    // update icon & image
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);


    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc);

}

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather };

}

cityForm.addEventListener('submit', e => {
    // prevent from refreshing page 
    e.preventDefault();
    
    // get city name from input
    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updateUI(data) )
        .catch(error => console.log(error));


    //set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data) )
        .catch(error => console.log(error));
}