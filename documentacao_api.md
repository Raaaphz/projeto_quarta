# 📘 Documentação da API - Nome da API

---

## 1. Introdução

Bem-vindo à API. Esta API é feita para uma loja de veiculos e permite gerenciar os carros, os clientes, realizar transações e consultar os dados, tanto dos clientes como dos carros. Além disso, também temos o sistema de autenticação para que apenas os vendedores e gerentes da loja consigam usar a api.

- **Base URL**: `http://localhost:8080`
- **Versão**: 1.0.0
- **Formato de dados**: JSON
- **Status**: Estável

---

## 2. Autenticação

A API utiliza **JWT** para proteger os recursos.

### Como autenticar:

Ao fazer o login, o token é gerado automaticamente, e expira depois de 24 horas, precisando fazer um login novamente.
A cada página navegada na interface, é feita uma verificação no token para permitir ou barrar o acesso do usuário.

---

## 3. URL Base

Todas as requisições devem usar a seguinte base:

```http
http://localhost:8080
```

Com um adicional na url em relação a qual área a requisição deve ser feita.
Portanto:

-Para carros:

```http
http://localhost:8080/carros
```

-Para clientes:

```http
http://localhost:8080/clientes
```

-Para vendas:

```http
http://localhost:8080/vendas
```

-Para vendedores e gerentes/administradores:

```http
http://localhost:8080/usuarios
```

---

## 4. Formato de Requisição e Resposta

- **Content-Type aceito**: `application/json`
- **Formato de resposta**: JSON
- **Padrão de erros**:

```json
{
  "erro": "Mensagem explicando o erro"
}
```

### Códigos HTTP comuns:

| Código | Significado              |
| ------ | ------------------------ |
| 200    | OK                       |
| 201    | Criado com sucesso       |
| 400    | Requisição inválida      |
| 401    | Não autorizado           |
| 403    | Proibido                 |
| 404    | Não encontrado           |
| 500    | Erro interno do servidor |

---

## 5. Endpoints

### PARA OS CLIENTES (/clientes)

#### 📍 `GET /visualizarcliente`

**Descrição**: Retorna os dados de todos os cliente.

**Exemplo de Requisição:**

```http
GET /visualizarcliente
```

**Resposta de sucesso:**

```json
{
  "id": 123,
  "nome": "joao",
  "sobrenome": "da silva",
  "nascimento": "01/01/1999",
  "logradouro": "rua teste, 123",
  "bairro": "bairro teste",
  "cep": 17250000,
  "cpf": 12345678900
}
```

**Erros comuns:**

- `404 Not Found`: Cliente não existe

---

#### 📍 `POST /cadastrarcliente`

**Descrição**: Cria um novo cliente.

**Body:**

```json
{
  "nome": "joao",
  "sobrenome": "da silva",
  "nascimento": "01/01/1999",
  "logradouro": "rua teste, 123",
  "bairro": "bairro teste",
  "cep": 17250000,
  "cpf": 12345678900
}
```

**Resposta:**

```json
{
  "message": "Cliente cadastrado com sucesso"
}
```

**Erros comuns:**

- `400`: CPF ja cadastrado

#### 📍 DELETE /deletarcliente/:cpf

**Descrição**: Deleta um cliente a partir do CPF.

**Exemplo de Requisição:**

```http
DELETE /deletarcliente/12345678900
```

**Resposta:**

```json
Copiar código
{
"message": "Cliente deletado com sucesso"
}
```

**Erros comuns:**

- `404 Not Found`: Cliente não encontrado

#### 📍 PUT /updatecliente/:cpf

**Descrição**: Atualiza os dados de um cliente a partir do CPF.

Exemplo de Requisição:

```http
PUT /updatecliente/12345678900
```

**Body:**

```json
{
  "nome": "João Atualizado",
  "logradouro": "Nova rua, 999"
}
```

**Resposta:**

```json
{
  "message": "Cliente atualizado com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Cliente não encontrado

`400 Bad Request`: Dados inválidos

#### 📍 GET /clienteporcpf/:cpf

**Descrição**: Busca um cliente pelo CPF.

**Exemplo de Requisição:**

```http
GET /clienteporcpf/12345678900
```

**Resposta:**

```json
{
  "id": 123,
  "nome": "joao",
  "cpf": 12345678900
}
```

**Erros comuns:**

`404 Not Found`: Cliente não encontrado

#### 📍 GET /clientepornome/:nome

**Descrição:** Busca cliente(s) pelo nome.

**Exemplo de Requisição:**

```http
GET /clientepornome/joao
```

**Resposta:**

```json
{
  "id": 123,
  "nome": "joao",
  "cpf": 12345678900
}
```

**Erros comuns:**

`404 Not Found`: Nenhum cliente com esse nome encontrado

### PARA OS CARROS (/carros)

#### 📍 `GET /visualizarcarro`

**Descrição**: Retorna os dados de todos os carros.

**Exemplo de Requisição:**

```http
GET /visualizarcarro
```

**Resposta de sucesso:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "Vendido": "N"
}
```

