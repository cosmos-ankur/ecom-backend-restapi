const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require("../models/orders")


router.post('/orders/create',(req,res)=>{
    const order = new Order({
        quantity : req.body.quantity,
        product : req.body.productId
    })
    order
    .save()
    .then(result=>{
        console.log(result)
        res.status(201).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(501).json({
            error:err
        })
    })
})

router.get('/orders/getorders',(req,res,next)=>{
    Order.find()
    .populate('product')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count : docs.length,
            orders : docs.map(doc=>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'https://localhost:9000/orders/' + doc._id
                    }
                }
            })
        })
        res.status(201).json(docs)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
})

router.get('/orders/getorder/:id',(req,res,next)=>{
    Order.findById(req.params.id)
    .exec()
    .then(order=>{
        if(!order){
            res.status(404).json({
                message : 'Order Not Found'
            })
        }
        res.status(200).json({
            order:order,
            request:{
                type:'GET',
                url:'http://localhost:9000/orders'
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
 })

 router.delete('/orders/delete/:id',(req,res,next)=>{
    Order.remove({_id:req.params.id})
    .exec()
    .then(
        res.send('Deleted')
    )
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
 })
 



 module.exports = router