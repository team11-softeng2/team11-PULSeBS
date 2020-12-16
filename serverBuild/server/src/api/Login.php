<?php
//require_once("ControllersLogin.php");
//use Server\src\api\ControllersLogin;
header('Content-Type: application/json');
require '../../vendor/autoload.php';

$controller = new Server\api\ControllersLogin($_SERVER['REQUEST_METHOD'], new SQLite3("../db_V3.db"));
echo $controller->processRequest();
