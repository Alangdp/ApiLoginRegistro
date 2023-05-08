import app from './app.js'
import connectDB from '../config/db.js'

connectDB()
const port = process.env.APP_PORT;
app.listen(port);
