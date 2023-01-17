import { Router } from "express";
import * as bookCtrl from "../Controllers/General/books.controller.js";
import * as bookSpecCtrl from "../Controllers/Specifics/books.specific.js";
import {
  verifyToken,
  isAdmin,
  isModerator,
  verifyFilter,
  verifyOperators,
  verifyData,
  verifyDataPartial,
} from "../Middlewares/verify.js";

const booksrouter = Router();

booksrouter

  .get(
    "/",
    [verifyToken, verifyFilter, verifyOperators],
    bookSpecCtrl.getFilteredBooks
  )
  .post("/", [verifyData, verifyToken, isModerator], bookCtrl.createBook)

  .get("/:bookId", verifyToken, bookCtrl.getBookById)
  .put(
    "/:bookId",
    [verifyData, verifyToken, isModerator],
    bookCtrl.updateBookById
  )
  .patch(
    "/:bookId",
    [verifyDataPartial, verifyToken, isModerator],
    bookCtrl.updatePartialBookById
  )
  .delete("/:bookId", [verifyToken, isAdmin], bookCtrl.deleteBookById);

export default booksrouter;
