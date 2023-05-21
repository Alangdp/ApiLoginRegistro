import app from './app.js'
import connectDB from '../config/db.js'
import dotenv from 'dotenv';

dotenv.config();

connectDB()
const port = process.env.APP_PORT;
app.listen(port);
