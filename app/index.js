const express  = require('express' );
const mongoose = require('mongoose');
const dotenv   = require('dotenv'  );
const {ErrorHandler} = require('./Handler')

const routes = require('./routes/v1');

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
      console.log({ err });
      res.status(err.httpCode).json({ httpCode: err.httpCode, statusCode: err.statusCode, message: err.message});
    } else {
      console.log({ err });
      res.status(500).json({ statusCode: 5000 });
    }
  });

const MONGO_DB_HOST       = process.env.MONGO_DB_HOST      ;
const MONGO_DB_PORT       = process.env.MONGO_DB_PORT      ;
const MONGO_DB_BASE_URI   = process.env.MONGO_DB_BASE_URI  ;
const MONGO_DB_TABLE_NAME = process.env.MONGO_DB_TABLE_NAME;

const mongoURI = MONGO_DB_BASE_URI + MONGO_DB_HOST + ":" + MONGO_DB_PORT + "/" + MONGO_DB_TABLE_NAME;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (() => console.log ('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));


module.exports = app;
