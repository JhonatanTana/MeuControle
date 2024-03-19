CREATE DATABASE MeuControle

CREATE TABLE tb_user (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(32) NOT NULL,
    permission varchar(50) NOT NULL
)

INSERT INTO `tb_user`(`username`, `password`, `permission`) VALUES ('admin',md5('admin'),'administrator')

