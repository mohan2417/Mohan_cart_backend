const Productsmodel = require('../Models/productModel');


// get Products API - /api/v1/products

exports.getProducts= async (req , res , next) => {
    const query = req.query.keyword? { name : {
        $regex : req.query.keyword,
        $options:'i'
    }} : {}
    const product = await Productsmodel.find(query)
    res.json({
        success: true,
        messsage: 'get products',
        product:product
        
    })
   // console.log(query)
}



// get iSingleProducts API - /api/v1/products

exports.getSingleProducts= async (req , res , next) => {
    
    console.log(req.params.id, 'ID')
    try {
  const product = await Productsmodel.findById(req.params.id);
    res.json({
        success: true,
        messsage: 'get single products',
        product: product
    })
    }
    catch (error){
        res.status(404).json({
        success: false,
       // messsage: error.messsage
       messsage: 'unable to get '

    })
    
    }
}

console.log('success Product')
// try catch for handling the error
