// Objetivo: Definir las funciones que se ejecutarán cuando se llame a cada ruta
import Book from "../../Models/Book.model.js";
import mongoose from "mongoose";

function returnBadId(res, bookId) {
  return res.status(400).json({
    Error: "Invalid _id format",
    _id: bookId,
  });
}

// Obtener el libro por id -> GET
export const getBookById = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.bookId)) {
    const book = await Book.findById(req.params.bookId).catch((err) => {
      return res.status(500).json({
        Error: err.message,
      });
    });

    // Si no se encuentra el libro
    if (!book) {
      return res.status(404).json({
        Error: "Book not found",
      });
    }

    // Si se encuentra el libro
    return res.status(200).json(book);
  }

  return returnBadId(res, req.params.bookId);
};

// Eliminar el libro por id -> DELETE
export const deleteBookById = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.bookId)) {
    const book = await Book.findByIdAndDelete(req.params.bookId).catch(
      (err) => {
        return res.status(500).json({
          Error: err.message,
        });
      }
    );

    if (!book) {
      return res.status(404).json({
        Error: "Book not found",
      });
    }

    return res.status(200).json(book);
  }

  return returnBadId(res, req.params.bookId);
};

// Actualizar el libro completamente por id -> PUT
export const updateBookById = async (req, res) => {
  const { title, author, year, pages, description, image } = req.body;
  const { bookId } = req.params;

  if (mongoose.Types.ObjectId.isValid(bookId)) {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title: title,
        author: author,
        year: year,
        pages: pages,
        description: description,
        image: image,
      },
      { new: true }
    ).catch((err) => {
      return res.status(500).json({
        Error: err.message,
      });
    });

    if (!updatedBook) {
      return res.status(404).json({
        Error: "Book not found",
      });
    }

    return res.status(200).json(updatedBook);
  }

  return returnBadId(res, req.params.bookId);
};

// Actualizar parcialmente el libro por id -> PATCH
export const updatePartialBookById = async (req, res) => {
  const { bookId } = req.params;

  if (mongoose.Types.ObjectId.isValid(bookId)) {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    }).catch((err) => {
      return res.status(500).json({
        Error: err.message,
      });
    });

    if (!updatedBook) {
      return res.status(404).json({
        Error: "Book not found",
      });
    }

    return res.status(200).json(updatedBook);
  }

  return returnBadId(res, req.params.bookId);
};

// Crear un libro -> POST
export const createBook = async (req, res) => {
  const { title, author, year, pages, description, image } = req.body;

  const newBook = new Book({
    title: title,
    author: author,
    year: year,
    pages: pages,
    description: description,
    image: image,
  });

  const bookSaved = await newBook.save().catch((err) => {
    return res.status(500).json({
      Error: err.message,
    });
  });

  return res.status(201).json(bookSaved);
};

// DEPRECATED
/* Obtener todos los libros -> GET (All) -> 
Ahora se usa una funcion extendida con filtro, o operadores */

export const getBooks = async (req, res) => {
  const books = await Book.find().catch((err) => {
    return res.status(500).json({
      Error: err.message,
    });
  });

  return res.status(200).json(books);
};
