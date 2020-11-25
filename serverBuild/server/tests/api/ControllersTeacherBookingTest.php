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

    //test updateToNotActiveLecture---------------------------------------------------------------------------
    
    public function testupdateToNotActiveLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $result = $this->controllersTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
        $this->restoreModificationActiveLecture($this->id);
    }
    public function testupdateToNotActiveLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $result = $this->controllersTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertEquals(-1, $result);
    }
    public function testProcessRequestupdateToNotActiveLectureFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $this->controllersTeacherBooking->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals('0', $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationActiveLecture($this->id);
    }
    public function testProcessRequestupdateToNotActiveLectureNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $this->expectOutputString('-1');
        $this->controllersTeacherBooking->processRequest();
        
    }

    //---------------------------------------------------------------------------------------------------------

    //test changeToOnline--------------------------------------------------------------------------------------
    
    public function testchangeToOnlineFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $result = $this->controllersTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
        $this->restoreModificationActiveLecture($this->id);
    }
    public function testchangeToOnlineNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $result = $this->controllersTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertEquals(-1, $result);
    }
    public function testProcessRequestchangeToOnlineFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $this->controllersTeacherBooking->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals('0', $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationActiveLecture($this->id);
    }
    public function testProcessRequestchangeToOnlineNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controllersTeacherBooking = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $this->expectOutputString('-1');
        $this->controllersTeacherBooking->processRequest();
        
    }

    //---------------------------------------------------------------------------------------------------------


    // function useful for testing they modify db in order to make tests
    //---------------------------------------------------------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------
}


?>