<?php

namespace Server\api;

use Server\api\GatewaysSupportOfficer;

class ControllersSupportOfficer extends Controllers
{
    private $requestMethod;
    private $supportOfficerGateway;
    private $id;
    private $value;

    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->studentCourseGateway = new GatewaysSupportOfficer($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "POST") {
            if ($this->value == "setUpCourse") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                return $this->setUpCourses($input);
            } else if ($this->value == "setUpStudents") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                return $this->setUpCourses($input);
            } else if ($this->value == "setUpProfessors") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                return $this->setUpCourses($input);
            } else if ($this->value == "setUpEnrollment") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                return $this->setUpCourses($input);
            } else if ($this->value == "setUpLessons") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                return $this->setUpCourses($input);
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function setUpCourses($input)
    {
        $response = $this->supportOfficerGateway->setUpCourses($input);
        return $response ? 1 : 0;
    }
    public function setUpStudents($input)
    {
        $response = $this->supportOfficerGateway->setUpStudents($input);
        return $response ? 1 : 0;
    }
    public function setUpEnrollment($input)
    {
        $response = $this->supportOfficerGateway->setUpEnrollment($input);
        return $response ? 1 : 0;
    }
    public function setUpLessons($input)
    {
        $response = $this->supportOfficerGateway->setUpLessons($input);
        return $response ? 1 : 0;
    }
    public function setUpProfessors($input)
    {
        $response = $this->supportOfficerGateway->setUpProfessors($input);
        return $response ? 1 : 0;
    }
}
