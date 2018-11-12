const express = require('express');
const router = express.Router();


// Handle get request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get request to /products'
    })
});


// Handle post request
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post request to /products'
    })
});

// Handle get request with ID
           //:Key
router.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    if (productID === 'special'){
        res.status(200).json({
            message: 'Special id',
            id: productID
        })
    } else {
        res.status(200).json({
            id: productID
        })
    }
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