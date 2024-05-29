const express = require("express");
const connectDB = require('./db'); // Cesta k souboru s konfigurací připojení
const productRoutes = require('./productRoutes'); // Cesta k souboru s cestami
const adminRoutes = require('./adminRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: ['text/html', 'text/plain']}));

// Připojení k databázi
connectDB();

// Použití cest pro produkty
app.use('/api', productRoutes);
app.use('/admin', adminRoutes);
app.use(express.static("../public"));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
