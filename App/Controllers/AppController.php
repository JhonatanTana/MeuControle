<?php

namespace App\Controllers;

use http\Header;
use MF\Controller\Action;
use MF\Model\Container;

class AppController extends Action {
    public function dashboard() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->view->nome = ucfirst($_SESSION['username']);
            $this->render('dashboard');
        }else {
            header('Location:/?login=error');
        }
    }
    public function mesas() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->view->nome = ucfirst($_SESSION['username']);
            $this->render('mesas');
        }else {
            header('Location:/?login=error');
        }
    }
    public function cardapio() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $produto = Container::getModel('Produto');
            $categoria = Container::getModel('Categoria');
            $this->view->nome = ucfirst($_SESSION['username']);
            $this->view->categorias = $categoria -> recuperaCategoria();
            $this->view->produtos = $produto -> recuperaProduto();
            $this->view->cadastro = isset($_GET['cadastro']) ? $_GET['cadastro'] : '';

            $this->render('cardapio');
        }else {
            header('Location:/?login=error');
        }
    }
    public function historico() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->view->nome = ucfirst($_SESSION['username']);
            $this->render('historico');
        }else {
            header('Location:/?login=error');
        }
    }
    public function settings() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->view->nome = ucfirst($_SESSION['username']);
            $this->render('settings');
        }else {
            header('Location:/?login=error');
        }
    }

    public function novacategoria() {
        session_start();

        if ($_SESSION['permission'] == 'administrator') {
            $categoria = Container::getModel('Categoria');
            $categoria->__set('categoria',ucfirst($_POST['categoria']));
            $categoria->novacategoria();

            header('Location: /cardapio?cadastro=success');
        }else {
            echo '<script> alert("Você não possui permissão")</script>';
            header('Location:/');
        }
    }

    public function novoproduto() {
        session_start();

        if ($_SESSION['permission'] == 'administrator') {
            $produto = Container::getModel('Produto');
            $produto -> __set('produto', ucwords($_POST['produto']));
            $produto -> __set('preco', $_POST['preco']);
            $produto -> __set('categoria', $_POST['categoria']);
            $produto -> novoproduto();

            header('Location: /cardapio?cadastro=success');
        }else {
            echo '<script> alert("Você não possui permissão")</script>';
            header('Location:/');
        }
    }

    public function desabilitaproduto() {

        $produto = Container::getModel('Produto');
        $produto -> __set('disponibilidade', $_GET['disponibilidade']);
        $produto -> __set('id', $_GET['produto']);
        $produto -> desabilitaproduto();

        header('Location:/cardapio');
    }
}