<?php
namespace Server\api;

use Server\api\GatewaysHistoricalData;

class ControllersHistoricalData
{
    private $requestMethod;
    private $bookingStatsGateways;
    private $id;
    private $value;
    private $filterTime;
    private $filterCourse;

    public function __construct($requestMethod, $db, $value, $filterTime, $filterCourse, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->bookingStatsGateways = new GatewaysHistoricalData($db);
        $this->value = $value;
        $this->id = $id;
        $this->filterTime = $filterTime;
        $this->filterCourse = $filterCourse;
    }
    public function processRequest()
    {
        if ($this->requestMethod == "GET") {
            if($this->value == "bookingStatistics"){
                $response = $this->findBookingsStats($this->filterTime, $this->filterCourse);
                echo $response;
            }
        }
    }
    public function findBookingsStats($filterTime, $filterCourse){
        $bookingStats = $this->bookingStatsGateways->getHistoricalDataBookings($filterTime, $filterCourse, $this->id);
        return json_encode($bookingStats);
        
    }

    
}

?>