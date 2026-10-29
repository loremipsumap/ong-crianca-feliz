# ONG Criança Feliz - Portal Integrado

> **Projeto Integrador Extensionista II · Atividade 1**  
> *Esqueleto no GitHub e Start do Vite+ com API Express*

---

## 📌 Sobre o Projeto

A **ONG Criança Feliz** é uma iniciativa social voltada ao acolhimento, desenvolvimento educacional e apoio psicossocial a crianças em situação de vulnerabilidade. 

Este repositório contém a base estrutural (esqueleto) da aplicação web, integrando um frontend construído com **Vite+ (Vanilla JavaScript)** e um backend construído com **Node.js e Express**, consumindo a rota de verificação de integridade (`GET /api/health`) por meio de um proxy reverso configurado no Vite.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** [Vite+](https://viteplus.dev/) / [Vite](https://vite.dev/), JavaScript (Vanilla ES Modules), HTML5, CSS3 Moderno
- **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [dotenv](https://www.npmjs.com/package/dotenv)
- **Versionamento:** Git e GitHub

---

## 📁 Estrutura de Diretórios

```text
├── public/              # Arquivos estáticos (favicon, ícones)
├── server/
│   └── index.js         # Servidor Express com a rota /api/health
├── src/
│   ├── assets/          # Imagens e vetores
│   ├── main.js          # Consumo da API e renderização dinâmica
│   └── style.css        # Estilos modernos da interface
├── .env.example         # Exemplo de variáveis de ambiente
├── .gitignore           # Arquivos e diretórios ignorados pelo Git
├── index.html           # Página inicial da aplicação
├── package.json         # Scripts de execução e dependências
├── vite.config.ts       # Configuração do Vite e proxy reverso para /api
└── README.md            # Documentação e instruções de execução
```

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Gerenciador de pacotes `npm` ou `pnpm`
- [Git](https://git-scm.com/)

---

## 🛠️ Instruções para Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

### 1. Clonar o repositório

```bash
git clone https://github.com/loremipsumap/ong-crianca-feliz.git
cd ong-crianca-feliz
```

### 2. Instalar as dependências

Execute no terminal:

```bash
npm install
```
*(ou `pnpm install` se utilizar o Vite+ / pnpm)*

### 3. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do modelo `.env.example`:

```bash
cp .env.example .env
```

*(No Windows PowerShell, use `copy .env.example .env`)*

O arquivo `.env` conterá a porta padrão da API Express:
```env
PORT=3001
```

### 4. Iniciar a API Express (Backend)

Em um terminal, execute:

```bash
npm run api
```

O servidor da API iniciará em: `http://localhost:3001`

### 5. Iniciar o Servidor Vite (Frontend)

Abra um **segundo terminal** e execute:

```bash
npm run dev
```

O frontend estará disponível em: **`http://localhost:5173`**

Abra o endereço acima no navegador para visualizar a página inicial exibindo:
- **Status da API: ok**
- Data e hora atualizadas da resposta do servidor.

---

## 📡 Rotas da API

| Método | Endpoint | Descrição | Exemplo de Resposta |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Verifica a saúde e status da API | `{"status":"ok","timestamp":"2026-10-29T23:13:14.849Z"}` |

---

## 👥 Autor

Desenvolvido por **André Pazinato**  
*Projeto Integrador Extensionista II*
