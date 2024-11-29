const express = require('express');
const router = require('./routes/booksRouter');

const app = express();

app.use(express.json())
app.use(router)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ON: http://localhost:${PORT}`);
})