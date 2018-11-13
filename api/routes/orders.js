const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find().exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(item => {
                return{
                    _id: item.id,
                    product: item.product,
                    quantity: item.quantity,
                    requests: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + item.id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.post('/', (req, res, next) => {
    // Check if the productID exists
    Product.findById(req.body.productID)
    .then(docs => {
        if (docs === null){
            res.status(404).json({Error: "Product not found"});
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productID
    });
    order.save().then(result => {
        res.status(201).json({
            message: "Order created",
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Order detail'
    });
});

router.post('/:orderID', (req, res, next) => {
    res.status(201).json({
        message: 'Order create detail',
        orderID: req.params.orderID
    });
});

router.delete('/:orderID', (req, res, next) => {
    const orderID = res.params.orderID;
    Order.remove({_id: orderID}).exec()
    .then(docs => {
        res.status(201).json(docs);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;