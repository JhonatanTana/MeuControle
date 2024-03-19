<?php

namespace App;

use MF\Init\Bootstrap;

class Route extends Bootstrap {

	protected function initRoutes() {

		$routes['home'] = array(
			'route' => '/',
			'controller' => 'indexController',
			'action' => 'index'
		);
        $routes['auth'] = array(
            'route' => '/auth',
            'controller' => 'AuthController',
            'action' => 'auth'
        );
        $routes['dashboard'] = array(
            'route' => '/dashboard',
            'controller' => 'AppController',
            'action' => 'dashboard'
        );
        $routes['mesas'] = array(
            'route' => '/mesas',
            'controller' => 'AppController',
            'action' => 'mesas'
        );
        $routes['cardapio'] = array(
            'route' => '/cardapio',
            'controller' => 'AppController',
            'action' => 'cardapio'
        );
        $routes['historico'] = array(
            'route' => '/historico',
            'controller' => 'AppController',
            'action' => 'historico'
        );
        $routes['settings'] = array(
            'route' => '/settings',
            'controller' => 'AppController',
            'action' => 'settings'
        );
        $routes['logout'] = array(
            'route' => '/logout',
            'controller' => 'AuthController',
            'action' => 'logout'
        );

		$this->setRoutes($routes);
	}

}

?>