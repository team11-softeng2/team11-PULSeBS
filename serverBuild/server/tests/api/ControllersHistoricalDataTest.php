<?php
use PHPUnit\Framework\TestCase;

class ControllersHistoricalDataTest extends TestCase
{
    private $db;
    private $controller;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbStatistics.db");
    }

    public function testfindBookingsStatsFound()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $result = $this->controller->findBookingsStats($filterTime, $filterCourse);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testfindTeacherStatsFound()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $idTeacher = "2";
        $requestMethod = "GET";
        $value = "teacherStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type, $idTeacher);
        $result = $this->controller->findTeacherStats($filterTime, $filterCourse);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testfindBookingsStatsNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $result = $this->controller->findBookingsStats($filterTime, $filterCourse);
        $this->assertEquals(0, $result);
    }

    public function testProcessRequestBookingStatsFound()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestTeacherStatsFound()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $idTeacher = "2";
        $requestMethod = "GET";
        $value = "teacherStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type, $idTeacher);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestStatsNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "bookingStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $this->assertEquals(0, $this->controller->processRequest());
    }

    public function testUseWrongMethod()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "POST";
        $value = "bookingStatistics";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid request method.", $result);
    }

    public function testUseWrongEndpoint()
    {
        $filterTime = "L.idLesson";
        $filterCourse = "L.idCourse";
        $type = "1";
        $requestMethod = "GET";
        $value = "dammiLeStatistiche";
        $this->controller = new Server\api\ControllersHistoricalData($requestMethod, $this->db, $value, $filterTime, $filterCourse, $type);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }
}
