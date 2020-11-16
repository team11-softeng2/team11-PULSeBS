<?php


use PHPUnit\Framework\TestCase;

class ControllersStudentBookingTest extends TestCase
{
    
    private $db;
    private $controllersStudentBooking;

    public function setUp(): void
    {
        
    }
    public function testfindBookableLessonsFound(){
        $id = 1;
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $result = $this->controllersStudentBooking->findBookableLessons();
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
    }
    public function testfindBookableLessonsNotFound(){
        $id = 1;
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $result = $this->controllersStudentBooking->findBookableLessons();
        $this->assertEquals(0, $result);
    }

    public function testStudentBookingProcessRequestOutput(){
        $id = 1;
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $this->controllersStudentBooking->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals('0', $output);
        $this->assertFalse(empty($output));
        
    }
    public function testStudentBookingProcessRequestZeroOutput(){
            $id = 7;
            $this->db = new SQLite3("./tests/dbForTesting.db");
            $this->expectOutputString('0');
            $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $this->controllersStudentBooking->processRequest();
        //$this->assertFalse(empty($output));
        
    }
    public function testInsertNewBooking(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->restoreDB();
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("POST", $this->db, "insertLecture");
        $bookForTest = new class{
            public $idUser = 20;
            public $idLesson = 20;
            public $date = "2021-12-20 11:00:00";

        };
        $result = $this->controllersStudentBooking->insertNewBooklesson($bookForTest);
        $exResult = json_encode(1);
        $this->assertEquals($exResult, $result);
    }
    public function testUpdateBooking(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $idBooking = 2;
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("PUT", $this->db, "updateBooking", $idBooking);
        $lineUpdated = $this->controllersStudentBooking->updateBooking($idBooking);
        $this->assertEquals(1, $lineUpdated);
        $this->restoreValueAfterUpdate();
    }
    public function testRequestUpdateBooking(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $idBooking = 2;
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("PUT", $this->db, "updateBooking", $idBooking);
        $this->expectOutputString('1');
        $this->controllersStudentBooking->processRequest();
        $this->restoreValueAfterUpdate();
    }
    public function testFindBookedLessonsFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $idUser = 1;
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $result = $this->controllersStudentBooking->findStudentBookings();
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
    }
    public function testFindBookedLessonsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $idUser = 1;
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $result = $this->controllersStudentBooking->findStudentBookings();
        $this->assertEquals(0, $result);
    }
    public function testRequestFindBookedLessonsFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $idUser = 1;
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $this->controllersStudentBooking->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals('0', $output);
        $this->assertFalse(empty($output));
    }

    public function testRequestFindBookedLessonsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $idUser = 1;
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "studentBookings", $idUser);
        $this->expectOutputString('0');
        $this->controllersStudentBooking->processRequest();
        
    }

    protected function restoreDB(){
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
            PRIMARY KEY("idUser" AUTOINCREMENT)
        );');
    }
    protected function restoreValueAfterUpdate(){
        $this->db->exec("update booking set active=1 where idBooking=2");
    }
}
?>