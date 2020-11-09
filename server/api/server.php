<?php
namespace Server\api;
header('Content-Type: application/json');

$msg = "Invalid API!";
if(isset($_GET['url'])){
    $var = $_GET['url'];
    $value ="undefined";
    $number = intval(preg_replace('/[^0-9]+/', '', $var));
    switch($var){
        case "users":
            $value = "users";
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            echo "call controller user";
        break;
        case "users/$number":
            $value = "users";
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            echo "call controller user with id = ".$number;
        break;
        default:
            echo $msg;

    }
}


?>