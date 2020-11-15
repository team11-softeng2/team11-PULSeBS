<?php
header('Content-Type: application/json');
require '../../vendor/autoload.php';
$dbConn = new \SQLite3("../db.db");
if(!$dbConn){
    die("error connection database");
}
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
        case "bookableLessons/$number":
            $value ="bookableLessons";
            $requestMethod = "GET";
            $id = $number; 
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
        break;
        case "insertLecture":
            $value = "insertLecture";
            $requestMethod = "POST";
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value);
            $controller->processRequest();
        break;
        case "studentBookings/$number":
            $value = "studentBookings";
            $requestMethod = "GET";
            $id = $number; 
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
        default:
            echo $msg;

    }
}


?>