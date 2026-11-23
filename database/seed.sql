-- =====================================================================
-- ONG Criança Feliz · seed.sql
-- Dados iniciais para demonstração e testes do MVP
-- =====================================================================

SET NAMES utf8mb4;
USE ong_crianca_feliz;

-- ---------------------------------------------------------------------
-- Usuário de demonstração
-- E-mail: voluntario@exemplo.com
-- Senha:  conectadoa123
-- ---------------------------------------------------------------------
INSERT INTO usuario (nome, email, senha_hash) VALUES
('Voluntário Demo', 'voluntario@exemplo.com', '$2b$10$gwz8X12zwrcAoLG.L6MwNeJZ0levIEyMj8LpnGWUyHLGvf4BWF5ay');

-- ---------------------------------------------------------------------
-- Dados de teste: Responsáveis
-- ---------------------------------------------------------------------
INSERT INTO responsavel (nome, telefone, email) VALUES
('Maria Aparecida Silva', '(11) 98765-4321', 'maria.silva@exemplo.com'),
('Carlos Eduardo Santos', '(11) 91234-5678', 'carlos.santos@exemplo.com');

-- ---------------------------------------------------------------------
-- Dados de teste: Crianças atendidas
-- ---------------------------------------------------------------------
INSERT INTO crianca (id_responsavel, nome, data_nascimento, genero) VALUES
(1, 'Lucas Silva Santos', '2016-05-14', 'Masculino'),
(1, 'Ana Clara Silva Santos', '2018-09-22', 'Feminino'),
(2, 'Pedro Henrique Santos', '2015-11-03', 'Masculino');

-- ---------------------------------------------------------------------
-- Dados de teste: Oficinas e Projetos
-- ---------------------------------------------------------------------
INSERT INTO oficina (nome, descricao, carga_horaria, vagas_maximas, status) VALUES
('Reforço Escolar e Leitura', 'Apoio pedagógico em alfabetização e matemática', 40, 20, 'ativa'),
('Oficina de Artes e Pintura', 'Expressão artística e trabalhos manuais', 30, 15, 'ativa'),
('Iniciação Musical e Coral', 'Musicalização e canto coral infantil', 20, 12, 'ativa');

-- ---------------------------------------------------------------------
-- Dados de teste: Matrículas (N:N)
-- ---------------------------------------------------------------------
INSERT INTO matricula_oficina (id_crianca, id_oficina, data_matricula, status_participacao) VALUES
(1, 1, '2026-02-10', 'ativa'),
(2, 2, '2026-02-12', 'ativa'),
(3, 1, '2026-02-15', 'ativa'),
(3, 3, '2026-02-15', 'ativa');

-- ---------------------------------------------------------------------
-- Dados de teste: Doadores e Doações
-- ---------------------------------------------------------------------
INSERT INTO doador (nome, email, telefone) VALUES
('Instituto Apoio Social', 'contato@apoiosocial.org.br', '(11) 3344-5566'),
('Roberto de Almeida', 'roberto.almeida@exemplo.com', '(11) 99112-2334');

INSERT INTO doacao (id_doador, valor, data_doacao, forma_pagamento) VALUES
(1, 2500.00, '2026-03-01', 'PIX'),
(2, 350.00, '2026-03-10', 'Cartao de Credito');
