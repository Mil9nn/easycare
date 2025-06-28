import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
})
