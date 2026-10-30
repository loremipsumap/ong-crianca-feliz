-- =====================================================================
-- Projeto Integrador Extensionista II · Atividade 2
-- ONG Criança Feliz · schema.sql
-- =====================================================================

SET NAMES utf8mb4;
DROP DATABASE IF EXISTS ong_crianca_feliz;
CREATE DATABASE ong_crianca_feliz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ong_crianca_feliz;

-- ---------------------------------------------------------------------
-- 1. Tabela: responsavel
-- Armazena os pais ou responsáveis legais pelas crianças atendidas
-- ---------------------------------------------------------------------
CREATE TABLE responsavel (
    id_responsavel INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 2. Tabela: crianca
-- Beneficiários diretos dos projetos sociais da ONG
-- ---------------------------------------------------------------------
CREATE TABLE crianca (
    id_crianca INT AUTO_INCREMENT PRIMARY KEY,
    id_responsavel INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    data_nascimento DATE NOT NULL,
    genero VARCHAR(25) NOT NULL CHECK (genero IN ('Masculino', 'Feminino', 'Outro', 'Prefiro nao informar')),
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel)
);

-- ---------------------------------------------------------------------
-- 3. Tabela: oficina
-- Atividades socioeducativas, reforço escolar, artes e esportes
-- ---------------------------------------------------------------------
CREATE TABLE oficina (
    id_oficina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INT NOT NULL CHECK (carga_horaria > 0),
    vagas_maximas INT NOT NULL CHECK (vagas_maximas > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'ativa' CHECK (status IN ('ativa', 'encerrada', 'planejada'))
);

-- ---------------------------------------------------------------------
-- 4. Tabela Associativa (N:N): matricula_oficina
-- Relacionamento N:N entre crianca e oficina com chave primária composta
-- ---------------------------------------------------------------------
CREATE TABLE matricula_oficina (
    id_crianca INT NOT NULL,
    id_oficina INT NOT NULL,
    data_matricula DATE NOT NULL,
    status_participacao VARCHAR(20) NOT NULL DEFAULT 'ativa' CHECK (status_participacao IN ('ativa', 'concluida', 'cancelada')),
    PRIMARY KEY (id_crianca, id_oficina),
    FOREIGN KEY (id_crianca) REFERENCES crianca (id_crianca) ON DELETE CASCADE,
    FOREIGN KEY (id_oficina) REFERENCES oficina (id_oficina) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 5. Tabela: doador
-- Pessoas físicas e apoiadores da causa
-- ---------------------------------------------------------------------
CREATE TABLE doador (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- 6. Tabela: doacao
-- Doações financeiras recebidas para a manutenção dos projetos
-- ---------------------------------------------------------------------
CREATE TABLE doacao (
    id_doacao INT AUTO_INCREMENT PRIMARY KEY,
    id_doador INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
    data_doacao DATE NOT NULL,
    forma_pagamento VARCHAR(30) NOT NULL CHECK (forma_pagamento IN ('PIX', 'Boleto', 'Cartao de Credito', 'Transferencia')),
    FOREIGN KEY (id_doador) REFERENCES doador (id_doador)
);
