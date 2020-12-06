<?php

use PHPUnit\Framework\TestCase;

class ControllersStudentBookingTest extends TestCase
{

    private $db;
    private $controller;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
    }

//test FindBookableLessons--------------------------------------------------------------------------------------------------------
    public function testfindBookableLessonsFound()
    {
        $id = 1;
        $this->updateDates();
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $result = $this->controller->findBookableLessons();
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testfindBookableLessonsNotFound()
    {
        $id = 1;
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->restoreDB();
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $result = $this->controller->findBookableLessons();
        $this->assertEquals(0, $result);
    }

    public function testStudentBookingProcessRequestOutput()
    {
        $id = 1;
        $this->updateDates();
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testStudentBookingProcessRequestZeroOutput()
    {
        $id = 7;
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->restoreDB();
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $this->assertEquals(0, $this->controller->processRequest());
        // $this->assertFalse(empty($output));
    }
//---------------------------------------------------------------------------------------------------------------------------------------

//test InsertNewBooking------------------------------------------------------------------------------------------------------------------
    public function testInsertNewBooking()
    {
        $this->db = new SQLite3("./tests/dbEmail.db");
        $this->controller = new Server\api\ControllersStudentBooking("POST", $this->db, "insertLecture");
        $bookForTest = new class

        {
            public $idUser = 1;
            public $idLesson = 6;
            public $date = "2020-11-20 14:00:00";

        };
        $result = $this->controller->insertNewBooklesson($bookForTest);
        $exResult = json_encode(1);
        $this->assertGreaterThanOrEqual($exResult, $result);
        $this->deleteRow($result);
    }
//-------------------------------------------------------------------------------------------------------------------------------------------

//test UpdateBooking-------------------------------------------------------------------------------------------------------------------------
    public function testUpdateBooking()
    {
        $this->updateDates();
        $idBooking = 2;
        $this->controller = new Server\api\ControllersStudentBooking("PUT", $this->db, "updateBooking", $idBooking);
        $lineUpdated = $this->controller->updateBooking($idBooking);
        $this->assertEquals(1, $lineUpdated);
        $this->restoreValueAfterUpdate();
    }

    public function testRequestUpdateBooking()
    {
        $this->updateDates();
        $idBooking = 2;
        $this->controller = new Server\api\ControllersStudentBooking("PUT", $this->db, "updateBooking", $idBooking);
        $this->assertEquals("1", $this->controller->processRequest());
        $this->restoreValueAfterUpdate();
    }
//-----------------------------------------------------------------------------------------------------------------------------------------

//test FindBookedLessons-------------------------------------------------------------------------------------------------------------------
    public function testFindBookedLessonsFound()
    {
        $this->updateDates();
        $idUser = 3;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $result = $this->controller->findStudentBookings();
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testFindBookedLessonsNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $idUser = 1;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $result = $this->controller->findStudentBookings();
        $this->assertEquals(0, $result);
    }

    public function testRequestFindBookedLessonsFound()
    {
        $this->updateDates();
        $idUser = 3;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testRequestFindBookedLessonsNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $idUser = 1;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $this->assertEquals(0, $this->controller->processRequest());
    }
//------------------------------------------------------------------------------------------------------------------------------------------

//test FindLectureWithFullRoom--------------------------------------------------------------------------------------------------------------
    public function testfindLectureWithFullRoomFound()
    {
        $this->updateDates();
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "lecturesWithFullRoom", $idUser);
        $result = $this->controller->findLectureWithFullRoom();
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testfindLectureWithFullRoomNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "lecturesWithFullRoom", $idUser);
        $result = $this->controller->findLectureWithFullRoom();
        $this->assertEquals(0, $result);

    }

    public function testProcessRequestlecturesWithFullRoomFound()
    {
        $this->updateDates();
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "lecturesWithFullRoom", $idUser);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestlecturesWithFullRoomNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "lecturesWithFullRoom", $idUser);
        $this->assertEquals(0, $this->controller->processRequest());
    }
//-----------------------------------------------------------------------------------------------------------------------------------------

    public function testUseWrongMethod()
    {
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("GEEEEEET", $this->db, "lecturesWithFullRoom", $idUser);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid request method.", $result);
    }

    public function testUseWrongEndpointGET()
    {
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("GET", $this->db, "nonExistingEnpoint", $idUser);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }

    public function testUseWrongEndpointPUT()
    {
        $idUser = 7;
        $this->controller = new Server\api\ControllersStudentBooking("PUT", $this->db, "nonExistingEnpoint", $idUser);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }

//test Useful functions for testing---------------------------------------------------------------------------------------------------------
    protected function restoreDB()
    {
        $this->db->exec('DROP TABLE IF EXISTS "lessons";
        CREATE TABLE IF NOT EXISTS "lessons" (
            "idLesson"	INTEGER,
            "idCourse"	INTEGER,
            "idTeacher"	INTEGER,
            "idClassRoom"	INTEGER,
            "date"	TEXT,
            "beginTime"	TEXT,
            "endTime"	TEXT,
            "type"	TEXT,
            "inPresence" INTEGER,
            "active"	INTEGER,
            PRIMARY KEY("idLesson" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "ClassRoom";
        CREATE TABLE IF NOT EXISTS "ClassRoom" (
            "idClassRoom"	INTEGER,
            "totalSeats"	INTEGER,
            PRIMARY KEY("idClassRoom" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "enrollment";
        CREATE TABLE IF NOT EXISTS "enrollment" (
            "idEnrollment"	INTEGER,
            "idUser"	INTEGER,
            "idCourse"	INTEGER,
            PRIMARY KEY("idEnrollment" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "booking";
        CREATE TABLE IF NOT EXISTS "booking" (
            "idBooking"	INTEGER,
            "idUser"	INTEGER,
            "idLesson"	INTEGER,
            "active"	INTEGER,
            "date"	TEXT,
            "isWaiting"	INTEGER,
            PRIMARY KEY("idBooking" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "courses";
        CREATE TABLE IF NOT EXISTS "courses" (
            "idCourse"	INTEGER,
            "idTeacher"	INTEGER,
            "name"	TEXT,
            PRIMARY KEY("idCourse" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "users";
        CREATE TABLE IF NOT EXISTS "users" (
            "idUser"	INTEGER NOT NULL UNIQUE,
            "userName"	TEXT,
            "password"	TEXT,
            "role"	TEXT,
            "name"	TEXT,
            "email" TEXT,
            PRIMARY KEY("idUser" AUTOINCREMENT)
        );');
    }

    protected function restoreValueAfterUpdate()
    {
        $this->db->exec("update booking set active=1 where idBooking=2");
    }

    protected function deleteRow($id)
    {
        $this->db->exec("delete from booking where idBooking=" . $id . "");
    }

    protected function updateDates()
    {
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }
}
