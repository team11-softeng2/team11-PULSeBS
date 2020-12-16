<?php
namespace Server\api;

use Server\api\GatewaysUser;

class ControllersUser extends Controllers
{
    public function __construct($requestMethod, $db, $value)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysUser($db);
        $this->value = $value;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "students") {
                return $this->findStudents();
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findStudents()
    {
        $students = $this->gateway->findStudents();
        return json_encode($students);
    }
}
