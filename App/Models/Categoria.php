<?php

namespace App\Models;

use MF\Model\Model;

class Categoria extends Model {
    private $categoria;
    private $disponibilidade;

    public function __get($atributo){
        return $this->$atributo;
    }
    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }
    public function novacategoria() {
        $query='INSERT INTO tb_categoria (categoria, disponibilidade) VALUES ( :categoria, :disponibilidade)';
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(':categoria', $this->__get('categoria'));
        $stmt->bindValue(':disponibilidade', true);
        $stmt->execute();
    }

    public function recuperaCategoria() {
        $query='SELECT id, categoria FROM tb_categoria  WHERE disponibilidade = 1';
        $stmt=$this->db->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}