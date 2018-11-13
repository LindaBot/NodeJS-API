const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./uploads/");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});


// Handle get request
router.get('/', (req, res, next) => {
    Product.find().select('name price _id').exec().then(results => {
        const response = {
            count: results.length,
            products: results.map(item => {
                return{
                    name: item.name,
                    price: item.price,
                    _id: item._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + item._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Handle post request
router.post('/', upload.single('productImage') ,(req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        res.status(201).json({
            message: 'Added the following product',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                url: 'http://localhost:3000/products/' + result.id
            }
        })
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
            message: "Internal server error"
        })
    });
});

router.patch('/:productID', (req, res, next) => {
    /*
    Usage:
    HTTP request body:
    [
    {
        "propName": "name",
        "value": "harry potter"
    }
    ]
    */
    const productID = req.params.productID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    console.log(updateOps);
    Product.update({_id: productID}, {$set: updateOps}).exec()
        .then(result => {
            res.status(200).json(result);
        }) 
        .catch (err => {
            res.status(500).json(err);
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