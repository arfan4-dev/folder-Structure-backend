import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true })); // this is use for encode url request
app.use(cookieParser());



// routes import 
import userRouter from './routes/user.routes.js'
app.use('/api/v1/users', userRouter)
export { app }