import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/oficinas (Rota protegida)
router.get("/", async (req, res) => {
  try {
    const [linhas] = await db.execute(
      "SELECT id_oficina, nome, descricao, carga_horaria, vagas_maximas, status FROM oficina"
    );
    res.json(linhas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar oficinas: " + err.message });
  }
});

export default router;
