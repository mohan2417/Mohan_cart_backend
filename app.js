const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json())// for taking the data from the body 

dotenv.config({path: path.join(__dirname, 'config', 'config.env')})
const products = require('./routes/product');
const orders = require('./routes/order');
const connectDatabase = require('./config/connectDatabase');
connectDatabase();
app.use('/api/v1',products);
app.use('/api/v2',orders);

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT} IN  ${process.env.NODE_ENV}`);
});


// cors = cross origin resourse sharing 
// its a browser security rule
//it controls the whether web pg is allowed to req data from other domain
// browsers block cross - orgin req by defaults to stop shady sites from stealing data.
// cors is enforced  by the browser only 