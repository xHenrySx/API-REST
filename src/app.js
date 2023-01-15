import express from "express";
import bodyParser from "body-parser";
import booksRouter from "./Routes/books.routes.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import { createRoles } from "./Libs/setUp.libs.js";

const app = express();

createRoles();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api/books", booksRouter);

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.get("*", (req, res) => {
    res.status(404).json({ message: "Not found" });
});


export default app;