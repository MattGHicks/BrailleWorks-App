const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WorkOrder = new Schema({
    workorder_po: {
        type: String
    },
    workorder_name: {
        type: String
    },
    workorder_status: {
        type: String
    },
    workorder_shippingFrom: {
        type: String
    },
    workorder_completionDate: {
        type: String
    },
    workorder_completed: {
        type: Boolean
    },
    workorder_tracking: {
        type: String
    }
});

module.exports = mongoose.model('WorkOrder', WorkOrder);