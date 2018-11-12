const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


// Handle get request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get request to /products'
    })
});


// Handle post request
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling post request to /products',
        createdProduct: product
    })
});

// Handle get request with ID
           //:Key->variable
router.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    Product.findById(productID).exec().then(doc => {
        console.log(doc);
        res.status(200).json({
            doc: doc
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Could not find"
        })
    });
});

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Delete product'
    });
});

module.exports = router;