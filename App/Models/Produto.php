<?php

namespace App\Models;

use MF\Model\Model;

class Produto extends Model {

    private $id;
    private $produto;
    private $preco;
    private $categoria_id;
    private $disponibilidade;

    public function __get($atributo){
        return $this->$atributo;
    }
    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function recuperaProduto() {
        $query = 'SELECT p.id, p.produto, p.preco, c.categoria, p.disponibilidade FROM tb_produtos p JOIN tb_categoria c ON p.categoria_id = c.id';
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $produtos = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $groupedProdutos = [];

        foreach ($produtos as $produto) {
            $groupedProdutos[$produto['categoria']][] = $produto;
        }

        return $groupedProdutos;
    }

    public function novoproduto() {
        $query = 'INSERT INTO tb_produtos (produto, preco, categoria_id, disponibilidade) VALUES (:produto, :preco, :categoria, :disponibilidade)';
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(':produto', $this->__get('produto'));
        $stmt->bindValue(':preco', $this->__get('preco'));
        $stmt->bindValue(':categoria', $this->__get('categoria'));
        $stmt->bindValue(':disponibilidade', true);
        $stmt->execute();
    }

    public function desabilitaproduto() {

        $query = 'UPDATE tb_produtos SET disponibilidade = :disponibilidade WHERE id = :id';
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':disponibilidade', $this->__get('disponibilidade'));
        $stmt->bindValue(':id', $this->__get('id'));
        $stmt->execute();
    }
}