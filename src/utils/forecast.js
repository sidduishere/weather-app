const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=191874d0655e5b3986e56ba33c3a9c8d&query='+latitude+','+longitude

    request({url:url,json:true},(error,response) => {
        if (error) {
                   callback('unable to connect to weatherstack',undefined)
                } else if(response.body.error){
                    callback('enter correct coordinates', undefined)
                    
                }
               else{
                callback(undefined, 'it is ' +response.body.current.weather_descriptions[0]+ ' and ' +response.body.current.temperature+ ' degrees') 
            }
    })}
module.exports = forecast