<?php
namespace Server\api;

use Server\api\GatewaysUserTable;

class ControllersLogin extends Controllers
{
    private $requestMethod;
    private $usersGateway;

    public function __construct($requestMethod, $db)
    {
        $this->requestMethod = $requestMethod;
        $this->usersGateway = new GatewaysUserTable($db);
    }

    public function processRequest()
    {
        if ($this->requestMethod == "POST") {
            $postBody = file_get_contents("php://input");
            $input = (json_decode($postBody));
            $response = $this->checkLogin($input->username ?? "", $input->password ?? "");
            if (!headers_sent()) {
                header($response['status_code_header']);
            }
            return $response['body'];
        } else {
            throw new Exception("Request method not valid");
        }
    }

    public function checkLogin($username, $password)
    {
        $result = $this->usersGateway->login($username, $password);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }
}
