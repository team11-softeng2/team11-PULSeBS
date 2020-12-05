<?php
use PHPUnit\Framework\TestCase;

class ControllersTeacherBookingTest extends TestCase
{

    private $db;
    private $controller;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
    }
//test FindBookedStudentsForLecture----------------------------------------------------------------------------------------------------------
    public function testfindBookedStudentsForLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $result = $this->controller->findBookedStudentsForLecture($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testfindBookedStudentsForLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $this->assertEquals(0, $this->controller->findBookedStudentsForLecture($this->id));
    }

    public function testProcessRequestbookedStudentsForLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestbookedStudentsForLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
    }
//---------------------------------------------------------------------------------------------------------------------------------------------

//test updateToNotActiveLecture----------------------------------------------------------------------------------------------------------------

    public function testupdateToNotActiveLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $result = $this->controller->updateToNotActiveLecture($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testupdateToNotActiveLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $this->assertEquals(-1, $this->controller->updateToNotActiveLecture($this->id));
    }

    public function testProcessRequestupdateToNotActiveLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testProcessRequestupdateToNotActiveLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $this->assertEquals(-1, $this->controller->processRequest());
    }

    //---------------------------------------------------------------------------------------------------------

    //test changeToOnline--------------------------------------------------------------------------------------

    public function testchangeToOnlineFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $result = $this->controller->changeToOnlineLecture($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testchangeToOnlineNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $this->assertEquals(-1, $this->controller->changeToOnlineLecture($this->id));
    }

    public function testProcessRequestchangeToOnlineFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testProcessRequestchangeToOnlineNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $this->assertEquals(-1, $this->controller->processRequest());
    }

    //---------------------------------------------------------------------------------------------------------

    public function testUseWrongMethod()
    {
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("POOOOST", $this->db, "bookedStudentsForLecture", $this->id);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals($result, "Invalid request method.");
    }

    public function testUseWrongEndpoint()
    {
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "wrongEndPoint", $this->id);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals($result, "Invalid endpoint.");
    }

    // function useful for testing they modify db in order to make tests
    //---------------------------------------------------------------------------------------------------------
    protected function updateDates()
    {
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }

    protected function restoreModificationActiveLecture($idLecture)
    {
        $sqlUpdateLessonTable = "update lessons set active=1 where idLesson=" . $idLecture . "";
        $sqlUpdateBookingTable = "update booking set active=1, isWaiting=0 where idLesson=" . $idLecture . "";
        $this->db->exec($sqlUpdateLessonTable);
        $this->db->exec($sqlUpdateBookingTable);
    }

    protected function restoreModificationUpdateToOnline($idLecture)
    {
        $sqlUpdateLessonTable = "update lessons set inPresence=1, idClassRoom=5 where idLesson=" . $idLecture . "";
        $sqlUpdateBookingTable = "update booking set active=1, isWaiting=0 where idLesson=" . $idLecture . "";
        $this->db->exec($sqlUpdateLessonTable);
        $this->db->exec($sqlUpdateBookingTable);
    }
    //---------------------------------------------------------------------------------------------------------
}
