<?php
use PHPUnit\Framework\TestCase;
class GatewaysHistoricalDataTest extends TestCase {
    private $db;
    private $gatewayHistoricalData;

    public function testgetHistoricalDataBookingsPerLectureFound(){
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type);
        $this->assertIsArray($result);
    }
    public function testgetHistoricalDataBookingsPerMonthFound(){
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $filterTime = "year,monthOfYear";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type);
        $this->assertIsArray($result);
    }
    public function testgetHistoricalDataBookingsPerWeekFound(){
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $filterTime = "year_month_week";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type);
        $this->assertIsArray($result);
    }
    public function testgetHistoricalDataBookingsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "year_month_week";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type);
        $this->assertEquals(0, $result);
    }
}