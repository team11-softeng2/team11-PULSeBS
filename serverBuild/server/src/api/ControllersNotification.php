<?php
namespace Server\api;

use Server\api\GatewaysNotification;

class ControllersNotification extends Controllers
{
    public function __construct($requestMethod, $db, $value)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysNotification($db);
        $this->value = $value;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "POST") {
            if ($this->value == "sendNotification") {
                $postBody = file_get_contents("php://input");
                $input = json_decode($postBody, true);
                return $this->sendNotification($input["type"], $input["id"]);
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function sendNotification($type, $id)
    {
        return json_encode($this->gateway->sendEmail($type, $id));
    }

}
