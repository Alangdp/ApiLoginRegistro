import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import dataBaseRoutes from './Routes/databaseRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import tokenRoutes from './Routes/tokenRoutes.js'

dotenv.config();

const whiteList = [
  'http://192.168.1.83',
  'http://localhost:3000',
  'http://127.0.0.1'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowd by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json({ extended: true }));
    this.app.use(express.urlencoded({ extend: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/database', dataBaseRoutes);
    this.app.use('/token', tokenRoutes)
  }
}

export default new App().app;
