# API To-Do List

Este projeto é uma API simples para gerenciar uma lista de tarefas (To-Do List), desenvolvida com Node.js e Express. Ele utiliza um arquivo JSON como base para armazenamento dos dados, sem a necessidade de um banco de dados.

## Funcionalidades

- **Listar todas as tarefas**: Recupera todas as tarefas cadastradas.
- **Consultar uma tarefa por ID**: Retorna os detalhes de uma tarefa específica.
- **Criar uma nova tarefa**: Adiciona uma nova tarefa à lista.
- **Atualizar uma tarefa existente**: Permite alterar o título, descrição ou status de uma tarefa.
- **Excluir uma tarefa**: Remove uma tarefa da lista.

## Tecnologias Utilizadas

- JavaScript
- Node.js
- Express

## Como Executar o Projeto

### Requisitos

- [Node.js](https://nodejs.org/) instalado na máquina.

### Passos para Execução

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/EduardoMark/backend-projects.git
   cd ./mini-projects/to-do-list
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor**:
   ```bash
   npm start
   ```

4. **Acesse a API**:
   O servidor será iniciado em: `http://localhost:3000`

## Rotas da API

### 1. Listar todas as tarefas
**GET** `/tasks`

**Resposta:**
```json
[
  {
    "id": 1234,
    "title": "Exemplo de Tarefa",
    "description": "Esta é uma tarefa exemplo",
    "status": "pendente",
    "create_at": "01/01/2024, 10:00:00",
    "update_at": "01/01/2024, 10:00:00"
  }
]
```

### 2. Consultar uma tarefa por ID
**GET** `/tasks/:id`

**Resposta de sucesso:**
```json
{
  "id": 1234,
  "title": "Exemplo de Tarefa",
  "description": "Esta é uma tarefa exemplo",
  "status": "pendente",
  "create_at": "01/01/2024, 10:00:00",
  "update_at": "01/01/2024, 10:00:00"
}
```

**Resposta de erro:**
```json
{
  "message": "Tarefa não encontrada!"
}
```

### 3. Criar uma nova tarefa
**POST** `/tasks`

**Corpo da requisição:**
```json
{
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa"
}
```

**Resposta:**
```json
{
  "id": 5678,
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
  "status": "pendente",
  "create_at": "01/01/2024, 11:00:00",
  "update_at": "01/01/2024, 11:00:00"
}
```

### 4. Atualizar uma tarefa existente
**PUT** `/tasks/:id`

**Corpo da requisição:** (campos opcionais)
```json
{
  "title": "Tarefa Atualizada",
  "description": "Descrição atualizada",
  "status": "concluida"
}
```

**Resposta:**
```json
{
  "id": 1234,
  "title": "Tarefa Atualizada",
  "description": "Descrição atualizada",
  "status": "concluida",
  "create_at": "01/01/2024, 10:00:00",
  "update_at": "01/01/2024, 12:00:00"
}
```

### 5. Excluir uma tarefa
**DELETE** `/tasks/:id`

**Resposta:**
```json
{
  "message": "Tarefa excluída com sucesso!"
}
```

**Erro:**
```json
{
  "message": "Tarefa não encontrada!"
}
```

## Estrutura de Arquivos

```
.
├── functions.js         # Funções para leitura/escrita no arquivo JSON
├── data                 # Pasta onde está o arquivo JSON
    ├── tasks.json       # Arquivo JSON usado como base de dados
├── main.js              # Arquivo principal da API
├── package.json         # Arquivo de dependências do Node.js
└── README.md            # Documentação do projeto
```

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug: `git checkout -b minha-feature`.
3. Faça os commits das suas alterações: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.