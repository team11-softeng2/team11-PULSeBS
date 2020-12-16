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
        $output = null;
        if ($this->requestMethod == "GET") {
            if ($this->value == "findStudentContacts") {
                $output = $this->findStudentContacts();
            } else {
                $output = $this->invalidEndpoint;
            }
        } else {
            $output = $this->invalidMethod;
        }
        return $output;
    }

    public function findStudentContacts()
    {
        $result = $this->gateway->findStudentContacts($this->id);
        return json_encode($result);
    }
}
