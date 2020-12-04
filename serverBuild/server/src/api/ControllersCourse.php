<?php
namespace Server\api;

use Server\api\GatewaysCourse;

class ControllersCourse
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
                $response = $this->findCourses();
                return $response;
            } else {
                return "Invalid endpoint.";
            }
        } else {
            return "Invalid request method.";
        }
    }

    public function findCourses()
    {
        $courses = $this->courseGateway->findCourses();
        return json_encode($courses);
    }
}
