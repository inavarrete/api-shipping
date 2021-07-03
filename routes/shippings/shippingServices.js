
var path = require('path');
var axios = require('axios');
const { Shipment } = require('../../infrastructure/db');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });
async function createShipment(shipment) {
    return axios.get('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=' + shipment.origin_lat + ',' + shipment.origin_long + '&destinations=' + shipment.end_lat + ',' + shipment.end_long + '&travelMode=driving&key=' + process.env.BING_API_KEY)
        .then(response => {
            var travelDistance = response.data.resourceSets[0].resources[0].results[0].travelDistance
            if (travelDistance > 20) {
                return "Brooooo, this is too far, I can't walk " + travelDistance + "km! Just 20km please :)";
            }
            // less than 20km so insert it
            const insertShipment = Shipment.create(shipment);
            return insertShipment;
        })
}

async function updateShipping(shipment) {
    //TODO first look for the ID, if exists then update current_lat and current_long, otherwise return ID is not there bro!
    const id = await Shipment.findByPk(shipment.id);
    if (id === null) {
        return "Oops, that ID doesn't exists, but you can try another one ;) ";
    } else {
        id.update({
            status : shipment.status,
            current_lat : shipment.current_lat,
            current_long : shipment.current_long
        })
        return id
    }
}
async function getShipment(shipment) {
    const id = await Shipment.findByPk(shipment.id);
    if (id === null) {
        return "Oops, the ID " + shipment.id + " doesn't exists, but you can try another one ;) ";
    } else {
        return axios.get('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=' + id.current_lat + ',' + id.current_long + '&destinations=' + id.end_lat + ',' + id.end_long + '&travelMode=driving&key=' + process.env.BING_API_KEY)
        .then(response => {
            var travelDuration = response.data.resourceSets[0].resources[0].results[0].travelDuration;
            var response = {
                customer : id.customer,
                desc : id.descrip,
                status : id.status,
                eta : travelDuration.toFixed(2)+' Min',
                travelMethod : 'By Car'
            }
            return response;
        });
    }
}
module.exports = {
    createShipment,
    updateShipping,
    getShipment
}