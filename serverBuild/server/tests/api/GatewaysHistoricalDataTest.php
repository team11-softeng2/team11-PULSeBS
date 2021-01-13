<?php
use PHPUnit\Framework\TestCase;

class GatewaysHistoricalDataTest extends TestCase
{
    private $db;
    private $gatewayHistoricalData;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbStatistics.db");
    }

    public function testgetHistoricalDataBookingsPerLectureFound()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, 0);
        $this->assertIsArray($result);
        $this->assertCount(70, $result);
    }

    public function testgetHistoricalDataBookingsPerMonthFound()
    {
        $filterTime = "year,monthOfYear";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, 0);
        $this->assertIsArray($result);
        $this->assertCount(3, $result);
    }

    public function testgetHistoricalDataBookingsPerWeekFound()
    {
        $filterTime = "year_month_week";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, 0);
        $this->assertIsArray($result);
        $this->assertCount(9, $result);
    }

    public function testgetHistoricalDataBookingsNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "year_month_week";
        $filterCourse = "L.idCourse";
        $type = "1";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, 0);
        $this->assertEquals(0, $result);
    }

    public function testgetHistoricalDataBookingsPerLecturePerTeacherFound()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $teacherId = "2";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, $teacherId);
        $this->assertIsArray($result);
        $this->assertCount(70, $result);
    }

    public function testgetHistoricalDataBookingsPerMonthPerTeacherFound()
    {
        $filterTime = "year,monthOfYear";
        $filterCourse = "L.idCourse";
        $type = "1";
        $teacherId = "2";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, $teacherId);
        $this->assertIsArray($result);
        $this->assertCount(3, $result);
    }

    public function testgetHistoricalDataBookingsPerWeekPerTeacherFound()
    {
        $filterTime = "year_month_week";
        $filterCourse = "L.idCourse";
        $type = "1";
        $teacherId = "2";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, $teacherId);
        $this->assertIsArray($result);
        $this->assertCount(9, $result);
    }

    public function testgetHistoricalDataBookingsPerTeacherNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "year_month_week";
        $filterCourse = "L.idCourse";
        $type = "1";
        $teacherId = "2";
        $this->gatewayHistoricalData = new Server\api\GatewaysHistoricalData($this->db);
        $result = $this->gatewayHistoricalData->getHistoricalDataBookings($filterTime, $filterCourse, $type, $teacherId);
        $this->assertEquals(0, $result);
    }
}
