import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import {notFound,errorHandler} from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express(); 
connectDB();

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/product',productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000,console.log("Server running on port 5000"));