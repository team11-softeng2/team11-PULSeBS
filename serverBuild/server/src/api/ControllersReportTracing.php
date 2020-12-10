<?php
namespace Server\api;

use Server\api\GatewaysReportTracing;

class ControllersReportTracing extends Controllers
{
    public function __construct($requestMethod, $db, $value, $id)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysReportTracing($db);
        $this->value = $value;
        $this->id = $id;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "findStudentContacts") {
                return $this->findStudentContacts();
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findStudentContacts(){
        $result = $this->gateway->findStudentContacts($this->id);
        return json_encode($result);
    }
}