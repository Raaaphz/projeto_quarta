# Projeto Quarta

Um sistema simples de gerenciamento de concessionária de carros. Este projeto permite cadastrar carros, clientes e registrar vendas, além de oferecer filtros específicos para consultas.

---

## Sobre o projeto

O **Projeto Quarta** foi criado com o objetivo de exercitar operações básicas de CRUD (Create, Read, Update, Delete) e aplicar filtros em requisições GET, simulando um sistema de vendas de carros para uma concessionária.

**Principais funcionalidades:**

* Cadastro de **carros** (modelo, ano, preço, etc.)
* Cadastro de **clientes** (nome, CPF, contato, etc.)
* Registro de **vendas** vinculando clientes a carros
* Filtros e consultas específicas via endpoints GET

---

## Tecnologias

* **Linguagem**: JavaScript
* **Framework**: Express
* **Banco de dados**: MySQL
* Outras bibliotecas e ferramentas importantes

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* Banco de dados configurado (caso não use in-memory ou SQLite)

---

## Instalação e execução

1. **Clone** o repositório:

   ```bash
   git clone https://github.com/Raaaphz/projeto_quarta.git
   cd projeto_quarta
   ```

2. **Instale** as dependências:

   ```bash
   npm install    # ou yarn install
   ```

3. **Configure** variáveis de ambiente (se aplicável):

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   PORT=3000
   ```

4. **Execute** o servidor:

   ```bash
   npm start      # ou yarn start
   ```

O servidor estará disponível em `http://localhost:3000` (ou na porta configurada).

---

## Integrantes

- Diego
- Gabriel Gebra Tardivo
- Lucas Pomini Galli
- Raphael Camurri Michelassi
- Victor Hugo de Deus Machado
