// Objetivo: Controlador de la vista de libros utilizando filtros específicos distinto al Id

import Book from '../../Models/Book.model.js';

// Obtener todos libros por distintos filtros -> GET
export const getFilteredBooks = async (req, res) => {
    try {
        // Si existen filtros de ordenamiento
        if (req.headers.filter) {
            const filter = req.headers.filter;
            const [field, operator , value] = filter.split(":"); // Por ejemplo: "year:gt:1927"
            let books = [];
            if (operator == "substring") {
                books = await Book.find().where(field).equals(new RegExp(value, "i"));
                if (!books) {
                    return res.status(404).json({ message: "Books not found" });
                }
            } else {
                books = await Book.find(
                    { [field] : { [`$${operator}`]: value } }
                );
                if (!books) {
                    return res.status(404).json({ message: "Books not found" });
                }
            }
            
            if (!req.query) {
                return res.status(200).json(books);
            }

            const paramsBooks = await Book.find(req.query);
            if (!paramsBooks) {
                return res.status(404).json({ message: `Books not found with the params: ${req.query}` });
            }

            // Unir los libros que cumplen con los filtros de ordenamiento y los parámetros de búsqueda sin repertir
            // Realizar un inner join comparando title and author
            const filteredBooks = [];
            for (let book1 of books) {
                for (let book2 of paramsBooks) {
                    if (book1.title == book2.title && book1.author == book2.author) {
                        filteredBooks.push(book1);
                    }
                }
            }
            

            return res.status(200).json(filteredBooks);
        }
        
        // Filtros de ordenamiento aplicados o no existen
	    const books = await Book.find(req.query);
	
	    if (!books) {
	        return res.status(404).json({ message: "Books not found" });
	    }
	    
	    return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Error while getting the books. Try again :" + error });
    }
}