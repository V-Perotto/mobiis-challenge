# Desafio Técnico para Desenvolvedor Back-End - Mobiis

<p align="center">
  <img src="./mobiis_logo.jpeg" alt="Mobiis Logo" width="200">
</p>

## 📍 Objetivo
Criar uma _API_ simples para gerenciar usuários, usando autenticação.

## 📜 Sumário

1. [🧰 Ferramentas](#-ferramentas)
2. [🔙 Acessando e criando o Backend](#-acessando-e-criando-o-backend)
3. [🐋 Usando Docker](#-usando-docker)

## 🧰 Ferramentas
O seguinte desafio foi realizado com as seguintes ferramentas e SO:

![Linux](https://img.shields.io/badge/Linux%20-%20black?logo=linux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js%20-%20black?logo=node.js&logoColor=green)
![TypeScript](https://img.shields.io/badge/TypeScript-white?logo=typescript&logoColor=blue)
![MongoDB](https://img.shields.io/badge/MongoDB%20-%20black?logo=mongodb&logoColor=%2336f763%20)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&logoColor=white)

## 🔙 Acessando e criando a API

### Variáveis de ambiente

Crie um arquivo `.env` para suas variáveis de ambiente que contenham os seguintes dados:

#### Caso você esteja usando Windows, pule para a parte de escrita do arquivo.

Abra o terminal e crie o arquivo:

```bash
$ touch .env
$ vim .env  # OU nano .env
```

Então escreva e salve:

```bash
MONGODB_URI=<sua_url_do_mongo>
MONGO_PORT=<sua_porta_do_mongo>
PORT=<sua_porta_da_api>
JWT_SECRET=<seu_segredo_jwt_aqui>
MONGO_ROOT_USER=<seu_usuario_root>
MONGO_ROOT_PASSWORD=<senha_do_seu_usuario_root>
```

> Exemplo:
> ```bash
> MONGODB_URI=mongodb://localhost:27017/mobiis-db
> MONGO_PORT=27017
> PORT=3000
> JWT_SECRET=secret_here
> MONGO_ROOT_USER=root
> MONGO_ROOT_PASSWORD=password
> ```

Depois continue com o processo de instalação e execução do sistema

```bash
$ pnpm install  # ou somente 'pnpm i'
$ pnpm run build
$ pnpm run start
```

## 🐋 Usando Docker

### Usando a partir do Dockerfile:

Rode no terminal para construir a imagem:

```bash
$ docker build -t mobiis-challenge .
```

E rode o container:

```bash
$ docker run -p <sua_porta_da_api>:<sua_porta_da_api> --env-file .env mobiis-challenge
```

> Exemplo:
> ```bash
> $ docker run -p 3000:3000 --env-file .env mobiis-challenge
> ```

### Usando a partir do Docker Compose

Rode no terminal:

```bash
$ docker compose up --build
```