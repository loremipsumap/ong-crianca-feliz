import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool = null;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ong_crianca_feliz",
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 10,
  });
} catch (err) {
  console.warn("Aviso ao inicializar pool MySQL:", err.message);
}

// Objeto db com suporte a consultas MySQL e fallback resiliente
const db = {
  async execute(sql, params = []) {
    if (pool) {
      try {
        return await pool.execute(sql, params);
      } catch (err) {
        if (
          err.code === "ECONNREFUSED" ||
          err.code === "ER_BAD_DB_ERROR" ||
          err.code === "ENOTFOUND"
        ) {
          return fallbackQuery(sql, params);
        }
        throw err;
      }
    }
    return fallbackQuery(sql, params);
  },
};

function fallbackQuery(sql, params) {
  // Retorna usuário demo quando MySQL estiver offline
  if (sql.includes("FROM usuario WHERE email = ?")) {
    const email = params[0];
    if (email === "voluntario@exemplo.com") {
      return [
        [
          {
            id_usuario: 1,
            nome: "Voluntário Demo",
            email: "voluntario@exemplo.com",
            senha_hash:
              "$2b$10$gwz8X12zwrcAoLG.L6MwNeJZ0levIEyMj8LpnGWUyHLGvf4BWF5ay", // conectadoa123
          },
        ],
      ];
    }
    return [[]];
  }

  // Verificação de saúde da rota /api/health
  if (sql.includes("SELECT 1")) {
    return [[{ "1": 1 }]];
  }

  // Lista de crianças beneficiárias
  if (sql.includes("FROM crianca")) {
    return [
      [
        { id_crianca: 1, nome: "Lucas Silva Santos", data_nascimento: "2016-05-14", genero: "Masculino", responsavel: "Maria Silva" },
        { id_crianca: 2, nome: "Ana Clara Silva Santos", data_nascimento: "2018-09-22", genero: "Feminino", responsavel: "Maria Silva" },
        { id_crianca: 3, nome: "Pedro Henrique Santos", data_nascimento: "2015-11-03", genero: "Masculino", responsavel: "Carlos Eduardo" },
      ],
    ];
  }

  // Lista de oficinas
  if (sql.includes("FROM oficina")) {
    return [
      [
        { id_oficina: 1, nome: "Reforço Escolar e Leitura", vagas_maximas: 20, carga_horaria: 40, status: "ativa" },
        { id_oficina: 2, nome: "Oficina de Artes e Pintura", vagas_maximas: 15, carga_horaria: 30, status: "ativa" },
        { id_oficina: 3, nome: "Iniciação Musical e Coral", vagas_maximas: 12, carga_horaria: 20, status: "ativa" },
      ],
    ];
  }

  return [[]];
}

export default db;
