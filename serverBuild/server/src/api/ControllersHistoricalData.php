<?php
namespace Server\api;

use Server\api\GatewaysHistoricalData;

class ControllersHistoricalData
{
    private $requestMethod;
    private $bookingStatsGateways;
    private $isActive;
    private $idTeacher;
    private $value;
    private $filterTime;
    private $filterCourse;

    public function __construct($requestMethod, $db, $value, $filterTime, $filterCourse, $isActive = -1, $idTeacher = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->bookingStatsGateways = new GatewaysHistoricalData($db);
        $this->value = $value;
        $this->isActive = $isActive;
        $this->idTeacher = $idTeacher;
        $this->filterTime = $filterTime;
        $this->filterCourse = $filterCourse;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if ($this->value == "bookingStatistics") {
                $response = $this->findBookingsStats($this->filterTime, $this->filterCourse);
                echo $response;
            } else if ($this->value == "teacherStatistics") {
                $response = $this->findTeacherStats($this->filterTime, $this->filterCourse);
                echo $response;
            }
        }
    }

    public function findBookingsStats($filterTime, $filterCourse)
    {
        $bookingStats = $this->bookingStatsGateways->getHistoricalDataBookings($filterTime, $filterCourse, $this->isActive);
        return json_encode($bookingStats);
    }

    public function findTeacherStats($filterTime, $filterCourse)
    {
        $teacherStats = $this->bookingStatsGateways->getHistoricalDataBookingsForTeacher($filterTime, $filterCourse, $this->isActive, $this->idTeacher);
        return json_encode($teacherStats);
    }

}
