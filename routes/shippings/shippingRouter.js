var express = require('express');
var shippingRouter = express.Router();
const shippingService = require('./shippingServices');

shippingRouter.post('/createshipping', async function (req,res) {
    await shippingService.createShipment(req.body).then(function (response) {
        res.send(response);
    });
});

shippingRouter.post('/updateshipping', async function (req,res) {
    await shippingService.updateShipping(req.body).then(function (response) {
        res.send(response);
    });

});

shippingRouter.post('/getShipmentStatus', async function (req,res) {
    await shippingService.getShipment(req.body).then(function (response) {
        res.send(response);
    });

});
module.exports = shippingRouter;
