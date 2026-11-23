# PIE II · Relatório Final

## Relatório Final do PIE II

---

### 1. Identificação

| Campo | Informação |
| :--- | :--- |
| **Seu Nome Completo** | André Vitor Moreira Pazinato |
| **ONG/Empresa** | ONG Criança Feliz |
| **Link do repositório** | https://github.com/loremipsumap/ong-crianca-feliz |

---

### 2. Como rodar o projeto

```bash
git clone https://github.com/loremipsumap/ong-crianca-feliz.git && cd ong-crianca-feliz
npm install
No MySQL: SOURCE database/schema.sql;
Copiar .env.example para .env
Terminal 1: npm run api
Terminal 2: npm run dev
Abrir http://localhost:5173
```

#### Usuário de demonstração

| Campo | Informação |
| :--- | :--- |
| **E-mail** | Não aplicável (versão focada em infraestrutura, rota de saúde e banco) |
| **Senha** | Não aplicável |

---

### 3. O que funciona e o que ficou pendente

| Funciona | Pendente |
| :--- | :--- |
| Servidor Express com rota `GET /api/health` retornando status e timestamp em JSON | Conexão do backend Express com o MySQL (via driver ou ORM) |
| Frontend em Vite+ consumindo a API Express através do proxy reverso configurado | Rotas de CRUD para manipulação de crianças, responsáveis e oficinas |
| Interface web com exibição do status da conexão e resposta JSON em tempo real | Sistema de autenticação (login/senha) com tokens JWT |
| Modelagem relacional completa em `database/schema.sql` com PK, FK, CHECK e CASCADE | Formulários e telas de cadastro de beneficiários no frontend |
| Configuração de variáveis de ambiente com `.env` protegido no `.gitignore` | Controle de permissões e rotas protegidas (401 sem autenticação) |
