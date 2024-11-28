const express = require('express');
const { readFile, writeFile } = require('./functions'); // importa as funções para manipular o arquivo JSON

const app = express();
app.use(express.json({ extended: true }));

// Rota para ler todas as tarefas
app.get('/tasks', (req, res) => {
    const content = readFile(); // ler o arquivo JSON
    // verifica se o arquivo está vazio
    if (content.length === 0) return res.status(200).json({ message: "Nenhuma tarefa cadastrada." });
    res.status(200).json(content);
})

// Rota para ler tarefa pelo ID
app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const content = readFile();
    // busca a tarefa com o id passado no req
    const task = content.find(task => task.id === +id);
    // verifica se a tarefa não foi encontrada
    if (task === undefined) return res.status(404).json({ message: "Tarefa não encontrada!" });

    return res.status(200).json(task);
})

// Rota para criar uma tarefa
app.post('/tasks', (req, res) => {
    const { title, description } = req.body; // Obtém os itens do corpo da requisição
    // Verifica se os campos foram fornecidos corretamente
    if (!title || !description) return res.status(400).json({ message: "Todos os campos devem ser preenchidos!" });
    if (title.length < 3) return res.status(400).json({ message: "O título deve ter no mínimo 3 caracteres!" });
    if (title.length < 3) return res.status(400).json({ message: "A descrição deve ter no mínimo 3 caracteres!" });

    // cria a tarefa
    const task = {
        id: Math.round(Math.random() * 9999),
        title,
        description,
        status: "pendente",
        create_at: new Date().toLocaleString(),
        update_at: new Date().toLocaleString()
    }

    const currentContent = readFile();
    currentContent.push(task); // adiciona a tarefa 
    writeFile(currentContent); // atualiza o arquivo JSON
    res.status(201).json(task);
})

// Rota para atualizar uma tarefa pelo ID
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const currentContent = readFile();
    // busca o indice da tarefa a ser atualizada
    const taskIndex = currentContent.findIndex(task => task.id === +id);

    // verifica se a tarefa existe
    if (taskIndex === -1) return res.status(404).json({ message: "Tarefa não encontrada!" });
    // desestrutura o objeto da tarefa
    const { id: tId, title: tTitle, description: tDescription, status: tStatus, create_at } = currentContent[taskIndex];

    // valida se os campos title e description foram passados, e se foi passado corretamente
    if (typeof title === 'string' && title.length < 3) return res.status(400).json({ message: "O título deve ter no mínimo 3 caracteres" });
    if (typeof description === 'string' && description.length < 3) return res.status(400).json({ message: "A descrição deve ter no mínimo 3 caracteres" });

    const validStatuses = ['pendente', 'em andamento', 'concluida']; // array com os status permitidos
    // valida se o status foi passado
    if (typeof status === 'string') {
        // verifica se o status é válido
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ message: "Status deve ser 'pendente', 'em andamento' ou 'concluida'." });
        }
    }

    // atualiza o objeto da tarefa
    const updatedTask = {
        id: +id,
        title: title || tTitle,
        description: description || tDescription,
        status: status ? status.toLowerCase() : tStatus,
        create_at,
        update_at: new Date().toLocaleString()
    };

    // adiciona a tarefa atualizada no array
    currentContent[taskIndex] = updatedTask;
    writeFile(currentContent); // atualiza o arquivo JSON

    return res.status(200).json(updatedTask);
})

// Rota para deletar uma tarefa pelo ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const currentContent = readFile();

    // busca o indice da tarefa a ser deletada
    const taskIndex = currentContent.findIndex(task => task.id === +id);
    // verifica se a tarefa não existe
    if (taskIndex === -1) return res.status(404).json({ message: "Tarefa não encontrada!" });

    // remove a tarefa
    currentContent.splice(taskIndex, 1);
    writeFile(currentContent); // atualiza o arquivo JSON

    return res.status(200).json({ message: "Tarefa excluída com sucesso!" });
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ON: http://locahost:${PORT}/`);
})