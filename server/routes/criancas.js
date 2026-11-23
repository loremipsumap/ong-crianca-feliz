import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/criancas (Rota protegida)
router.get("/", async (req, res) => {
  try {
    const [linhas] = await db.execute(
      "SELECT c.id_crianca, c.nome, c.data_nascimento, c.genero, r.nome AS responsavel " +
      "FROM crianca c LEFT JOIN responsavel r ON c.id_responsavel = r.id_responsavel"
    );
    res.json(linhas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar crianças: " + err.message });
  }
});

// POST /api/criancas (Rota protegida)
router.post("/", async (req, res) => {
  const { nome, id_responsavel, data_nascimento, genero } = req.body;
  if (!nome || !data_nascimento) {
    return res.status(400).json({ erro: "Nome e data de nascimento são obrigatórios" });
  }
  try {
    const [resultado] = await db.execute(
      "INSERT INTO crianca (id_responsavel, nome, data_nascimento, genero) VALUES (?, ?, ?, ?)",
      [id_responsavel || 1, nome, data_nascimento, genero || "Outro"]
    );
    res.status(201).json({ id_crianca: resultado.insertId, nome });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar criança: " + err.message });
  }
});

export default router;
