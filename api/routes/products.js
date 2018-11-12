const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


// Handle get request
router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
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
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Handle get request with ID
           //:Key->variable
router.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    Product.findById(productID).exec().then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: "No valid id found"});
        }
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
    // params is in the url
    // body is in the HTTP body
    const productID = req.params.productID;
    console.log("Product ID is " + productID);
    Product.remove({_id: productID}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: "Operation unsuccessful",
            error: err
        });
    });
});

module.exports = router;