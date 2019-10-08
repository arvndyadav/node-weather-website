// Make http calls
const request = require('request');
const chalk = require('chalk');


let getGeocode = (address, callback) => {

    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXJ2aW5kMjMwNyIsImEiOiJjazFlb2g2dXAwanJlM2NvOTJzdmEyZm90In0.8bXg9vZxo9xEG51BXhS-9w`;

    request({ url: geocodeUrl, json: true }, (error, response) => {
        // Object destructuring

        if (error) {
            callback('Unable to connect Geocoding service', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            let data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }

            callback(undefined, data);
        }
    })
}

module.exports = getGeocode;