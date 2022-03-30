//Получение температуры города Москвы

const apiKey = "e222cfceeea3a72a3d4b2bfb2fec42e6"
const id_city = "524901"
const url = `http://api.openweathermap.org/data/2.5/weather?id=${id_city}&lang=ru&appid=${apiKey}`
const dataTime = new Date()

function createWeather(data){
    const day = dataTime.getDate()
    const month = dataTime.getMonth()
    if(month < 10 && day > 10){
       document.querySelector('.time').innerHTML = `${day}.0${month+1}`
    }else{
        document.querySelector('.time').innerHTML = `0${day}.${month+1}`
    }
    document.querySelector('.city').textContent=data.name
    document.querySelector('.weather__description').textContent =data.weather[0]['description']
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;'
    document.querySelector('.temperature__fell').innerHTML = Math.round(data.main.feels_like - 273) + '&deg'
}
function updateDate(){
    fetch(url)
    .then(response=>{
        return response.json()
    })
    .then(weather=>{
     createWeather(weather)
     getDataTime()
    })
}
updateDate()
//Курс валют
const valute = document.querySelector('.valute__root')
//Функция отображения Валют
function renderValute(valuteItem){
    for(key in valuteItem.Valute){
        if(key === 'USD' || key === 'EUR' || key ==='SEK' || key ==='JPY' || key ==='CAD'){
           const valute_wrapper = document.createElement('div')
           valute_wrapper.className = 'valute__wrapper'
           valute.appendChild(valute_wrapper)
             valute_wrapper.innerHTML = `
            <p class ='valute__price'>1 ${key} = ${Math.trunc( valuteItem.Valute[key].Value * 100 ) / 100 } RUB</p>
            <span class = 'valute__descr'>${valuteItem.Valute[key].Name}</span> 
            `;
        }
    }
}

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
.then(res=>{
   return res.json()
})
.then(dataValute=>{
    renderValute(dataValute)
})
//Добавление события для обновленния данных
const btn = document.querySelector('button')
btn.addEventListener('click',updateDate)