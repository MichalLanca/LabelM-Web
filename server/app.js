const express = require("express");
const connectDB = require('./db'); 
const productRoutes = require('./productRoutes'); 
const adminRoutes = require('./adminRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: ['text/html', 'text/plain']}));

connectDB();

app.use('/api', productRoutes);
app.use('/admin', adminRoutes);
app.use(express.static("../public"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
