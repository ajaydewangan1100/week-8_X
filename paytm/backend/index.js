import express from "express";
import mainRouter from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

// app.all("*", (req, res) => {
//   res.status(400).send("OOPS!! 404 page not found!");
// });

app.listen(3444, async () => {
  // await connectToDB();
  //console.log("App is listening at http://localhost:3444");
});

export default app;
