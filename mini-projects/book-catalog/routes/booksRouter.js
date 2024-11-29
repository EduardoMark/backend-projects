const express = require('express');
const { readFile, writeFile } = require('../functions');
const { validateBooksQuery, validateBooksBody, validateID, validateRequest, validateBooksBodyForUpdate } = require('../middlewares/validator');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/books', validateBooksQuery, validateRequest, async (req, res) => {
    const { author, year } = req.query;

    try {
        const content = await readFile();

        if (!author && !year) return res.status(200).json(content);

        const booksFiltered = content.filter(book => {
            if (author && year) return book.author.toLowerCase() === author.toLowerCase() && book.year === year;

            if (author) return book.author.toLowerCase() === author.toLowerCase();

            if (year) return book.year === year;
        });

        if (booksFiltered.length === 0) {
            return res.status(404).json({ message: "Nenhum livro encontrado com os critérios passados!" });
        }

        return res.status(200).json(booksFiltered);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao processar a solicitação.", error: error.message });
    }
});

router.post('/books', validateBooksBody, validateRequest, async (req, res) => {
    const { title, author, year } = req.body;

    try {
        const currentContent = await readFile();

        const newBook = {
            id: uuidv4(),
            title,
            author,
            year,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        }

        currentContent.push(newBook);
        await writeFile(currentContent)

        return res.status(201).json({ message: "Livro criado com sucesso!", book: newBook });
    } catch (error) {
        console.error(`Erro ao criar o livro: ${error.message}`);
        return res.status(500).json({ error: `Erro ao criar o livro` });
    }
});

router.put('/books/:id', validateID, validateBooksBodyForUpdate, validateRequest, async (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;

    if (!title && !author && !year) return res.status(200).json({ message: "Nenhum campo atualizado!" });

    try {
        const currentContent = await readFile();
        const bookIndex = currentContent.findIndex(book => book.id === id);

        if (bookIndex === -1) return res.status(404).json({ message: "Nenhuma tarefa encontrada!" });

        const updatedBook = {
            ...currentContent[bookIndex],
            ...(title && { title }),
            ...(author && { author }),
            ...(year && { year }),
            updated_at: new Date().toLocaleString()
        }

        currentContent[bookIndex] = updatedBook;
        await writeFile(currentContent)

        return res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
        console.error(`Erro ao atualizar o livro: ${error.message}`);
        return res.status(500).json({ error: "Erro ao tentar atualizar o livro!" });
    }
});

router.delete('/books/:id', validateID, validateRequest, async (req, res) => {
    const { id } = req.params;

    try {
        const currentContent = await readFile();
        const bookIndex = currentContent.findIndex(book => book.id === id);
        if (bookIndex === -1) return res.status(404).json({ message: "Nenhuma tarefa encontrada!" });

        currentContent.splice(bookIndex, 1);
        await writeFile(currentContent);

        return res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (error) {
        console.error(`Erro ao exclui o livro: ${error.message}`);
        return res.status(500).json({ error: `Erro ao exclui o livro` })
    }
});

module.exports = router;