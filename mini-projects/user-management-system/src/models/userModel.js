const fs = require('node:fs/promises');
const path = require('node:path');

const pathFile = path.join(__dirname, '../database/users.json');

const writeFile = async (data) => {
    try {
        await fs.writeFile(pathFile, JSON.stringify(data, null, 2), 'utf-8')
    } catch (error) {
        console.error(`Erro ao tentar escrever o arquivo: ${error.message}`);
        throw error;
    }
}

const readFile = async () => {
    try {
        const content = await fs.readFile(pathFile, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Erro ao tentar ler o arquivo: ${error.message}`);
        throw error;
    }
}

module.exports = { writeFile, readFile };