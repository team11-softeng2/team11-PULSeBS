<?php
namespace Server\api;

use Server\api\GatewaysNotification;

class ControllersNotification
{
    private $requestMethod;
    private $notificationGateway;
    private $value;

    public function __construct($requestMethod, $db, $value)
    {
        $this->requestMethod = $requestMethod;
        $this->notificationGateway = new GatewaysNotification($db);
        $this->value = $value;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "POST") {
            if ($this->value == "sendNotification") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                $response = $this->sendNotification($input);
                return $response;
            } else {
                return "Invalid endpoint.";
            }
        } else {
            return "Invalid request method.";
        }
    }

    public function sendNotification($input)
    {
        $response = json_encode($this->notificationGateway->sendEmail($input));
        return $response;
    }

}
