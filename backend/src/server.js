//external imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//internal imports
import apiRoutes from "./api/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hey there, this is Fittzy: server of the FitHub web app.")
})

app.use("/api", apiRoutes);

const portNumber = process.env.portNumber || 3001;
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
})
