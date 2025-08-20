import express from "express";
import { ENV } from "./config/env.js";
import { clerkMiddleware } from '@clerk/express';


const app = express();
const PORT = ENV.PORT
app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(PORT, () => console.log("Server started on port:", PORT));