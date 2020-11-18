<?php
use PHPUnit\Framework\TestCase;
class ControllersTeacherBookingTest extends TestCase{

    private $db;
    private $controllersTeacherBooking;

    public function testfindBookedStudentsForLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $result = $this->controllersTeacherBooking->findBookedStudentsForLecture($this->id);
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
    }

    public function testfindBookedStudentsForLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $result = $this->controllersTeacherBooking->findBookedStudentsForLecture($this->id);
        $this->assertEquals(0, $result);
    }

    public function testProcessRequestbookedStudentsForLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $this->controllersTeacherBooking->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals('0', $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestbookedStudentsForLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $this->expectOutputString('0');
        $this->controllersTeacherBooking->processRequest();
    }
    protected function updateDates(){
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }
}


?>