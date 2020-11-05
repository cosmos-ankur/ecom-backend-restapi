const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/nodeShop'
require('dotenv').config()
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection
con.on('open',()=>{
    console.log('Connected...')
})




const app = express()
const bodyparser = require('body-parser')
const productRoutes = require('../restapitut/api/routes/products')
const orderRoutes = require('../restapitut/api/routes/orders')
const userRoutes = require('../restapitut/api/routes/user')

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    )
    if(req.method==='OPTIONS'){
        res.header('Acdess-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/user',userRoutes)

app.use((req,res,next)=>{
    const error =new Error('Not Found')
    error.status = 404
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    })
})
module.exports = app