const {Schema, model} = require ("mongoose")

const payments = new Schema({
    CardNumber: {type: String},
    ExpDate: {type: String},
    Cvv: {type: String},
    Amount: {type: Number},
    DateOfRequest: {type: String}
})

module.exports = model("payments", payments)