import { Router } from "express";
import * as bookCtrl from "../Controllers/books.controller.js";
import { verifyToken, isAdmin, isModerator } from "../Middlewares/verify.js";

const booksrouter = Router();


booksrouter
.get("/:bookId", bookCtrl.getBookById)
.put("/:bookId", [verifyToken, isAdmin], bookCtrl.updateBookById)
.patch("/:bookId", [verifyToken, isModerator], bookCtrl.updatePartialBookById)
.delete("/:bookId", [verifyToken, isAdmin], bookCtrl.deleteBookById)

.get("", bookCtrl.getBooks)
.post("", [verifyToken, isModerator], bookCtrl.createBook);

export default booksrouter;