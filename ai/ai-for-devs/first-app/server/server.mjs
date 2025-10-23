import express from "express";
import { ChatOllama } from "@langchain/ollama";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000

const model = new ChatOllama({
    model: 'llama3.2'
});

app.get('/', async(req, res) => {
    const response = await model.invoke("Can you simply say 'test'?");
    res.send(response.content);
});

app.post('/', async(req, res) => {
    const body = req.body;

    const stream = await model.stream(body.question);

    for await (const chunk of stream) {
        res.write(chunk.content);
    }

    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});