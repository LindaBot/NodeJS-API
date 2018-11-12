const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders were fetched',
        order: order
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'orders were created',
        orderID: order
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
    res.status(201).json({
        message: 'Order deleted',
        orderID: req.params.orderID
    });
});

module.exports = router;