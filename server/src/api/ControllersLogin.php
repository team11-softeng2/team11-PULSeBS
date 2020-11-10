<?php
require("GatewaysUserTable.php");
header('Content-Type: application/json');

class ControllersLogin{
    private $requestMethod;
    private $usersGateway;
    

    public function __construct($requestMethod, $db){
        $this->requestMethod = $requestMethod;
        $this->usersGateway = new GatewaysUserTable($db);
        
    }
    public function processRequest(){
        if($this->requestMethod == "POST"){
            $postBody = file_get_contents("php://input");
            $input = (json_decode($postBody));
            $response = $this->checkLogin($input->username, $input->password);
            header($response['status_code_header']);
            echo $response['body'];
        }
        else{
            die("error");
        }
    }
    public function checkLogin($username, $password){
        $result = $this->usersGateway->login($username, $password);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }
    
}

?>