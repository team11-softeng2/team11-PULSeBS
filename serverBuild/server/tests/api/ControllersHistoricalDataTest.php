<?php
use PHPUnit\Framework\TestCase;
class ControllersHistoricalDataTest extends TestCase {
    private $db;
    private $controllersHistoricalData;

    public function testfindBookingsStatsFound(){
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controllersHistoricalData = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $result = $this->controllersHistoricalData->findBookingsStats($filterTime, $filterCourse);
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
    }

    public function testfindBookingsStatsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controllersHistoricalData = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $result = $this->controllersHistoricalData->findBookingsStats($filterTime, $filterCourse);
        $this->assertEquals(0, $result);
        
    }
    public function testProcessRequestStatsFound(){
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controllersHistoricalData = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $this->controllersHistoricalData->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals('0', $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestStatsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controllersHistoricalData = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $this->expectOutputString('0');
        $this->controllersHistoricalData->processRequest();
    }



}