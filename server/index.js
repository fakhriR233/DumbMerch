require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const port = 5000;

app.use(express.json());

app.use(cors());

const router = require('./src/routes/routes');

app.use('/api/v1/', router);

app.use('/uploads', express.static('uploads'));

app.listen(port, () =>
  console.log(`Server running on port: ${port}`)
);
