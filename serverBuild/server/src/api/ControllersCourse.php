<?php
namespace Server\api;

use Server\api\GatewaysCourse;

class ControllersCourse extends Controllers
{
    private $requestMethod;
    private $courseGateway;
    private $value;

    public function __construct($requestMethod, $db, $value)
    {
        $this->requestMethod = $requestMethod;
        $this->courseGateway = new GatewaysCourse($db);
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
        $courses = $this->courseGateway->findCourses();
        return json_encode($courses);
    }
}
