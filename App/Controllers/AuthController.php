<?php

namespace App\Controllers;

use MF\Controller\Action;
use MF\Model\Container;

class AuthController extends Action {

    public function auth() {

        $user = Container::getModel('User');

        $user -> __set('username', $_POST['username']);
        $user -> __set('password', md5($_POST['password']));

        $user -> auth();

        if ($user->__get('id') && $user->__get('username') && $user->__get('permission')) {

            session_start();

            $_SESSION['id'] = $user->__get('id');
            $_SESSION['username'] = $user->__get('username');
            $_SESSION['permission'] = $user->__get('permission');

            header('Location:/dashboard');
        } else {
            header('Location:/?login=error');
        }
    }

    public function logout() {
        session_start();
        session_destroy();
        header('Location:/');
    }
}