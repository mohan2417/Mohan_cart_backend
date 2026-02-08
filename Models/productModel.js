const mongoose = require('mongoose');

const productSchema = new  mongoose.Schema({
    name : String,
    price : String,
    description : String,
    ratings : String,
images : [{
    image : String
}],
category : String,
seller : String,
Stock : String

});

const ProductsModel = mongoose.model('Product' , productSchema);
module.exports = ProductsModel;
