import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from 'morgan';
import dbClient from '../../src/utils/db.js';
import mongoose from 'mongoose';
import courseRoutes from '../../src/routes/courseRoutes.js';

const app = express();

mongoose.connect(dbClient.url, {
})
.then(() => console.log('Mongoose connected successfully'))
  .catch((error) => console.error('Error connecting to Mongoose:', error));

// third-party middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/api/v1', courseRoutes);


app.get("/", (req, res) => {
  res.send("Hello! From Learnaz Hub Server\n");
});


export default app;
