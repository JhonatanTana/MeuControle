CREATE DATABASE MeuControle;

CREATE TABLE tb_user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(32) NOT NULL,
    permission varchar(50) NOT NULL
);

INSERT INTO `tb_user`(`username`, `password`, `permission`) VALUES ('admin',md5('admin'),'administrator');

CREATE TABLE tb_categoria (
    id INT AUTO_INCREMENT,
    categoria varchar(100),
    disponibilidade boolean NOT NULL,
    PRIMARY KEY (id, categoria)
);

INSERT INTO `tb_categoria`(`categoria`, `disponibilidade`) VALUES ('Espetos','true');
INSERT INTO `tb_categoria`(`categoria`, `disponibilidade`) VALUES ('Bebidas','true')

CREATE TABLE tb_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    produto varchar(100) NOT NULL,
    preco float NOT NULL,
    categoria INT NOT NULL,
    disponibilidade boolean NOT NULL,
    FOREIGN KEY (categoria) REFERENCES tb_categoria(categoria)
);

INSERT INTO `tb_produtos`(`produto`, `preco`, `categoria`, `disponibilidade`) VALUES ('espeto de boi','8.00','Espetos',true);
INSERT INTO `tb_produtos`(`produto`, `preco`, `categoria`, `disponibilidade`) VALUES ('espeto de porco','7.00','Espetos',true);
INSERT INTO `tb_produtos`(`produto`, `preco`, `categoria`, `disponibilidade`) VALUES ('coca cola','8.50','bebidas',true);
INSERT INTO `tb_produtos`(`produto`, `preco`, `categoria`, `disponibilidade`) VALUES ('fanta laranja','7.50','bebidas',true);