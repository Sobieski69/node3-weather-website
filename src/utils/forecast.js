const request = require('request')



const forecast = (latitude, longtitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=23986729cd36dc5f2619bab01ee5e5c2&query=' + latitude + ',' + longtitude
    request({ url, json: true }, (error, {body})=>{
        //console.log(response.body.current)
        if(error){
            callback('Unable to connect ot weather service', undefined)

        }else if(body.error){
            callback('unable to load location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. And it feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + "%")
        }
})
}

module.exports = forecast