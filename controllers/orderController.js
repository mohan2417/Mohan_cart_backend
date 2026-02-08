const orderModel = require('../Models/orderModel');
const ProductsModel = require('../Models/productModel');

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const cartItems = req.body.cartItems;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    let amt = 0;

    // 1️⃣ Validate products & calculate amount
    for (const item of cartItems) {
      const product = await ProductsModel.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`
        });
      }

      amt += product.price * item.qty;
    }

    amt = Number(amt.toFixed(2));

    // 2️⃣ Create order
    const order = await orderModel.create({
      cartItems,
      amt,
      status: 'pending' // ✅ fixed
    });

    // 3️⃣ Update stock AFTER order is saved
    for (const item of cartItems) {
      const product = await ProductsModel.findById(item.product);
      product.stock -= item.qty;
      await product.save();
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('ORDER ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
