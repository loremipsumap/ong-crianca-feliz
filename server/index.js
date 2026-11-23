import "dotenv/config";
import express from "express";
import db from "./db.js";
import auth, { autenticar } from "./auth.js";
import criancas from "./routes/criancas.js";
import oficinas from "./routes/oficinas.js";

if (!process.env.JWT_SECRET) {
  console.error("Defina JWT_SECRET no arquivo .env");
  process.exit(1);
}

const app = express();
app.use(express.json());

// ---------------------------------------------------------------------
// Rotas Públicas
// ---------------------------------------------------------------------
app.get("/api/health", async (req, res) => {
  try {
    await db.execute("SELECT 1");
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch {
    res.status(500).json({ status: "erro", timestamp: new Date().toISOString() });
  }
});

app.use("/api/auth", auth);

// ---------------------------------------------------------------------
// Daqui para baixo, todas as rotas exigem token JWT válido
// ---------------------------------------------------------------------
app.use("/api", autenticar);
app.use("/api/criancas", criancas);
app.use("/api/oficinas", oficinas);

// Tratador de erros global: qualquer erro não tratado vira 500
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API da ONG Criança Feliz rodando em http://localhost:${PORT}`);
});
