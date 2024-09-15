import dotenv from "dotenv";
dotenv.config();

import {connectDB} from "./db/index.js";

import { app } from "./app.js";

connectDB()
.then((res)=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server listening on port ${process.env.PORT}`);
    });

    app.on("error", (err)=>{
        console.log("server error:", err);
    });
})
.catch((err)=> console.log("DB connection error:", err));