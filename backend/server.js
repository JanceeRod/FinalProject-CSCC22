const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


const TestSchema = new mongoose.Schema({
    name: String,
});
const Test = mongoose.model("Test", TestSchema);
  

app.get("/", (req, res) => {
    res.send("🚀 Hello from Express + Docker + MongoDB!");
});


app.get("/api/test", async (req, res) => {
    const tests = await Test.find();
    res.json(tests);
});


app.post("/api/test", async (req, res) => {
    const { name } = req.body;
    const newTest = new Test({ name });
    await newTest.save();
    res.json({ message: "✅ Entry saved", entry: newTest });
});


app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});


mongoose.connect("mongodb://mongo:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("mongoDB connection error:", err);
});

