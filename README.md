# 📝 Task Control API

Bem-vindo ao **Task Control API**, um sistema de gerenciamento de tarefas desenvolvido com **NestJS**, com autenticação, organização por categorias e controle de status. Essa API tem como objetivo facilitar o planejamento e acompanhamento de atividades do dia a dia ou de projetos.

## 📚 Sobre o projeto

Essa API permite que usuários se cadastrem, façam login e gerenciem suas tarefas. Cada tarefa pode ser classificada por **categorias** e ter seu **status atualizado** conforme o andamento:

- **Não iniciada**
- **Em andamento**
- **Concluída**

O sistema é ideal para aplicações de produtividade, controle de fluxo de trabalho ou qualquer aplicação que envolva o gerenciamento de atividades.

---

## 🚀 Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Criação, edição, exclusão e listagem de tarefas
- Organização das tarefas por categorias
- Atualização de status das tarefas
- Proteção de rotas com autenticação

---

## 🛠️ Tecnologias utilizadas

- **NestJS** – Framework para construir APIs robustas com Node.js
- **TypeORM** – ORM para integração com banco de dados
- **PostgreSQL** – Banco de dados relacional
- **JWT** – Autenticação via tokens
- **Bcrypt** – Criptografia de senhas
- **Class Validator** – Validação de dados via DTOs

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Banco de dados PostgreSQL
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/task-control-api.git
cd task-control-api
