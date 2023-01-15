import { Router } from "express";
import * as bookCtrl from "../Controllers/General/books.controller.js";
import * as bookSpecCtrl from "../Controllers/Specifics/books.specific.js";
import { verifyToken, isAdmin, isModerator, verifyFilter, verifyOperators } from "../Middlewares/verify.js";

const booksrouter = Router();


booksrouter

.get("/", [verifyToken, verifyFilter, verifyOperators], bookSpecCtrl.getFilteredBooks)
.post("/", [verifyToken, isModerator], bookCtrl.createBook)

.get("/:bookId", verifyToken,bookCtrl.getBookById)
.put("/:bookId", [verifyToken, isModerator], bookCtrl.updateBookById)
.patch("/:bookId", [verifyToken, isModerator], bookCtrl.updatePartialBookById)
.delete("/:bookId", [verifyToken, isAdmin], bookCtrl.deleteBookById);



export default booksrouter;