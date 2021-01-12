const request = require('postman-request');

const geocode = (address, callback) => {
  const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGVudmVyMzMiLCJhIjoiY2tqYnNicjBvMTVkdDJybjBrMml6OTFiOSJ9.EbOSabAqoPq-mOBhVUVKhw`;
 
  request({url: urlMapBox, json: true}, (error, {body}) =>{
  if(error){
    let message = 'Unable to connect to location services';
    callback(message, undefined);
  }else if(body.features.length){
    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
    });
  }else{
    let message = 'We couldn\'t find what you\'re looking for, please try again.';
    callback(message, undefined);
    }
  })
}

module.exports = geocode;