**Erros comuns:**

- `404 Not Found`: Carro não existe

---

#### 📍 POST /cadastrarcarro

**Descrição**: Cadastra um novo carro.

**Body:**

```json
{
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Resposta:**

```json
{
  "message": "Carro cadastrado com sucesso"
}
```

**Erros comuns:**

`400 Bad Request`: Placa já cadastrada

---

#### 📍 DELETE /deletarcarro/:placa

**Descrição**: Deleta um carro a partir da placa.

**Exemplo de Requisição:**

```http
DELETE /deletarcarro/abc1234
```

**Resposta:**

```json
{
  "message": "Carro deletado com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Carro não encontrado

---

#### 📍 PUT /updatecarro/:placa

**Descrição**: Atualiza os dados de um carro a partir da placa.

**Exemplo de Requisição:**

```http
PUT /updatecarro/abc1234
```

**Body:**

```json
{
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Resposta:**

```json
{
  "message": "Carro atualizado com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Carro não encontrado

`400 Bad Request`: Dados inválidos

---

#### 📍 GET /carroporplaca/:placa

**Descrição**: Retorna os dados de um carro com base na placa.

**Exemplo de Requisição:**

```http
GET /carroporplaca/abc1234
```

**Resposta:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Erros comuns:**

`404 Not Found`: Carro não encontrado

---

#### 📍 GET /carroporcor/:cor

**Descrição**: Retorna os carros filtrados por cor.

**Exemplo de Requisição:**

```http
GET /carroporcor/branco
```

**Resposta:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Erros comuns:**

`404 Not Found`: Nenhum carro encontrado com essa cor

---

#### 📍 GET /carropormodelo/:modelo

**Descrição**: Retorna os carros filtrados por modelo.

**Exemplo de Requisição:**

```http
GET /carropormodelo/ka
```

**Resposta:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

Erros comuns:

`404 Not Found`: Nenhum carro encontrado com esse modelo

---

#### 📍 GET /carroporkm/:km

**Descrição**: Retorna os carros com base na quilometragem exata.

**Exemplo de Requisição:**

```http
GET /carroporkm/123456
```

Resposta:

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Erros comuns:**

`404 Not Found`: Nenhum carro com essa quilometragem

---

#### 📍 GET /carropormarca/:marca

**Descrição**: Retorna os carros filtrados por marca.

**Exemplo de Requisição:**

```https
GET /carropormarca/ford
```

**Resposta:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Erros comuns:**

`404 Not Found`: Nenhum carro com essa marca

---

#### 📍 GET /carroporvalor/:valor

**Descrição**: Retorna os carros com base no valor exato informado.

**Exemplo de Requisição:**

```http
GET /carroporvalor/15000
```

**Resposta:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Erros comuns:**

`404 Not Found`: Nenhum carro encontrado com esse valor

---

#### 📍 GET /carrovendido/:vendido

**Descrição**: Retorna carros com base no status de venda (S ou N).

**Exemplo de Requisição:**

```http
GET /carrovendido/N
```

**Resposta:**

```json
{
  "id": 123,
  "marca": "ford",
  "modelo": "ka",
  "ano": "2006",
  "placa": "abc1234",
  "cor": "branco",
  "valor": 15000,
  "km": 123456,
  "vendido": "N"
}
```

**Erros comuns:**

`404 Not Found`: Nenhum carro encontrado com esse status de venda

---

### PARA AS VENDAS (/vendas)

#### 📍 GET /visualizarvenda/

**Descrição**: Retorna todas as vendas

```http
GET /visualizarvenda
```

**Resposta:**

```json
{
  "id": 123,
  "valor": "20000",
  "diavenda": "150052024",
  "cpf": "12345678900",
  "placa": "abc1234",
  "vendedor": "Carlos"
}
```

**Erros comuns:**

`404 Not Found`: Venda nao encontrada

---

#### 📍 POST /venda/:placa

**Descrição:** Realiza a venda de um carro com base na placa.

```http
POST /venda/abc1234
```

**Body:**

```json
{
  "cpf": "12345678900",
  "diavenda": "11052025",
  "vendedor": "Carlos",
  "valor": 20000
}
```

**Resposta:**

```json
{
  "message": "Venda realizada com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Carro não encontrado

`400 Bad Request`: Dados inválidos

---

#### 📍 GET /vendaporvendedor/:vendedor

**Descrição**: Retorna as vendas realizadas por um determinado vendedor.

```http
GET /vendaporvendedor/Carlos
```

**Resposta**:

```json
{
  "id": 123,
  "valor": "20000",
  "diavenda": "150052024",
  "cpf": "12345678900",
  "placa": "abc1234",
  "vendedor": "Carlos"
}
```

**Erros comuns:**

`404 Not Found`: Nenhuma venda encontrada para esse vendedor

---

#### 📍 DELETE /deletarvenda/:idvenda

**Descrição**: Deleta uma venda com base no ID.

```http
DELETE /deletarvenda/123
```

**Resposta:**

```json
{
  "message": "Venda deletada com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Venda não encontrada

---

#### 📍 PUT /atualizarvenda/:idvenda

**Descrição**: Atualiza os dados de uma venda com base no ID.

```http
PUT /atualizarvenda/123
```

**Body:**

```json
{
  "valor": 21000,
  "vendedor": "Carlos"
}
```

**Resposta:**

```json
{
  "message": "Venda atualizada com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Venda não encontrada

`400 Bad Request`: Dados inválidos

---

### PARA OS VENDEDORES E GERENTES/ADMINS(/usuarios)

#### 📍GET /listauser

**Descrição**: Exibe todos os vendedores e gerentes

```http
GET /listauser
```

**Resposta**:

```json
{
  "id": 123,
  "usuario": "Carlos",
  "senha": "(a senha é exibida criptografada pelo bcrypt)"
}
```

**Erros comuns:**

`404 Not Found`: usuario nao encontrado

---

#### 📍 `POST /cadastrarvendedor`

**Descrição**: Cadastra um novo vendedor.

```http
POST /cadastrarvendedor
Body:
```

```json
{
  "usuario": "Carlos",
  "senha": "senha123",
  "cargo": "vendedor"
}
```

**Resposta:**

```json
{
  "message": "Vendedor cadastrado com sucesso"
}
```

**Erros comuns:**

`400 Bad Request`: Usuário já existe

`500 Internal Server Error`: Erro no cadastro

---

#### 📍 POST /logar

**Descrição**: Realiza o login de um usuário e gera seu codigo de autenticação.

```http
POST /logar
```

**Body:**

```json
{
  "usuario": "Carlos",
  "senha": "senha123"
}
```

**Resposta:**

```json
{
  "token": "jwt_token_gerado"
}
```

**Erros comuns:**

`401 Unauthorized`: Usuário ou senha inválidos

---

#### 📍 GET /logout

**Descrição**: Faz logout do usuário atual e apaga seu codigo de autenticação.

```http
GET /logout
```

**Resposta**:

```json
{
  "message": "Logout realizado com sucesso"
}
```

#### 📍 GET /usuariologado

**Descrição**: Retorna os dados do usuário autenticado (JWT necessário).

```http
GET /usuariologado
```

**Resposta:**

```json
{
  "id": 123,
  "usuario": "Carlos",
  "cargo": "vendedor"
}
```

**Erros comuns:**

`401 Unauthorized`: Token inválido ou ausente

---

#### 📍 PUT /atualizarusuario/:iduser

`Descrição`: Atualiza os dados de um usuário pelo ID.

```http
PUT /atualizarusuario/123
```

**Body**:

```json
{
  "usuario": "CarlosAtualizado",
  "senha": "novaSenha123"
}
```

**Resposta:**

```json
{
  "message": "Usuário atualizado com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Usuário não encontrado

`400 Bad Request`: Dados inválidos

---

#### 📍 DELETE /deletarusuario/:iduser

**Descrição**: Deleta um usuário pelo ID.

```http
DELETE /deletarusuario/123
```

**Resposta:**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Usuário não encontrado

---

#### 📍 GET /usuariopornome/:usuario

**Descrição**: Retorna um usuário pelo nome.

```http
GET /usuariopornome/Carlos
```

**Resposta:**

```json
{
  "id": 123,
  "usuario": "Carlos",
  "cargo": "vendedor"
}
```

**Erros comuns:**

`404 Not Found`: Usuário não encontrado

---

#### 📍 GET /usuarioporcargo/:cargo

**Descrição**: Lista todos os usuários de um determinado cargo.

```http
GET /usuarioporcargo/vendedor
```

**Resposta:**

```json
{
  "id": 123,
  "usuario": "Carlos",
  "cargo": "vendedor"
}
```

**Erros comuns:**

`404 Not Found`: Nenhum usuário com esse cargo

---

#### 📍 PUT /atualizarcargo

**Descrição**: Atualiza o cargo de um usuário.

```http
PUT /atualizarcargo
```

**Body:**

```json
{
  "id": 123,
  "cargo": "gerente"
}
```

**Resposta:**

```json
{
  "message": "Cargo atualizado com sucesso"
}
```

**Erros comuns:**

`404 Not Found`: Usuário não encontrado

`400 Bad Request`: Cargo inválido

---

## 6. Changelog

### [1.0.0] - 2025-05-28

- Versão inicial lançada
- Adicionados endpoints de criação e consulta de clientes

---
