<?php

namespace App\Controllers;

use MF\Controller\Action;
use MF\Model\Container;

class AppController extends Action {
    public function dashboard() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->render('dashboard');
        }else {
            header('Location:/?login=error');
        }
    }
    public function mesas() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->render('mesas');
        }else {
            header('Location:/?login=error');
        }
    }
    public function cardapio() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $produto = Container::getModel('Produtos');
            $this->view->produtos = $produto -> recuperaProduto();

            $this->render('cardapio');
        }else {
            header('Location:/?login=error');
        }
    }
    public function historico() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->render('historico');
        }else {
            header('Location:/?login=error');
        }
    }
    public function settings() {

        session_start();
        if ($_SESSION['id'] != '' && $_SESSION['username'] != '' && $_SESSION['permission'] != '') {

            $this->render('settings');
        }else {
            header('Location:/?login=error');
        }
    }
}