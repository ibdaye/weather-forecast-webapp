const request = require('request')
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=025be7dc08e020970d28a9c502485368&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json:true }, (error, { body })=>{
        if(error){
            callback('unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)

        }else{
            callback(undefined , body.current.weather_description + ' it is currently ' + body.current.temperature  + ' degrees out. but it feels like  ' + body.current.feelslike + ' degrees out. The humidity is  ' + body.current.humidity + '%.' )

        }
    })
}

module.exports = forecast
