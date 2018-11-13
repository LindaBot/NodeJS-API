const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    product: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, require: true}
})

module.exports = mongoose.model('Order', ordersSchema);