<?php
use PHPUnit\Framework\TestCase;

class GatewaysTeacherBookingTest extends TestCase{

    private $db;
    private $gatewayTeacherBooking;

    public function testfindBookedStudentsForLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findBookedStudentsForLecture($this->id);
        $this->assertIsArray($result);
    }
    public function testfindBookedStudentsForLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findBookedStudentsForLecture($this->id);
        $this->assertEquals(0, $result);
    }
}


?>