const fs = require('fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, './database/books.json');

const writeFile = async (data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Erro ao escrever o arquivo: ${error.message}`);
        throw error;
    }
};

const readFile = async () => {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content)
    } catch (error) {
        if (error.code === 'ENOENT') {
            writeFile([]);
            return [];
        } else if (error.name === 'SyntaxError') {
            console.error(`Arquivo JSON corrompido. Recriando....`);
            writeFile([]);
            return [];
        }

        console.error(`Erro ao ler o arquivo: ${error.message}`);
        throw error;
    }
};

module.exports = { writeFile, readFile };