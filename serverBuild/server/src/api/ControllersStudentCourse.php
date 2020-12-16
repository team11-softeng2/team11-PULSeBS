<?php
namespace Server\api;

use Server\api\GatewaysStudentCourse;

class ControllersStudentCourse extends Controllers
{
    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysStudentCourse($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "studentCourses") {
                return $this->findStudentCourses();
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findStudentCourses()
    {
        $studentCourses = $this->gateway->findStudentCourses($this->id);
        return json_encode($studentCourses);
    }
}
