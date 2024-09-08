import { Router } from "express";
import monumentsData from "../utils/data.js";
const router= Router();

router.get("/getallmonuments", (req, res)=>{
    console.log("getting all monuments from backend");
    
    return res.status(200)
    .set('Content-Type', 'application/json')
    .send(monumentsData);
});

export default router;