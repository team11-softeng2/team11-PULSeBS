<?php
//require_once("ControllersLogin.php");
//use Server\src\api\ControllersLogin;
header('Content-Type: application/json');
require '../../vendor/autoload.php';
$dbConn = new SQLite3("../db.db");
if (!$dbConn) {
    die("error connection database");
}
$request_method = $_SERVER['REQUEST_METHOD'];

$controller = new Server\api\ControllersLogin($request_method, $dbConn);
echo $controller->processRequest();

// if($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $postBody = file_get_contents("php://input");
//     $input = (json_decode($postBody));
//     $return = login($input->username, $input->password);

//     //LOGIN FAIL
//     if($return == 0) {
//         exit('Login failed');
//     }
//     //LOGIN SUCCESS
//     else {
//         $_SESSION['user_id'] = $return['user_id'];
//         echo (json_encode($return));
//     }
// }
