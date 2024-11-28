const fs = require('node:fs');

// Função para escrever no arquivo JSON
const writeFile = (data) => {
    fs.writeFileSync('./data/tasks.json', JSON.stringify(data, null, 2), 'utf-8');
};

// Função para ler o arquivo JSON
const readFile = () => {
    try {
        const data = fs.readFileSync('./data/tasks.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            writeFile([]);
            return [];
        }
        throw error;
    }
}

module.exports = { writeFile, readFile }