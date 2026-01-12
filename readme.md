# 💸 Sistema de Reembolso - API (Backend)

Esta é a API RESTful responsável por gerenciar as regras de negócio, autenticação e banco de dados do Sistema de Reembolso Corporativo. Desenvolvida com **Node.js** e **Express**, utilizando **Prisma ORM** e banco de dados **SQLite**.

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## 🚀 Funcionalidades

- **Autenticação JWT**: Geração e validação de tokens seguros.
- **Criptografia**: Senhas salvas com hash (Bcrypt).
- **RBAC (Controle de Acesso)**: Middlewares para verificar permissões de usuário (`manager` vs `employee`).
- **CRUD de Usuários**: Criação e listagem (protegida).

---

## 🛠️ Tecnologias

- **[Node.js](https://nodejs.org/)** - Ambiente de execução.
- **[Express](https://expressjs.com/)** - Framework web.
- **[Prisma](https://www.prisma.io/)** - ORM para banco de dados.
- **[SQLite](https://www.sqlite.org/)** - Banco de dados local (arquivo).
- **[JSON Web Token](https://jwt.io/)** - Autenticação stateless.

---

## 📦 Como rodar o projeto

### Pré-requisitos
- Node.js instalado.
- Gerenciador de pacotes (NPM ou Yarn).

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio-api.git](https://github.com/seu-usuario/seu-repositorio-api.git)