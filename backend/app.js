// const express = require('express');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth.route.js');
// const { connectDB } = require('./lib/db.js');
// const cookieParser = require("cookie-parser");
// const messageRoutes = require('./routes/message.route.js');
// const cors = require('cors');
// const { app, server } = require("./lib/socket.js");
// const path = require("path");

import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';
import path from 'path';


dotenv.config();

const port = process.env.PORT || 4000;

const __dirname = path.resolve();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    }); 
}


server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectDB();
});
