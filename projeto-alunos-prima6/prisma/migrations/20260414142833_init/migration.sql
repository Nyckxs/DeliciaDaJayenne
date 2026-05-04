/*
  Warnings:

  - You are about to drop the `alunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `alunos`;

-- CreateTable
CREATE TABLE `confeitaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `produto` VARCHAR(191) NOT NULL,
    `cpf` INTEGER NOT NULL,
    `telefone` INTEGER NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `numeroCasa` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `confeitaria_email_key`(`email`),
    UNIQUE INDEX `confeitaria_cpf_key`(`cpf`),
    UNIQUE INDEX `confeitaria_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
