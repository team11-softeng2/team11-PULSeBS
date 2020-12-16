<?php
namespace Server\api;

use Server\api\GatewaysTeacherCourse;

class ControllersTeacherCourse extends Controllers
{
    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysTeacherCourse($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "teacherCourses") {
                return $this->findTeacherCourses();
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findTeacherCourses()
    {
        $teacherCourses = $this->gateway->findTeacherCourses($this->id);
        return json_encode($teacherCourses);
    }
}
