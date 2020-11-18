<?php
use PHPUnit\Framework\TestCase;

class GatewaysTeacherBookingTest extends TestCase{

    private $db;
    private $gatewayTeacherBooking;

    public function testfindBookedStudentsForLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
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
    protected function updateDates(){
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }
}


?>