var mogoose = require('mongoose')
var foodOrderSchema = new mogoose.Schema({
 billID: String,
 foodID: String
})

module.exports=mogoose.model('foodorder',foodOrderSchema)