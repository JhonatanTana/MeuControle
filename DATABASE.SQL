CREATE DATABASE MeuControle;

USE meucontrole;

CREATE TABLE tb_user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(32) NOT NULL,
    permission varchar(50) NOT NULL
);

INSERT INTO tb_user(username, password, permission) VALUES ('admin',md5('admin'),'administrator');

CREATE TABLE tb_categoria (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    categoria varchar(100) NOT NULL UNIQUE,
    disponibilidade boolean NOT NULL
);

INSERT INTO tb_categoria (categoria, disponibilidade) VALUES ('Espetos',true);
INSERT INTO tb_categoria (categoria, disponibilidade) VALUES('Bebidas',true);

CREATE TABLE tb_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    produto VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria_id INT NOT NULL,
    disponibilidade BOOLEAN NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES tb_categoria (id)
);

INSERT INTO tb_produtos (produto, preco, categoria_id, disponibilidade) VALUES ('Espeto De Boi','8.00','1',true);
INSERT INTO tb_produtos (produto, preco, categoria_id, disponibilidade) VALUES('Espeto de Porco','7.00','1',true);
INSERT INTO tb_produtos (produto, preco, categoria_id, disponibilidade) VALUES ('Coca Cola','8.50','2',true);
INSERT INTO tb_produtos (produto, preco, categoria_id, disponibilidade) VALUES ('Fanta Laranja','7.50','2',true);
