<?php
namespace Server\api;

use Server\api\GatewaysCourse;

class ControllersCourse extends Controllers
{
    public function __construct($requestMethod, $db, $value)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysCourse($db);
        $this->value = $value;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "courses") {
                return $this->findCourses();
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findCourses()
    {
        $courses = $this->gateway->findCourses();
        return json_encode($courses);
    }
}
