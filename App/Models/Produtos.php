<?php

namespace App\Models;

use MF\Model\Model;

class Produtos extends Model {

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
        $query = 'SELECT produto, preco, categoria_id, disponibilidade FROM tb_produtos';
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        $produto = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $produto;
    }

}