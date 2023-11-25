const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book');
// const categoryRoutes = require('./routes/category');
// const publisherRoutes = require('./routes/publisher');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', bookRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/publishers', publisherRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
