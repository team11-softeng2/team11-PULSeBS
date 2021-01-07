<?php
namespace Server\api;

use Server\api\GatewaysHistoricalData;

class ControllersHistoricalData extends Controllers
{
    private $isActive;
    private $filterTime;
    private $filterCourse;

    public function __construct($requestMethod, $db, $value, $filterTime, $filterCourse, $isActive = -1, $id = -1, $isAttendanceStats = 0)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysHistoricalData($db);
        $this->value = $value;
        $this->isActive = $isActive;
        $this->idTeacher = $id;
        $this->filterTime = $filterTime;
        $this->filterCourse = $filterCourse;
        $this->isAttendanceStats = $isAttendanceStats;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "bookingStatistics") {
                return $this->findBookingsStats($this->filterTime, $this->filterCourse);
            } else if ($this->value == "teacherStatistics") {
                return $this->findTeacherStats($this->filterTime, $this->filterCourse);
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findBookingsStats($filterTime, $filterCourse)
    {
        $bookingStats = $this->gateway->getHistoricalDataBookings($filterTime, $filterCourse, $this->isActive, $this->isAttendanceStats);
        return json_encode($bookingStats);
    }

    public function findTeacherStats($filterTime, $filterCourse)
    {
        $teacherStats = $this->gateway->getHistoricalDataBookingsForTeacher($filterTime, $filterCourse, $this->isActive, $this->idTeacher, $this->isAttendanceStats);
        return json_encode($teacherStats);
    }

}
