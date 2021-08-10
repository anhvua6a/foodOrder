let mongoose = require('mongoose')
let url = 'mongodb+srv://admin:admin@cluster0.avwql.mongodb.net/foodOrder?retryWrites=true&w=majority'


let db = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('co lếch thành công')).catch(function (error) {
    console.log(error)
})