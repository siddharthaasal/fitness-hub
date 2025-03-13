//external imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//internal imports
import apiRoutes from "./api/index.js";



dotenv.config();
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Exact frontend URL
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hey there, this is Fittzy: server of the FitHub web app.");
});

app.use("/api", apiRoutes);

const portNumber = process.env.portNumber || 3001;
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
});
