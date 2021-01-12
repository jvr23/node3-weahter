const request = require('postman-request');

const getWeather = ({latitude, longitude}, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ecf18b2762ca4724ad1b58bb630df92b&query='+latitude+','+longitude;
  // console.log(url);
  request({url: url, json: true}, (error, {body},) =>{
    if(error){
      const message = 'Unable to connect to weather services';
      callback(message, undefined);
    }else if(body.success === false){
      const message = 'Couldn\'t find the location, try again';
      callback(message, undefined);
    }else{
      // console.log(`It is currently ${body.current.temperature} degrees out. And it feels like ${body.current.feelslike} degrees`);
      callback(undefined, body);
    }
  })
}

module.exports = getWeather;