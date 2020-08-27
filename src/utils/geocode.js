const request = require('request')
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=place&access_token=pk.eyJ1Ijoic2lkZHVpc2hlcmUiLCJhIjoiY2tlMHRzYTM4M3lpcTJzcGF6Znlld2F1bCJ9.chJEMbDH-LpXUf63KrL5Ew&limit=1'

    request({url:url, json:true},(error,response) =>{
        if(error){
            callback('unable to connect to MapBox Services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('location not found', undefined)
        }
        else {
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location: response.body.features[0].place_name
        })
    }})}
    






module.exports = geocode