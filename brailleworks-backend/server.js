const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const workorderRoutes = express.Router();
const PORT = 4000;

let WorkOrder = require('./workorder.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/workorders', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


workorderRoutes.route('/').get(function(req, res) {
    WorkOrder.find(function(err, workorders) {
        if (err) {
            console.log(err);
        } else {
            res.json(workorders);
        }
    }).sort({ workorder_po: -1 });
});

workorderRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    WorkOrder.findById(id, function(err, workorder) {
        res.json(workorder);
    });
});

workorderRoutes.route('/add').post(function(req, res) {
    let workorder = new WorkOrder(req.body);
    workorder.save()
        .then(workorder => {
            res.status(200).json({'workorder': 'workorder added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new workorder failed');
        });
});

workorderRoutes.route('/update/:id').post(function(req, res) {
    WorkOrder.findById(req.params.id, function(err, workorder) {
        if (!workorder)
            res.status(404).send('data is not found');
        else
            workorder.workorder_po = req.body.workorder_po;
            workorder.workorder_name = req.body.workorder_name;
            workorder.workorder_status = req.body.workorder_status;
            workorder.workorder_shippingFrom = req.body.workorder_shippingFrom;
            workorder.workorder_completionDate = req.body.workorder_completionDate;
            workorder.workorder_completed = req.body.workorder_completed;
            workorder.workorder_tracking = req.body.workorder_tracking;

            workorder.save().then(workorder => {
                res.json('WorkOrder updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/workorders', workorderRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});