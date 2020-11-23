<?php
namespace Server\api;

use Server\api\GatewaysStudentCourse;

class ControllersStudentCourse
{
    private $requestMethod;
    private $studentCourseGateway;
    private $id;
    private $value;

    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->studentCourseGateway = new GatewaysStudentCourse($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "studentCourses") {
                $response = $this->findStudentCourses();
                echo $response;
            }
        } else {
            echo "Invalid request method.";
        }
    }

    public function findStudentCourses()
    {
        $studentCourses = $this->studentCourseGateway->findStudentCourses($this->id);
        return json_encode($studentCourses);
    }
}
