// Make http calls
const request = require('request');

let forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/750a3e284e679d4bdc7ddee3ea85fe42/${latitude}, ${longitude}?units=si`;

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect Weather service', undefined);
        } else if (response.statusCode !== 200) {
            callback(response.body.error,  undefined)
        } else {
            // Object destructuring
            let {summary, temperature, precipProbability} = response.body.currently;

            let string = `${summary}. It is currently ${temperature} degrees out there. There is a ${
                precipProbability * 100} % chance of rain.`;

            callback(undefined, string);
        }
    })
}

module.exports = forecast;