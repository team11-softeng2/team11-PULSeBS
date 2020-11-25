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

    public function testupdateToNotActiveLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertGreaterThan(0, $result);
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testupdateToNotActiveLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertEquals(-1, $result);
    }
    
    public function testchangeToOnlineLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertGreaterThan(0, $result);
        $this->restoreModificationUpdateToOnline($this->id);
    }

    public function testchangeToOnlineLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertEquals(-1, $result);
    }

    public function testfindAllBookingsOfLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findAllBookingsOfLecture($this->id);
        $this->assertIsArray($result);
        $this->assertFalse(empty($result));
    }
    
    public function testfindAllBookingsOfLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findAllBookingsOfLecture($this->id);
        $this->assertEquals(0, $result);
    }
    

    protected function updateDates(){
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }
    protected function restoreModificationActiveLecture($idLecture){
        $sqlUpdateLessonTable= "update lessons set active=1 where idLesson=".$idLecture."";
        $sqlUpdateBookingTable="update booking set active=1, isWaiting=0 where idLesson=".$idLecture."";
        $this->db->exec($sqlUpdateLessonTable);
        $this->db->exec($sqlUpdateBookingTable);
    }
    protected function restoreModificationUpdateToOnline($idLecture){
        $sqlUpdateLessonTable= "update lessons set inPresence=1, idClassRoom=5 where idLesson=".$idLecture."";
        $sqlUpdateBookingTable= "update booking set active=1, isWaiting=0 where idLesson=".$idLecture."";
        $this->db->exec($sqlUpdateLessonTable);
        $this->db->exec($sqlUpdateBookingTable);

    }
}


?>