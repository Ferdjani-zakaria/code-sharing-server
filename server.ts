import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./db/connectDB";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { PageId } from "./db/models/PageIdModel";
dotenv.config();

const PORT = process.env.PORT || 5050;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/api", async (req: Request, res: Response) => {
    const id: string = uuidv4();
    try {
        const newAgent = new PageId({
            ...req.body,
            id: id,
        });
        await newAgent.save();
        // Send a response indicating success
        return res.status(201).send({ id }); // Created
    } catch (error) {
        // Send a response indicating failure
        return res.status(500).send(error.message); // Internal Server Error
    }
});
app.get("/api/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const pageId = await PageId.findOne({ id });
        res.send(pageId);
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Global error handling
app.use((_err, _req: Request, res: Response, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.");
});

//connecting TO DB
connectDB();

app.listen(PORT, () => {
    console.log("App is listening on port 5050");
});
