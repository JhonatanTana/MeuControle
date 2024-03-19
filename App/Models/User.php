<?php

namespace App\Models;

use MF\Model\Model;

class User extends Model {
    private $id;
    private $username;
    private $password;

    private $permission;

    public function __get($atributo){
        return $this->$atributo;
    }
    public function __set($atributo, $valor){
        $this->$atributo = $valor;
    }

    public function auth() {
        $query = 'SELECT id, username, permission FROM tb_user WHERE username = :username AND password = :password';
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':username', $this->__get('username'));
        $stmt->bindValue(':password', $this->__get('password'));
        $stmt->execute();

        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($user['id'] != '' && $user['username'] != '' && $user['permission'] != '') {
            $this->__set('id',$user['id']);
            $this->__set('username',$user['username']);
            $this->__set('permission',$user['permission']);
        }

        return $user;
    }

    public function restoreUsername() {
        $query = 'SELECT username FROM tb_user WHERE id = :user_id';
        $stmt=$this->db->prepare($query);
        $stmt->bindValue('user_id', $this->__get('id'));
        $stmt->execute();

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}