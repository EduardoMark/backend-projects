# Gerenciador de Livros - API

Esta é uma API para gerenciar uma coleção de livros. Ela permite a criação, leitura, atualização e exclusão (CRUD) de livros, utilizando o framework Node.js com Express.js.

## Funcionalidades

- **Listar livros**: Retorna todos os livros ou filtra por autor e/ou ano.
- **Criar livro**: Adiciona um novo livro à coleção.
- **Atualizar livro**: Atualiza os dados de um livro existente.
- **Excluir livro**: Remove um livro da coleção.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução para JavaScript.
- **Express.js**: Framework web para Node.js.
- **UUID**: Para geração de IDs únicos.
- **Middleware personalizado**: Validações para entradas da API.

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/EduardoMark/backend-projects.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd ./mini-projects/book-catalog
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Configuração

1. Certifique-se de que os arquivos `functions.js` e `middlewares/validator.js` estão configurados corretamente.
2. As funções `readFile` e `writeFile` devem ser implementadas para manipular um arquivo JSON que armazena os dados dos livros.

## Uso

### Iniciar o Servidor

Para iniciar o servidor local, execute:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` por padrão.

### Endpoints da API

#### **GET** `/books`

Lista todos os livros ou filtra por autor e/ou ano.

**Query Parameters:**

- `author` (opcional): Filtra livros pelo autor.
- `year` (opcional): Filtra livros pelo ano de publicação.

**Exemplo de Requisição:**

```bash
GET /books?author=J.K.%20Rowling&year=2007
```

#### **POST** `/books`

Adiciona um novo livro à coleção.

**Body:**

```json
{
  "title": "Título do Livro",
  "author": "Nome do Autor",
  "year": 2023
}
```

#### **PUT** `/books/:id`

Atualiza informações de um livro específico.

**Body:** (campos opcionais, envie apenas os que deseja atualizar)

```json
{
  "title": "Novo Título",
  "author": "Novo Autor",
  "year": 2024
}
```

#### **DELETE** `/books/:id`

Remove um livro específico.

## Estrutura de Arquivos

```plaintext
├── database
│   └── books.json      # Arquivo JSON para armazenar os livros
├── routes
│   └── books.js        # Rotas da API para livros
├── functions.js        # Funções auxiliares (leitura/escrita de dados)
├── middlewares
│   └── validator.js    # Validações e middlewares personalizados
├── main.js             # Arquivo principal da aplicação
├── package.json        # Dependências e scripts
└── README.md           # Documentação do projeto
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

---

Feito com ❤️ por [Eduardo Marques](https://github.com/EduardoMark).
