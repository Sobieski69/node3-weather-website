const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths fore express config
const publicDierctioryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebares engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDierctioryPath))


app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name:'Andrew Mead',
        message: 'test message'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {})=>{
 
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
          })
        
    })   
})

app.get('/products' , (req, res) =>{
    if(!req.query.search){
       return res.send({ 
            error: 'you must provide a search term'
        })
       
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'Error',
        message: 'Page not found'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})