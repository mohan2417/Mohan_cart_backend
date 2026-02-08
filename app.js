const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // parse JSON body

// env config
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// routes
const products = require('./routes/product');
const orders = require('./routes/order');

// db
const connectDatabase = require('./config/connectDatabase');
connectDatabase();

// routes usage
app.use('/api/v1', products);
app.use('/api/v2', orders);

// 👇 ONLY run listen in local/dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} in ${process.env.NODE_ENV}`);
  });
}

// 👇 REQUIRED for Vercel
module.exports = app;



// cors = cross origin resourse sharing 
// its a browser security rule
//it controls the whether web pg is allowed to req data from other domain
// browsers block cross - orgin req by defaults to stop shady sites from stealing data.
// cors is enforced  by the browser only 