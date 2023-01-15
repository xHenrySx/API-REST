// Objetivo: Controlador de la vista de libros utilizando filtros específicos distinto al Id

import Book from '../../Models/Book.model.js';

// Obtener libros por distintos filtros -> GET
export const getFilteredBooks = async (req, res) => {
    try {
	const books = await Book.find(req.query);
	
	    if (!books) {
	        return res.status(404).json({ message: "Books not found" });
	    }
	    
	    return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Error while getting the books. Try again" });
    }
}