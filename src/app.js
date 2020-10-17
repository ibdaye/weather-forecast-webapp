const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handle bars egine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set static directory to serve 

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'weather',
        name: 'chief ibibo'


    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about me',
        name: 'chief ibibo'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'chief ibibo'
        

    })
})
 

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })

    }


geocode(req.query.address, (error,{ latitude, longitude, location} = {}) =>{

    if (error){
        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {

        if(error){
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

    })

})

})


app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404',
        name: 'chief ibibo',
        errorMessage: 'help article not found'
    })
})


app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name:'chief ibibo',
        errorMessage: 'page not found'
    })
})

 

 app.listen(3000, ()=>{
     console.log('server is up on port 3000')
 })
