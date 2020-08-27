const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

const dirpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')
const { rawListeners } = require('process')

app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(dirpath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'weather',
        name:'siddarha'
    })
})

app.get('/about', (req,res) =>{
    res.render('about' , {
        title: 'About Me',
        name: 'Siddartha'

    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'Help Page',
        name:'siddartha'
    })

})

app.get('/help/*',(req,res) => {
    res.render('notfound',{
        name:'siddartha',
        error:'help article not found'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Provide an address'})
    }
    geocode(req.query.address,(error, {longitude,latitude,location}={}) => {
        if(error) {
            return res.send({error})
            
        }

        forecast(latitude,longitude,(error,forecastdata) => {
            if(error) {
                return res.send({error})
               
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address,
                latitude,
                longitude
            })
        })})})
    

    

    // res.send ( {
    //     location : 'Karimnagar' ,
    //     forecast : 'Rainy' ,
    //     address: req.query.address
    
      


app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'siddartha',
        error:'page not found'
    })
})



app.listen(3000, () => {
   console.log('server is up')
})

// querys




// app.get('',(req, res) => {
//     res.send('hello express!')
// })

// app.get('/help',(req, res) => {
//     res.send('help page')
// })

// app.get('/about' , (req ,res) => {
//     res.send('<h1>about page<h1>')
// })

