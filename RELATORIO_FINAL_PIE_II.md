# PIE II · Relatório Final
## Relatório Final do PIE II

Use exatamente as três seções abaixo:

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
No MySQL: SOURCE database/schema.sql; e SOURCE database/seed.sql;
Copiar .env.example para .env e preencher DB_PASSWORD e JWT_SECRET
Terminal 1: npm run api
Terminal 2: npm run dev
Abrir http://localhost:5173
```

#### Usuário de demonstração

| Campo | Informação |
| :--- | :--- |
| **E-mail** | voluntario@exemplo.com |
| **Senha** | conectadoa123 |

---

### 3. O que funciona e o que ficou pendente

| Funciona | Pendente |
| :--- | :--- |
| Login com usuário de demonstração e botão Sair | Edição e exclusão de crianças cadastradas pela interface |
| Rotas da API protegidas (401 sem token ou token inválido) | Filtro de busca de crianças por nome ou oficina |
| Listagem e cadastro de crianças beneficiárias com token JWT | Mensagem mais clara na interface quando o token expira |
| Listagem de oficinas socioeducativas integradas ao backend | Formulário para registro de novas oficinas pela aplicação |
| Senhas guardadas como hash seguro bcrypt (tabela usuario e seed) | Layout da listagem de crianças em telas muito pequenas de celular |
