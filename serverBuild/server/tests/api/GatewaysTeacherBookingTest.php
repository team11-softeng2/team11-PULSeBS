<?php
use PHPUnit\Framework\TestCase;

class GatewaysTeacherBookingTest extends TestCase
{

    private $db;
    private $gatewayTeacherBooking;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
    }

    //test FindBookedStudentsForLecture-----------------------------------------------------------------------------------------
    public function testfindBookedStudentsForLectureFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findBookedStudentsForLecture($this->id);
        $this->assertIsArray($result);
    }

    public function testfindBookedStudentsForLectureNotFound()
    {
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findBookedStudentsForLecture($this->id);
        $this->assertEquals(0, $result);
    }
//------------------------------------------------------------------------------------------------------------------------------

//test FindScheduledLecturesForTeacher-----------------------------------------------------------------------------------------
    public function testFindScheduledLecturesForTeacherFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 2;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findScheduledLecturesForTeacher($this->id);
        $this->assertIsArray($result);
        $this->assertCount(6, $result);
    }

    public function testFindScheduledLecturesForTeacherNotFound()
    {
        $this->id = 1;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->findScheduledLecturesForTeacher($this->id);
        $this->assertEquals(0, $result);
    }
//------------------------------------------------------------------------------------------------------------------------------

//test UpdateToNotActiveLecture-------------------------------------------------------------------------------------------------
    public function testupdateToNotActiveLectureFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertGreaterThan(0, $result);
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testupdateToNotActiveLectureNotFound()
    {
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertEquals(-1, $result);
    }

    public function testUpdateNotActiveZeroResult()
    {
        $this->id = 3;
        //$this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);

        $mockGatewayTeacherBooking = $this->getMockBuilder(Server\api\GatewaysTeacherBooking::class)
            ->setConstructorArgs(array($this->db))
            ->setMethods(array('validateDateBeforeUpdate'))
            ->getMock();

        $mockGatewayTeacherBooking->expects($this->any())
            ->method('validateDateBeforeUpdate')
            ->will($this->returnValue(true));

        $result = $mockGatewayTeacherBooking->updateToNotActiveLecture($this->id);
        $this->assertEquals(0, $result);
    }
//------------------------------------------------------------------------------------------------------------------------------

//test ChangeToOnlineLecture-----------------------------------------------------------------------------------------------
    public function testchangeToOnlineLectureFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertGreaterThan(0, $result);
        $this->restoreModificationUpdateToOnline($this->id);
    }

    public function testchangeToOnlineLectureNotFound()
    {
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertEquals(-1, $result);
    }

    public function testchangeToOnlineLectureZeroOutput()
    {
        $this->id = 3;
        //$this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);

        $mockGatewayTeacherBooking = $this->getMockBuilder(Server\api\GatewaysTeacherBooking::class)
            ->setConstructorArgs(array($this->db))
            ->setMethods(array('validateDateBeforeUpdateToOnline'))
            ->getMock();

        $mockGatewayTeacherBooking->expects($this->any())
            ->method('validateDateBeforeUpdateToOnline')
            ->will($this->returnValue(true));

        $result = $mockGatewayTeacherBooking->changeToOnlineLecture($this->id);
        $this->assertEquals(0, $result);
    }
//---------------------------------------------------------------------------------------------------------------------------------

//test ChangeToOnlineLectureByYear-----------------------------------------------------------------------------------------------
    public function testchangeToOnlineLectureByYearFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->changeToOnlineLectureByYear($this->id);
        $this->assertGreaterThan(0, $result);
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testchangeToOnlineLectureByYearNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 10;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->changeToOnlineLectureByYear($this->id);
        $this->assertEquals(0, $result);
        $this->restoreModificationUpdateToOnlineByYear();
    }
//---------------------------------------------------------------------------------------------------------------------------------

//test FindAllBookingsOfLecture----------------------------------------------------------------------------------------------------
    // public function testfindAllBookingsOfLectureFound(){
    //     $this->db = new SQLite3("./tests/dbForTesting2.db");
    //     $this->updateDates();
    //     $this->id = 3;
    //     $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
    //     $result = $this->gatewayTeacherBooking->findAllBookingsOfLecture($this->id);
    //     $this->assertIsArray($result);
    //     $this->assertFalse(empty($result));
    // }

    // public function testfindAllBookingsOfLectureNotFound(){
    //
    //     $this->id = 3;
    //     $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
    //     $result = $this->gatewayTeacherBooking->findAllBookingsOfLecture($this->id);
    //     $this->assertEquals(0, $result);
    // }

//-----------------------------------------------------------------------------------------------------------------------------------

//test validationDateBeforeUpdate----------------------------------------------------------------------------------------------------

    public function testvalidationDateBeforeUpdateTrue()
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->validateDateBeforeUpdate($this->id);
        $this->assertTrue($result);
    }

    public function testvalidationDateBeforeUpdateFalse()
    {
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->validateDateBeforeUpdate($this->id);
        $this->assertFalse($result);
    }

//-----------------------------------------------------------------------------------------------------------------------------------

//test validationDateBeforeUpdateToOnline----------------------------------------------------------------------------------------------------

    public function testvalidationDateBeforeUpdateToOnlineTrue()
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->updateDates();
        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->validateDateBeforeUpdateToOnline($this->id);
        $this->assertTrue($result);
    }

    public function testvalidationDateBeforeUpdateToOnlineFalse()
    {

        $this->id = 3;
        $this->gatewayTeacherBooking = new Server\api\GatewaysTeacherBooking($this->db);
        $result = $this->gatewayTeacherBooking->validateDateBeforeUpdateToOnline($this->id);
        $this->assertFalse($result);

    }

//-----------------------------------------------------------------------------------------------------------------------------------

//Function useful for testing--------------------------------------------------------------------------------------------------------
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
    protected function restoreModificationUpdateToOnlineByYear()
    {
        $sqlUpdateLessonTable = "update lessons set inPresence=1";
        $this->db->exec($sqlUpdateLessonTable);
    }
//---------------------------------------------------------------------------------------------------------------------------------------

}
