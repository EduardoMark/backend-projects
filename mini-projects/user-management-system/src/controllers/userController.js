const { readFile, writeFile } = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userController = {
    getUser: async (req, res) => {
        const { name, email } = req.query;

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

        try {
            const content = await readFile();

            if (!name && !email) return res.status(200).json(content);

            const usersFiltered = content.filter(user => {
                if (name && email) return user.name.toLowerCase() === name.toLowerCase() && user.email === email;
                if (name) return user.name.toLowerCase() === name.toLowerCase();
                if (email) return user.email === email;
            })

            if (usersFiltered === 0) return res.status(404).json({ message: "Usuário(s) não encontrado(s)!" });

            return res.status(200).json(usersFiltered);
        } catch (error) {
            console.error(`Erro ao tentar buscar o(s) usuário(s): ${error.message}`);
            return res.status(500).json({ error: `Erro ao tentar buscar o(s) usuário(s)` });
        }
    },

    createUser: async (req, res) => {
        const { name, email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

        try {
            const currentContent = await readFile();

            const hashedPass = await bcrypt.hash(password, 10);

            const newUser = {
                id: uuidv4(),
                name,
                email,
                password: hashedPass,
                created_at: new Date(),
                updated_at: new Date()
            }

            currentContent.push(newUser);
            await writeFile(currentContent);

            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            console.error(`Erro ao tentar criar o usuário: ${error.message}`);
            res.status(500).json({ error: `Erro ao tentar criar o usuário` });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { name, email, currentPassword, newPassword } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

        try {
            const currentContent = await readFile();

            const userIndex = currentContent.findIndex(user => user.id === id);
            if (userIndex === -1) return res.status(404).json({ message: "Usuário não encontrado!" });

            if (currentPassword) {
                const isPasswordValid = await bcrypt.compare(currentPassword, currentContent[userIndex].password);
                if (!isPasswordValid) {
                    return res.status(400).json({ message: "Senha atual inválida!" });
                }
            }

            let hashedPass = currentContent[userIndex].password;
            if (newPassword) {
                hashedPass = await bcrypt.hash(newPassword, 10);
            }

            const newUser = {
                ...currentContent[userIndex],
                ...(name && { name }),
                ...(email && { email }),
                ...(newPassword && { password: hashedPass }),
                updated_at: new Date()
            }

            currentContent[userIndex] = newUser;
            await writeFile(currentContent);

            return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.error(`Erro ao tentar atualizar o usuário: ${error.message}`);
            res.status(500).json({ erro: `Erro ao tentar atualizar o usuário` });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

        try {
            const currentContent = await readFile();
            const userIndex = currentContent.findIndex(user => user.id === id);

            if (userIndex === -1) return res.status(404).json({ message: "Usuário não encontrado!" });

            currentContent.splice(userIndex, 1);
            await writeFile(currentContent);

            return res.status(204).send()
        } catch (error) {
            console.error(`Erro ao tentar excluír o usuário: ${error.message}`);
            return res.status(500).json({ error: "Erro ao tentar excluír o usuário!" });
        }
    }
}

module.exports = userController;