import express from "express";
import { ENV } from "./config/env.js";
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import { connectDB } from "./config/db.js";



const app = express();
const PORT = ENV.PORT
app.use(express.json());//req.body
app.use(clerkMiddleware());//req.auth will be available in the request object

app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/", (req, res) => {
    res.send("Hello World");
})
const serverStart = async () => {
   try {
    connectDB()
    if (ENV.NODE_ENV !== "production") {
        app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
        });   
    }
   } catch (error) {
        console.log("error starting the server:", error);
        process.exit(1);
   }
    
}
serverStart();