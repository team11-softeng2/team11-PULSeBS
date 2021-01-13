<?php

namespace Server\api;

use Server\api\GatewaysSupportOfficer;

class ControllersSupportOfficer extends Controllers
{
    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysSupportOfficer($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest()
    {
        $output = null;
        if ($this->requestMethod == "POST") {
            if ($this->value == "setUpCourses") {
                $postBody = file_get_contents("php://input");
                $input = (\json_decode($postBody, true));
                $output = $this->setUpCourses($input);
            } else if ($this->value == "setUpStudents") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody, true));
                $output = $this->setUpStudents($input);
            } else if ($this->value == "setUpProfessors") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody, true));
                $output = $this->setUpProfessors($input);
            } else if ($this->value == "setUpEnrollment") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody, true));
                $output = $this->setUpEnrollment($input);
            } else if ($this->value == "setUpLessons") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody, true));
                $output = $this->setUpLessons($input);
            } else {
                $output = $this->invalidEndpoint;
            }
        } else if ($this->requestMethod == "GET") {
            if ($this->value == "findGeneralSchedule") {
                $output = $this->findGeneralSchedule($this->id);
            } else {
                $output = $this->invalidEndpoint;
            }
        } else {
            $output = $this->invalidMethod;
        }
        return $output;
    }

    public function setUpCourses($input)
    {
        $response = $this->gateway->setUpCourses($input);
        return $response ? 1 : 0;
    }
    public function setUpStudents($input)
    {
        $response = $this->gateway->setUpStudents($input);
        return $response ? 1 : 0;
    }
    public function setUpEnrollment($input)
    {
        $response = $this->gateway->setUpEnrollment($input);
        return $response ? 1 : 0;
    }
    public function setUpLessons($input)
    {
        $response = $this->gateway->setUpLessons($input);
        return $response ? 1 : 0;
    }
    public function setUpProfessors($input)
    {
        $response = $this->gateway->setUpProfessors($input);
        return $response ? 1 : 0;
    }

    public function findGeneralSchedule($id)
    {
        $response = $this->gateway->findGeneralSchedule($id);
        return json_encode($response);
    }
}
