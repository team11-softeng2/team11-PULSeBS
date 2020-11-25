<?php
namespace Server\api;

use Server\api\GatewaysTeacherBooking;

class ControllersTeacherBooking
{

    private $requestMethod;
    private $teacherGatewayBooking;
    private $id;
    private $value;
    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->teacherGatewayBooking = new GatewaysTeacherBooking($db);
        $this->value = $value;
        $this->id = $id;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "bookedStudentsForLecture") {
                $response = $this->findBookedStudentsForLecture($this->id);
                echo $response;
            } elseif ($this->value == "scheduledLecturesForTeacher") {
                $response = $this->findScheduledLecturesForTeacher($this->id);
                echo $response;
            }
        }
        else if($this->requestMethod == "PUT"){
            if ($this->value == "deleteLecture"){
                $response = $this->updateToNotActiveLecture($this->id);
                echo $response;
            } elseif ($this->value == "changeToOnline"){
                $response = $this->changeToOnlineLecture($this->id);
                echo $response;
            }
        }
    }
    public function findBookedStudentsForLecture($id)
    {
        $bookedStudentsForLecture = $this->teacherGatewayBooking->findBookedStudentsForLecture($id);
        return json_encode($bookedStudentsForLecture);
    }
    public function findScheduledLecturesForTeacher($id)
    {
        $scheduledLecturesForTeacher = $this->teacherGatewayBooking->findScheduledLecturesForTeacher($id);
        return json_encode($scheduledLecturesForTeacher);
    }
    public function updateToNotActiveLecture($idLecture){
        $result = $this->teacherGatewayBooking->updateToNotActiveLecture($idLecture);
        return json_encode($result);
    }
    public function changeToOnlineLecture($idLecture){
        $result = $this->teacherGatewayBooking->changeToOnlineLecture($idLecture);
        return json_encode($result);
    }
}
