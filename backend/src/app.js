import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import userRouter from "./routes/user.routes.js";
import monuRouter from "./routes/monument.routes.js";

const app= express();

app.use(express.json());
app.use(express.static("/public"))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));


app.use(cors({
    origin: "https://ticketless-touring.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/monuments", monuRouter);


app.use((err, req, res, next)=>{
    console.log("In error-handling middleware");
    
    res.status(err.statusCode || 500)
    .json({
        error: err
    });
});

export {app};