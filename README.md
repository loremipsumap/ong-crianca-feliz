# ONG Criança Feliz

Sistema integrado para gestão de acolhimento, oficinas e beneficiários de ONGs de apoio à infância.  
Projeto Integrador Extensionista II.

Cadastro de crianças, acompanhamento de oficinas e login autenticado de voluntários.  
Roda em ambiente local: frontend com Vite+, API com Node.js e Express, banco MySQL.

---

## ⚙️ Pré-requisitos

- Node.js 20 ou mais recente
- Gerenciador de pacotes `npm` ou `pnpm`
- MySQL 8 instalado e rodando na máquina (opcional para testes rápidos graças ao fallback de demonstração)
- Git

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório e entrar na pasta:
```bash
git clone https://github.com/loremipsumap/ong-crianca-feliz.git
cd ong-crianca-feliz
```

### 2. Instalar as dependências:
```bash
npm install
```

### 3. Criar o banco e os dados de exemplo no MySQL:
No cliente do MySQL (`mysql -u root -p`):
```sql
SOURCE database/schema.sql;
SOURCE database/seed.sql;
```
*(Também funciona executando os dois arquivos no MySQL Workbench, DBeaver ou HeidiSQL).*

### 4. Configurar as variáveis de ambiente:
Copie o arquivo `.env.example` para `.env`:
```bash
# No Windows PowerShell:
Copy-Item .env.example .env
```
*(O arquivo `.env` já contém as credenciais locais e a chave `JWT_SECRET`).*

### 5. Iniciar a API (Backend):
Em um terminal:
```bash
npm run api
```
A API iniciará em: `http://localhost:3001`

### 6. Iniciar o Frontend:
Em outro terminal:
```bash
npm run dev
```
O frontend estará acessível em: `http://localhost:5173`

### 7. Acessar a aplicação:
Abra **`http://localhost:5173`** no seu navegador e entre com o usuário de demonstração.

---

## 👤 Usuário de demonstração

| Campo | Valor |
| :--- | :--- |
| **E-mail** | `voluntario@exemplo.com` |
| **Senha** | `conectadoa123` |

Para trocar a senha, gere um novo hash com `node server/gerar-hash.js NOVA_SENHA` e atualize o valor no `database/seed.sql`.

---

## 🔑 Variáveis de ambiente

| Variável | Para que serve |
| :--- | :--- |
| `PORT` | Porta da API Express (padrão `3001`) |
| `DB_HOST`, `DB_PORT` | Endereço do banco de dados (padrão `127.0.0.1:3306`) |
| `DB_USER`, `DB_PASSWORD` | Usuário e senha do MySQL |
| `DB_NAME` | Nome do banco de dados (`ong_crianca_feliz`) |
| `JWT_SECRET` | Chave secreta que assina e valida os tokens JWT |
| `JWT_EXPIRES_IN` | Validade do token de autenticação (padrão `8h`) |

---

## 📡 Rotas da API

| Método | Rota | Exige Token JWT? | Descrição |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/health` | Não | Verificação de integridade da API |
| `POST` | `/api/auth/login` | Não | Autentica e devolve o token JWT |
| `GET` | `/api/criancas` | **Sim (Bearer)** | Lista de crianças beneficiárias |
| `POST` | `/api/criancas` | **Sim (Bearer)** | Cadastro de nova criança |
| `GET` | `/api/oficinas` | **Sim (Bearer)** | Lista de oficinas e atividades |

Testes manuais de cada endpoint estão documentados no arquivo `api.http`.

---

## 💾 Backup do banco de dados

Para gerar backup:
```bash
mysqldump -u root -p ong_crianca_feliz > backup.sql
```

Para restaurar no PowerShell:
```powershell
Get-Content backup.sql | mysql -u root -p ong_crianca_feliz
```

---

## 📁 Estrutura do Projeto

```text
database/
  schema.sql            # Definição das tabelas, chaves e restrições
  seed.sql              # Dados iniciais e usuário de demonstração
server/
  auth.js               # Rota de login e middleware de autenticação JWT
  db.js                 # Conexão com MySQL
  gerar-hash.js         # Utilitário para gerar hash bcrypt
  index.js              # Servidor Express e definição de rotas
  validacao.js          # Validação de credenciais de login
  routes/
    criancas.js         # Rotas de crianças beneficiárias
    oficinas.js         # Rotas de oficinas socioeducativas
src/
  api.js                # Cliente HTTP central com envio de token
  main.js               # Roteamento entre login e sistema
  style.css             # Estilização limpa e responsiva
  ui.js                 # Utilitários de interface
  pages/
    login.js            # Tela de login
    criancas.js         # Gestão de crianças
    oficinas.js         # Listagem de oficinas
```
