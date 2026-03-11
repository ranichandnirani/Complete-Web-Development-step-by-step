import dotenv from "dotenv"
import express from "express"
dotenv.config({
    path: "./.env",
});


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/instagram", (req, res) => {
    res.send("this is an instagram page.");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
