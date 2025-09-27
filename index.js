import 'dotenv/config';
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import auth from './routes/auth.js'
import home from './routes/home.js'


const app = express();
app.use(bodyParser.json());
app.use(cors());

const routes = express.Router();



const MONGODB_URI = process.env.URI

mongoose.connect(MONGODB_URI);

app.use('/', home);
app.use('/auth', auth);


app.listen(process.env.PORT || 3000, () => {
  console.log(`\n Server is running`);
});

export default app;