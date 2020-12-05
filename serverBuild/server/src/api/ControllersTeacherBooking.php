<?php
namespace Server\api;

use Server\api\GatewaysTeacherBooking;

class ControllersTeacherBooking extends Controllers
{

    private $requestMethod;
    private $teacherGatewayBooking;
    private $id;
    private $value;
    private $gatewayNotification;

    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->teacherGatewayBooking = new GatewaysTeacherBooking($db);
        $this->gatewayNotification = new GatewaysNotification($db);
        $this->value = $value;
        $this->id = $id;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "bookedStudentsForLecture") {
                return $this->findBookedStudentsForLecture($this->id);
            } elseif ($this->value == "scheduledLecturesForTeacher") {
                return $this->findScheduledLecturesForTeacher($this->id);
            } else {
                return $this->invalidEndpoint;
            }
        } else if ($this->requestMethod == "PUT") {
            if ($this->value == "deleteLecture") {
                return $this->updateToNotActiveLecture($this->id);
            } elseif ($this->value == "changeToOnline") {
                return $this->changeToOnlineLecture($this->id);
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
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

    public function updateToNotActiveLecture($idLecture)
    {
        $result = $this->teacherGatewayBooking->updateToNotActiveLecture($idLecture);
        $inputEmail = (object) [
            'type' => 'lectureCancelled',
            'id' => $idLecture,
        ];
        $emailRes = $this->gatewayNotification->sendEmail($inputEmail);
        return json_encode($result);
    }

    public function changeToOnlineLecture($idLecture)
    {
        $result = $this->teacherGatewayBooking->changeToOnlineLecture($idLecture);
        return json_encode($result);
    }
}
