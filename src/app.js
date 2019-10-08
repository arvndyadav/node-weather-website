// Core module provides utilities for working with file and directory paths
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./util/geocode');
const forecast = require('./util/forecast');

// Create instance of express
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath);

// Can directly(localhost/about.htm) access files within public directory 
app.use(express.static(publicDirectoryPath));

// Setting handlebars to render dynamic webpage and all file should be in views folder
app.set('view engine', 'hbs');

// Customizing views folder
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// Creating partials for header and footer
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arvind Yadav'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help message',
        name: 'Arvind Yadav'
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        imagePath: "./img/DSC_0200.JPG",
        name: 'Arvind Yadav' 
    });
})

// query is the part after "?" in the url
app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({
                    error
                })
            } else {
                res.send({
                    forecast: data,
                    location,
                    address: req.query.address
                });
            }
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        message: 'Help article Not Found',
        name: 'Arvind Yadav'
    });
})

// Wild card entry
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        message: 'Page Not Found',
        name: 'Arvind Yadav'
    });
})

app.listen(3000, () => {
    console.log('App is listening on port 3000!')
})