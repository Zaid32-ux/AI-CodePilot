import express from "express";
import { config } from "dotenv";
import  dbConnection  from "./database/dbConnection.js";

config({ path: "./.env" });
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

 dbConnection();
export default app;