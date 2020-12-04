<?php
namespace Server\api;

use Server\api\GatewaysTeacherCourse;

class ControllersTeacherCourse
{
    private $requestMethod;
    private $teacherCourseGateway;
    private $id;
    private $value;

    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->teacherCourseGateway = new GatewaysTeacherCourse($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "teacherCourses") {
                $response = $this->findTeacherCourses();
                return $response;
            } else {
                return "Invalid endpoint.";
            }
        } else {
            return "Invalid request method.";
        }
    }

    public function findTeacherCourses()
    {
        $teacherCourses = $this->teacherCourseGateway->findTeacherCourses($this->id);
        return json_encode($teacherCourses);
    }
}
