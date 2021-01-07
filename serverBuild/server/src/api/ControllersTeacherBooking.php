<?php
namespace Server\api;

use Server\api\GatewaysTeacherBooking;

class ControllersTeacherBooking extends Controllers
{
    private $gatewayNotification;

    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysTeacherBooking($db);
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
            } elseif ($this->value == "changeToOnlineByYear") {
                return $this->changeToOnlineLectureByYear($this->id);
            } elseif ($this->value == "recordStudentPresence") {
                return $this->recordStudentPresence($this->id);
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findBookedStudentsForLecture($id)
    {
        $bookedStudentsForLecture = $this->gateway->findBookedStudentsForLecture($id);
        return json_encode($bookedStudentsForLecture);
    }

    public function findScheduledLecturesForTeacher($id)
    {
        $scheduledLecturesForTeacher = $this->gateway->findScheduledLecturesForTeacher($id);
        return json_encode($scheduledLecturesForTeacher);
    }

    public function updateToNotActiveLecture($idLecture)
    {
        $result = $this->gateway->updateToNotActiveLecture($idLecture);
        //$this->gatewayNotification->sendEmail('lectureCancelled', $idLecture);
        return json_encode($result);
    }

    public function changeToOnlineLecture($idLecture)
    {
        $result = $this->gateway->changeToOnlineLecture($idLecture);
        return json_encode($result);
    }

    public function changeToOnlineLectureByYear($year)
    {
        $result = $this->gateway->changeToOnlineLectureByYear($year);
        return json_encode($result);
    }

    public function recordStudentPresence($idBooking)
    {
        $result = $this->gateway->recordStudentPresence($idBooking);
        return json_encode($result);
    }
}
